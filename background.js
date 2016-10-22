chrome.alarms.onAlarm.addListener(function() {
  chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Please blink regularly!',
        message: 'You have to blink your eye!'
     }, function() {});
});