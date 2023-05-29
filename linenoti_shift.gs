function myFunction() {
  var token = 'jk4eVheuQphrsKRUOSjyaFBTXFe9Zo0cU5eI1QH6MAP'
  var ss = SpreadsheetApp.openById('1WsLU0gkjOyMyxhZbwW_WUsOLZPiGaqDUwdmYVBLrXIc')
  var sh = ss.getSheetByName('Data_Notify')
  var row = sh.getLastRow();

  var today = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy")
  var time = Utilities.formatDate(new Date(), "GMT+7", "HH:mm")
  var timer = "06:30"
  //var today = "01/04/2023"
  Logger.log(today)
  Logger.log(time)
  //var message = "สวัสดี CNO"
  //sendLineNotify(message, token)

  for (i = 2; i <= row; i++) {
    var date = Utilities.formatDate(sh.getRange(i,1).getValue(),"GMT+7", "dd/MM/yyyy")
    //var timer = sh.getRange(i, 4).getValue()

    if (today == date && time == timer) {
      var msg1 = today + '\n'
      //var msg1 = sh.getRange(i, 1).getValue() + '\n'
      var msg2 = sh.getRange(i, 2).getValue() + '\n'
      var msg3 = sh.getRange(i, 3).getValue() + '\n'
      var msg4 = sh.getRange(i, 4).getValue() + '\n'
      var msg5 = sh.getRange(i, 5).getValue() + '\n'
      var message = '\n วันที่ : ' + msg1 + ' ชื่อ-สกุล : ' + msg2 + ' เบอร์โทร์ : ' + msg3 + ' รับผิดชอบ : ' + msg4 + ' ทำงานกะ : ' + msg5
      sendLineNotify(message, token)
    }
  }
}

function sendLineNotify(message, token) {
  var options = {
    "method": "post",
    "payload": {
      "message": message,
    },
    "headers": { "Authorization": "Bearer " + token }
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}
