import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';

const registerForPushNotificationsAsync = async () => {
    
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
    
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    
    
    return token;

}

export { registerForPushNotificationsAsync };