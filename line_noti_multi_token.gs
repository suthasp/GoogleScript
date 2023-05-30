function main() {

  //--------- Setup Parameter ---------//
  var sheetid = "1fDiZY0P0cB5vtbG6ZTJQm7yGQV-1S0xQdqJjIScQfMw";
  //var notifyToken = "RRQ2TP9ZjVurFUmboxxlQJE5u1OWU0UtlmTrTBaRq76";
  var notifyToken = ['RRQ2TP9ZjVurFUmboxxlQJE5u1OWU0UtlmTrTBaRq76', 'CmYUDyPKzvZtKajhxlQxo3X7HrMBdgrhXP7zFzcC6Z1'];

  var ssName = "ตาราง Pivot 1"; //ชื่อ sheet สำหรับรายงาน
  var ssChart1 = "ตาราง Pivot 1"; //ชื่อ sheet ที่จะเอา chart ไปใช้ 
  var ssChart2 = "ตาราง Pivot 1"; //ชื่อ sheet ที่จะเอา chart ไปใช้ 


  // ------------------------------------//

  var ss = SpreadsheetApp.openById(sheetid).getSheetByName(ssName);
  var msg1;
  var msg2;
  var msg;

  // --------- ข้อความของคุณที่จะให้แสดง - 1 --------//
  msg1 = "Activity Owner by Site " + "\n" + "อัพเดทล่าสุดวันที่ :" + DateConvert(ss.getRange('G1').getValue()) + "\n" + "M01 : " + "Within/Over = " + ss.getRange('C31').getValue() + "/" + ss.getRange('B31').getValue() + "\n"
    + "M02 : " + "Within/Over = " + ss.getRange('C32').getValue() + "/" + ss.getRange('B32').getValue() + "\n"
    + "M03 : " + "Within/Over = " + ss.getRange('C33').getValue() + "/" + ss.getRange('B33').getValue() + "\n"
    + "M04 : " + "Within/Over = " + ss.getRange('C34').getValue() + "/" + ss.getRange('B34').getValue() + "\n"
    + "M05 : " + "Within/Over = " + ss.getRange('C35').getValue() + "/" + ss.getRange('B35').getValue() + "\n";
  // ------------------------------------//

  // --------- ข้อความของคุณที่จะให้แสดง - 2 --------//
  msg2 = "Ticket by Month ";
  // ------------------------------------//


  // --------- Sending Message and Chart to LineNotify - 1 --------//
  msg = {
    message: msg1,
    imageFile: getChart(sheetid, ssChart1, 0),
  }
  sendLineNotify(msg, notifyToken);

  // --------- Sending Message and Chart to LineNotify - 2 --------//
  msg = {
    message: msg2,
    imageFile: getChart(sheetid, ssChart2, 1),
  }
  sendLineNotify(msg, notifyToken);

}

function sendLineNotify(messages, accessToken) {

  for (var i = 0; i < accessToken.length; i++) {
    const lineNotifyEndPoint = "https://notify-api.line.me/api/notify";

    const options = {
      "headers": { "Authorization": "Bearer " + accessToken[i] },
      "method": 'post',
      "payload": messages,
    };

    try {
      UrlFetchApp.fetch(lineNotifyEndPoint, options);
    } catch (error) {
      Logger.log(error.name + "：" + error.message);
      return;
    }
  }
}

function getChart(ssid, name, pos) {
  var ss = SpreadsheetApp.openById(ssid).getSheetByName(name);
  var chart = ss.getCharts()[pos].getBlob().getAs("image/png");
  return chart;
}

function DateConvert(date) {

  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
  var dd = date.getDate().toString();

  return (dd[1] ? dd : "0" + dd[0]) + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + yyyy;
};