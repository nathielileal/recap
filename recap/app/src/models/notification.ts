export interface Notification {
    id: string;
    type: string;
    read: boolean;
    userId: string;
    createdAt: string;
    data: NotificationType[];
}

export interface NotificationType {
    message: string;
    timestramp: string;
    followerId: string;
    followerName: string;
}