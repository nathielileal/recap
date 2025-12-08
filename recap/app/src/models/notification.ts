export interface Notification {
    id: string;
    userId: string;
    type: string;
    read: boolean;
    data: NotificationData;
    createdAt: string;
}

export interface NotificationData {
    message: string;
    timestamp: string;
    followerId: string;
    followerName: string;
}