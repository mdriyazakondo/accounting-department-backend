import { Response } from "express";
import Student from "../models/student/student.model.js";
import Teacher from "../models/teacher/teacher.js";
import User from "../models/user.model.js";
import sendResponse from "../utils/sendResponse.js";
import { JWTAuthRequest } from "../middlewares/jwtAuthMiddleware.js";

// Permission levels and data access controls
enum PermissionLevel {
  PUBLIC = "public",
  STUDENT = "student",
  TEACHER = "teacher",
  ADMIN = "admin",
}

interface DataAccessRule {
  resource: string;
  allowedRoles: PermissionLevel[];
  sensitiveFields: string[];
  allowedOperations: string[];
}

// Comprehensive data access rules
const dataAccessRules: DataAccessRule[] = [
  {
    resource: "student_profile",
    allowedRoles: [
      PermissionLevel.STUDENT,
      PermissionLevel.TEACHER,
      PermissionLevel.ADMIN,
    ],
    sensitiveFields: ["password", "internal_notes", "financial_info"],
    allowedOperations: ["read", "update_own"],
  },
  {
    resource: "teacher_profile",
    allowedRoles: [PermissionLevel.TEACHER, PermissionLevel.ADMIN],
    sensitiveFields: ["password", "salary", "personal_address"],
    allowedOperations: ["read", "update_own"],
  },
  {
    resource: "student_list",
    allowedRoles: [PermissionLevel.TEACHER, PermissionLevel.ADMIN],
    sensitiveFields: ["password", "financial_info", "medical_records"],
    allowedOperations: ["read"],
  },
  {
    resource: "grades",
    allowedRoles: [
      PermissionLevel.STUDENT,
      PermissionLevel.TEACHER,
      PermissionLevel.ADMIN,
    ],
    sensitiveFields: [],
    allowedOperations: ["read_own", "read_all", "update"],
  },
  {
    resource: "attendance",
    allowedRoles: [
      PermissionLevel.STUDENT,
      PermissionLevel.TEACHER,
      PermissionLevel.ADMIN,
    ],
    sensitiveFields: [],
    allowedOperations: ["read_own", "read_all", "update"],
  },
  {
    resource: "system_config",
    allowedRoles: [PermissionLevel.ADMIN],
    sensitiveFields: ["api_keys", "secrets", "database_credentials"],
    allowedOperations: ["read", "update"],
  },
];

// Sensitive information patterns to filter
const sensitivePatterns = [
  /password/i,
  /secret/i,
  /key/i,
  /token/i,
  /api[_-]?key/i,
  /database[_-]?url/i,
  /connection[_-]?string/i,
  /private[_-]?key/i,
  /credit[_-]?card/i,
  /ssn|social[_-]?security/i,
  /salary|payroll/i,
  /medical|health/i,
];

// Permission checking functions
const hasPermission = (
  userRole: string,
  resource: string,
  operation: string = "read",
): boolean => {
  const rule = dataAccessRules.find((r) => r.resource === resource);
  if (!rule) return false;

  const userPermissionLevel = getPermissionLevel(userRole);
  const hasRoleAccess = rule.allowedRoles.includes(userPermissionLevel);
  const hasOperationAccess =
    rule.allowedOperations.includes(operation) ||
    (rule.allowedOperations.includes("read") && operation.startsWith("read"));

  return hasRoleAccess && hasOperationAccess;
};

const getPermissionLevel = (role: string): PermissionLevel => {
  switch (role.toLowerCase()) {
    case "admin":
      return PermissionLevel.ADMIN;
    case "teacher":
      return PermissionLevel.TEACHER;
    case "student":
      return PermissionLevel.STUDENT;
    default:
      return PermissionLevel.PUBLIC;
  }
};

// Data sanitization function
const sanitizeData = (data: any, resource: string, userRole: string): any => {
  if (!data || typeof data !== "object") return data;

  const rule = dataAccessRules.find((r) => r.resource === resource);
  if (!rule) return data;

  const userPermissionLevel = getPermissionLevel(userRole);

  // If user has admin access, return all data
  if (
    rule.allowedRoles.includes(PermissionLevel.ADMIN) &&
    userPermissionLevel === PermissionLevel.ADMIN
  ) {
    return data;
  }

  // Filter sensitive fields based on role
  const sanitized = { ...data };

  // Remove sensitive fields that user shouldn't see
  rule.sensitiveFields.forEach((field) => {
    if (sanitized.hasOwnProperty(field)) {
      delete sanitized[field];
    }
  });

  // Additional pattern-based filtering for any remaining sensitive data
  const sanitizeObject = (obj: any): any => {
    if (typeof obj === "string") {
      // Check for sensitive patterns in strings
      for (const pattern of sensitivePatterns) {
        if (pattern.test(obj)) {
          return "[REDACTED - Sensitive Information]";
        }
      }
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => sanitizeObject(item));
    }

    if (typeof obj === "object" && obj !== null) {
      const sanitizedObj: any = {};
      for (const [key, value] of Object.entries(obj)) {
        // Skip sensitive field names
        if (sensitivePatterns.some((pattern) => pattern.test(key))) {
          sanitizedObj[key] = "[REDACTED - Sensitive Information]";
        } else {
          sanitizedObj[key] = sanitizeObject(value);
        }
      }
      return sanitizedObj;
    }

    return obj;
  };

  return sanitizeObject(sanitized);
};

// Enhanced query analysis with security context
const analyzeQueryWithSecurity = (query: string, userRole: string): any => {
  const analysis: any = analyzeQuery(query);

  // Add security context
  analysis.securityContext = {
    requiresAuthentication:
      !analysis.category.includes("greeting") &&
      !analysis.category.includes("help"),
    dataAccess: getDataAccessRequirements(query, userRole),
    sensitivityLevel: getSensitivityLevel(query),
  };

  return analysis;
};

// Determine data access requirements for a query
const getDataAccessRequirements = (
  query: string,
  userRole: string,
): string[] => {
  const lowerQuery = query.toLowerCase();
  const requirements: string[] = [];

  // Student data access
  if (
    lowerQuery.includes("student") ||
    lowerQuery.includes("grade") ||
    lowerQuery.includes("attendance")
  ) {
    requirements.push("student_profile");
    if (lowerQuery.includes("list") || lowerQuery.includes("all")) {
      requirements.push("student_list");
    }
  }

  // Teacher data access
  if (lowerQuery.includes("teacher") || lowerQuery.includes("faculty")) {
    requirements.push("teacher_profile");
  }

  // Grades access
  if (lowerQuery.includes("grade")) {
    requirements.push("grades");
  }

  // Attendance access
  if (lowerQuery.includes("attendance")) {
    requirements.push("attendance");
  }

  return requirements;
};

// Determine sensitivity level of query
const getSensitivityLevel = (query: string): "low" | "medium" | "high" => {
  const lowerQuery = query.toLowerCase();

  if (
    lowerQuery.includes("password") ||
    lowerQuery.includes("secret") ||
    lowerQuery.includes("key") ||
    lowerQuery.includes("token") ||
    lowerQuery.includes("salary") ||
    lowerQuery.includes("financial")
  ) {
    return "high";
  }

  if (
    lowerQuery.includes("personal") ||
    lowerQuery.includes("private") ||
    lowerQuery.includes("contact") ||
    lowerQuery.includes("address")
  ) {
    return "medium";
  }

  return "low";
};

// General AI Assistant Responses
const generalResponses = {
  greetings: [
    "Hello! I'm your AI assistant. How can I help you today?",
    "Hi there! I'm here to assist you with any questions you have.",
    "Greetings! What can I help you with?",
  ],

  help: [
    "I can help you with a wide variety of topics including technology, science, history, mathematics, programming, and more. I can also provide information about your student/teacher profile if you're authenticated. What would you like to know?",
    "I'm a general-purpose AI assistant. I can answer questions on virtually any topic, from science and technology to history and culture. If you're a student or teacher, I can also access your profile information. How can I assist you?",
  ],

  technology: {
    programming: [
      "Programming involves writing code to create software applications. Popular languages include JavaScript, Python, Java, C++, and many others. Each language has its strengths - JavaScript for web development, Python for data science, etc.",
      "There are many programming languages to choose from. JavaScript is great for web development, Python excels in data science and automation, Java is widely used for enterprise applications, and C++ offers high performance for system programming.",
    ],

    ai: [
      "Artificial Intelligence (AI) is a field of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. This includes machine learning, natural language processing, computer vision, and more.",
      "AI encompasses various technologies like machine learning, deep learning, neural networks, and expert systems. It's being used in healthcare, finance, transportation, and many other industries to solve complex problems.",
    ],

    web: [
      "Web development involves creating websites and web applications. It typically includes frontend development (HTML, CSS, JavaScript) and backend development (servers, databases, APIs). Popular frameworks include React, Angular, Vue.js for frontend, and Node.js, Django, Flask for backend.",
      "Modern web development uses technologies like HTML5, CSS3, JavaScript, and various frameworks. Full-stack development includes both client-side and server-side programming, often with databases and APIs.",
    ],
  },

  science: {
    physics: [
      "Physics is the fundamental science that studies matter, energy, and their interactions. It includes classical mechanics, electromagnetism, thermodynamics, quantum mechanics, and relativity.",
      "Physics explores the fundamental laws of nature, from the smallest particles to the vastness of the universe. Key areas include mechanics, electricity, magnetism, optics, and modern physics like quantum theory.",
    ],

    biology: [
      "Biology is the study of life and living organisms. It encompasses everything from molecular biology and genetics to ecology and evolution. Key concepts include cells, DNA, evolution, and ecosystems.",
      "Biology covers the study of living organisms, their structure, function, growth, evolution, and distribution. Major branches include molecular biology, ecology, physiology, and microbiology.",
    ],

    chemistry: [
      "Chemistry is the science of matter and its transformations. It studies the composition, structure, properties, and reactions of substances. Key areas include organic chemistry, inorganic chemistry, physical chemistry, and biochemistry.",
      "Chemistry explores how atoms and molecules interact and transform. It includes the study of chemical reactions, bonding, energy changes, and the properties of different substances.",
    ],
  },

  mathematics: [
    "Mathematics is the study of numbers, quantities, shapes, and patterns. It includes arithmetic, algebra, geometry, calculus, statistics, and many other branches. Math is fundamental to science, engineering, and technology.",
    "Mathematics provides the language and tools for understanding patterns, relationships, and quantitative phenomena. It includes pure mathematics (like algebra and geometry) and applied mathematics (like statistics and computational methods).",
  ],

  history: [
    "History is the study of past events, particularly in human affairs. It helps us understand how societies have developed, what lessons we can learn from the past, and how current events are shaped by historical contexts.",
    "History encompasses the study of human civilization, from ancient times to the present. It includes political history, social history, economic history, cultural history, and the history of science and technology.",
  ],

  default: [
    "That's an interesting question! While I don't have specific information on that exact topic, I can help you explore related areas or provide general guidance. What specific aspect would you like to know more about?",
    "I'm designed to help with a wide range of topics. If you'd like information on technology, science, mathematics, history, or general knowledge, I'd be happy to assist. What would you like to learn about?",
  ],
};

// Audit logging for security monitoring
const logSecurityEvent = (event: {
  userId?: string | undefined;
  email?: string | undefined;
  role: string;
  action: string;
  resource?: string;
  query: string;
  sensitivityLevel: string;
  accessGranted: boolean;
  timestamp: string;
  ipAddress?: string | undefined;
}) => {
  console.log(`[SECURITY AUDIT] ${JSON.stringify(event)}`);
  // In production, this would be sent to a security monitoring system
};

// Enhanced response filtering
const filterResponseForSecurity = (
  response: string,
  userRole: string,
  sensitivityLevel: string,
): string => {
  if (sensitivityLevel === "high" && userRole !== "admin") {
    return "I'm sorry, but I cannot provide information on sensitive topics. Please contact an administrator for assistance.";
  }

  // Additional filtering for sensitive patterns in responses
  let filteredResponse = response;
  for (const pattern of sensitivePatterns) {
    filteredResponse = filteredResponse.replace(pattern, "[REDACTED]");
  }

  return filteredResponse;
};

// Role-restricted query patterns
const teacherOnlyQueries = [
  "student list",
  "attendance",
  "grade submission",
  "publish grades",
  "class roster",
  "exam schedule",
  "review students",
  "student performance",
  "assign homework",
  "manage class",
];

const studentOnlyQueries = [
  "my grade",
  "my student id",
  "my year",
  "my class",
  "homework",
  "exam preparation",
  "scholarship",
  "tuition",
  "class schedule",
  "study",
];

const normalizeQuery = (query: string) => query.trim().toLowerCase();

const isTeacherOnly = (query: string) =>
  teacherOnlyQueries.some((keyword: string) => query.includes(keyword));
const isStudentOnly = (query: string) =>
  studentOnlyQueries.some((keyword: string) => query.includes(keyword));

const analyzeQuery = (query: string) => {
  const lowerQuery = query.toLowerCase();

  // Check for greetings
  if (
    lowerQuery.match(
      /\b(hello|hi|hey|greetings|good morning|good afternoon|good evening)\b/,
    )
  ) {
    return { category: "greeting", responses: generalResponses.greetings };
  }

  // Check for help requests
  if (lowerQuery.match(/\b(help|assist|what can you do|how can you help)\b/)) {
    return { category: "help", responses: generalResponses.help };
  }

  // Technology topics
  if (
    lowerQuery.match(
      /\b(programming|coding|javascript|python|java|c\+\+|software|development)\b/,
    )
  ) {
    return {
      category: "programming",
      responses: generalResponses.technology.programming,
    };
  }

  if (
    lowerQuery.match(
      /\b(ai|artificial intelligence|machine learning|neural network|deep learning)\b/,
    )
  ) {
    return { category: "ai", responses: generalResponses.technology.ai };
  }

  if (
    lowerQuery.match(/\b(web|website|html|css|frontend|backend|full.?stack)\b/)
  ) {
    return { category: "web", responses: generalResponses.technology.web };
  }

  // Science topics
  if (
    lowerQuery.match(
      /\b(physics|quantum|relativity|mechanics|electromagnetism)\b/,
    )
  ) {
    return { category: "physics", responses: generalResponses.science.physics };
  }

  if (lowerQuery.match(/\b(biology|dna|genetics|ecology|evolution|cell)\b/)) {
    return { category: "biology", responses: generalResponses.science.biology };
  }

  if (
    lowerQuery.match(/\b(chemistry|chemical|reaction|molecule|atom|bond)\b/)
  ) {
    return {
      category: "chemistry",
      responses: generalResponses.science.chemistry,
    };
  }

  // Other topics
  if (
    lowerQuery.match(
      /\b(math|mathematics|algebra|geometry|calculus|statistics)\b/,
    )
  ) {
    return { category: "mathematics", responses: generalResponses.mathematics };
  }

  if (
    lowerQuery.match(
      /\b(history|historical|civilization|ancient|medieval|modern)\b/,
    )
  ) {
    return { category: "history", responses: generalResponses.history };
  }

  // Default response
  return { category: "general", responses: generalResponses.default };
};

const getRandomResponse = (responses: string[]): string => {
  if (!responses || responses.length === 0) {
    return "I'm here to help! What would you like to know?";
  }
  const randomIndex = Math.floor(Math.random() * responses.length);
  return (
    responses[randomIndex] || "I'm here to help! What would you like to know?"
  );
};

const buildGeneralAnswer = (query: string): string => {
  const analysis = analyzeQuery(query);
  return getRandomResponse(analysis.responses);
};

const buildStudentAnswer = (query: string, student: any) => {
  if (
    query.includes("profile") ||
    query.includes("who am i") ||
    query.includes("about me")
  ) {
    return `You are ${student.name}, a ${student.year} year student in ${student.department}. Your student ID is ${student.studentId}.`;
  }

  if (query.includes("department")) {
    return `Your department is ${student.department}.`;
  }

  if (query.includes("student id") || query.includes("id")) {
    return `Your student ID is ${student.studentId}.`;
  }

  if (query.includes("year")) {
    return `You are in year ${student.year}.`;
  }

  if (query.includes("class") || query.includes("role")) {
    return `Your class role is ${student.class_role || "not specified"}.`;
  }

  if (query.includes("hobby") || query.includes("hobbies")) {
    return `Your hobbies are ${student.hobbies?.join(", ") || "not specified"}.`;
  }

  return `I can help with your student profile, department, year, and student identity. Ask about your profile or academic info.`;
};

const buildTeacherAnswer = (query: string, teacher: any) => {
  if (
    query.includes("profile") ||
    query.includes("who am i") ||
    query.includes("about me")
  ) {
    return `You are ${teacher.name}, a ${teacher.position} in the ${teacher.department} department.`;
  }

  if (query.includes("department")) {
    return `Your department is ${teacher.department}.`;
  }

  if (query.includes("position")) {
    return `Your position is ${teacher.position}.`;
  }

  if (query.includes("bio") || query.includes("description")) {
    return `${teacher.bio} ${teacher.description}`;
  }

  if (query.includes("address")) {
    return `Your address is ${teacher.address}.`;
  }

  return `I can help with your teacher profile, position, department, and course-related support. Ask about your profile or classroom responsibilities.`;
};

const buildGenericAnswer = (query: string) => {
  if (
    query.includes("help") ||
    query.includes("assist") ||
    query.includes("can you")
  ) {
    return "I can answer student- and teacher-related questions based on your authenticated profile. Ask about your profile, department, courses, or role-specific tasks.";
  }

  return "I can help with student and teacher queries and will use your authenticated profile to answer. Please ask about your role, profile, or academic information.";
};

export const assistantQuery = async (req: JWTAuthRequest, res: Response) => {
  const startTime = Date.now();
  let accessGranted = false;
  let sensitivityLevel = "low";

  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Query text is required",
        data: null,
      });
    }

    // Authentication is now handled by JWT middleware
    // If we reach here, the user is authenticated via OTP + JWT
    const email = req.user?.email;
    const userId = req.user?.userId;

    if (!email) {
      // This should not happen if JWT middleware is working correctly
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Authentication verification failed. Please log in again.",
        data: null,
      });
    }

    const normalizedQuery = normalizeQuery(query);

    // Fetch user data with role verification
    const student = await Student.findOne({ email }).select("-password");
    const teacher = await Teacher.findOne({ email }).select("-password");
    const user = await User.findOne({ email });

    let role = req.user?.userType || "user";
    if (!role || role === "user") {
      if (student) role = "student";
      else if (teacher) role = "teacher";
      else if (user) role = "user";
      else role = "public";
    }

    // Analyze query with security context
    const queryAnalysis = analyzeQueryWithSecurity(query, role);
    sensitivityLevel = queryAnalysis.securityContext.sensitivityLevel;

    // Check permissions for data access requirements
    const dataAccessRequirements = queryAnalysis.securityContext.dataAccess;
    const hasAllPermissions = dataAccessRequirements.every((resource: string) =>
      hasPermission(role, resource, "read"),
    );

    if (!hasAllPermissions && dataAccessRequirements.length > 0) {
      logSecurityEvent({
        userId: userId || undefined,
        email,
        role,
        action: "query_denied",
        resource: dataAccessRequirements.join(","),
        query: query.substring(0, 100),
        sensitivityLevel,
        accessGranted: false,
        timestamp: new Date().toISOString(),
        ipAddress: req.ip,
      });

      return sendResponse(res, {
        statusCode: 403,
        success: false,
        message:
          "Access denied: Insufficient permissions for requested information",
        data: null,
      });
    }

    // Check for role-restricted queries
    if (isTeacherOnly(normalizedQuery) && role !== "teacher") {
      logSecurityEvent({
        userId: userId || undefined,
        email,
        role,
        action: "role_restricted_query_denied",
        query: normalizedQuery,
        sensitivityLevel,
        accessGranted: false,
        timestamp: new Date().toISOString(),
      });

      return sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden: This query is only available to teachers",
        data: null,
      });
    }

    if (isStudentOnly(normalizedQuery) && role !== "student") {
      logSecurityEvent({
        userId,
        email,
        role,
        action: "role_restricted_query_denied",
        query: normalizedQuery,
        sensitivityLevel,
        accessGranted: false,
        timestamp: new Date().toISOString(),
      });

      return sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden: This query is only available to students",
        data: null,
      });
    }

    let answer: string;
    let queryType: string;
    let accessedData: any = null;

    // Handle role-specific queries with data sanitization
    if (
      role === "student" &&
      student &&
      (isStudentOnly(normalizedQuery) ||
        normalizedQuery.includes("profile") ||
        normalizedQuery.includes("who am i"))
    ) {
      accessedData = sanitizeData(student, "student_profile", role);
      answer = buildStudentAnswer(normalizedQuery, accessedData);
      queryType = "student_profile";
      accessGranted = true;
    } else if (
      role === "teacher" &&
      teacher &&
      (isTeacherOnly(normalizedQuery) ||
        normalizedQuery.includes("profile") ||
        normalizedQuery.includes("who am i"))
    ) {
      accessedData = sanitizeData(teacher, "teacher_profile", role);
      answer = buildTeacherAnswer(normalizedQuery, accessedData);
      queryType = "teacher_profile";
      accessGranted = true;
    } else {
      // Handle general AI queries
      answer = buildGeneralAnswer(query);
      answer = filterResponseForSecurity(answer, role, sensitivityLevel);
      queryType = "general_ai";
      accessGranted = true;
    }

    logSecurityEvent({
      userId: userId || undefined,
      email,
      role,
      action: "query_processed",
      resource: queryType,
      query: query.substring(0, 100),
      sensitivityLevel,
      accessGranted: true,
      timestamp: new Date().toISOString(),
      ipAddress: req.ip,
    });

    const processingTime = Date.now() - startTime;

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assistant response generated successfully",
      data: {
        role,
        queryType,
        answer,
        sensitivityLevel,
        processingTime,
        timestamp: new Date().toISOString(),
        // Include sanitized data access info for transparency
        dataAccessed: accessedData ? Object.keys(accessedData) : null,
      },
    });
  } catch (error) {
    console.error("Assistant query error:", error);

    logSecurityEvent({
      email: req.user?.email || undefined,
      role: req.user?.userType || "unknown",
      action: "query_error",
      query: req.body?.query?.substring(0, 100) || "unknown",
      sensitivityLevel,
      accessGranted: false,
      timestamp: new Date().toISOString(),
    });

    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error processing assistant query",
      data: null,
    });
  }
};
