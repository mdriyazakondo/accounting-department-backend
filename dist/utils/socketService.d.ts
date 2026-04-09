import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
declare class SocketService {
    private io;
    constructor(server: HTTPServer);
    private authenticateSocket;
    private initializeSocketEvents;
    private broadcastOnlineUsers;
    emitToRoom(roomId: string, event: string, data: any): void;
    emitToUser(userId: string, event: string, data: any): void;
    getIO(): SocketIOServer<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
}
export default SocketService;
//# sourceMappingURL=socketService.d.ts.map