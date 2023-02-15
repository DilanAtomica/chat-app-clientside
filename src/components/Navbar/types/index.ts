export type notification = {
    created_at: Date,
    notificID: number,
    notificMsg: string,
    isRead: number,
    userID: number,
    openNotification?: (notificMsg: string, notificID: number, isRead: number) => void,
}

export type openNotificTypes = {
    notificID: number,
    isRead: number,
}