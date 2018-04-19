//
// function getHotels(url) {
//   jQuery(document).ready(function($) {
//           var request = {
//             "requests": [
//               {
//                 "image": {
//                   "content": url,
//                 },
//                 "features": [
//                   {
//                     "type": "WEB_DETECTION",
//                     "maxResults": 10
//                   }
//                 ]
//               }
//             ]
//           }
//
//           $.ajax({
//             method: 'POST',
//             url:  'https://us-central1-reverse-image-200921.cloudfunctions.net/getHotels',
//             contentType: 'application/json',
//             beforeSend: function(req){
//                 req.setRequestHeader("Access-Control-Allow-Origin","*");
//                 req.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
//                 req.setRequestHeader('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
//             },
//             data: JSON.stringify(request),
//             processData: false,
//             success: function(data){
//               console.log("Data: " + data);
//               var webData = data.responses[0].webAnnotations[0];
//               console.log("Web Data: " + webData);
//             },
//             error: function (data, textStatus, errorThrown) {
//               console.log("Error is in server");
//               console.log('error: ' + data);
//             }
//           })
//   });
//
// }

const key = "";


function getHotels(url) {

        var request = {
          "requests": [
            {
              "image": {
                "content": url,
              },
              "features": [
                {
                  "type": "WEB_DETECTION",
                  "maxResults": 1
                }
              ]
            }
          ]
        }



        $.ajax({
          method: 'POST',
          url:  'https://vision.googleapis.com/v1/images:annotate?key=' + key,
          contentType: 'application/json',
          data: JSON.stringify(request),
          processData: false,
          beforeSend: function(req) {
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            console.log(req);
          },
          success: function(data){
            console.log("Data: " + data);
            var webData = data.responses[0].webAnnotations[0];
            console.log("Web Data: " + webData);
          },
          error: function (data, textStatus, errorThrown) {
            console.log('error: ' + errorThrown);
          }
        });

}


function encodeImageAsURL() {
  var file = $("#input").prop('files')[0];
  var reader = new FileReader();
  getHotels(reader.readAsDataURL(file));
}
