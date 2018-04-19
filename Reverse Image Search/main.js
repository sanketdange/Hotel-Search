

const key = "";


function getHotels(url) {
        var request = {
          "requests":[
            {
              "image":{
                "content": url.substring(23)
              },
              "features":[
                {
                  "type":"WEB_DETECTION",
                  "maxResults": 1
                }
              ]
            }
          ]
        }
      //  console.log(request.requests[0].image.content);


        $.ajax({
          method: 'POST',
          url:  'https://vision.googleapis.com/v1/images:annotate?key=' + key,
          contentType: 'application/json',
          data: JSON.stringify(request),
          processData: false,
          success: function(data){
            console.log("Data: " + data);
            var webData = data.responses[0].webDetection.bestGuessLabels[0].label;
            console.log(webData);
            $("#results").text(webData);
          },
          error: function (data, textStatus, err) {
            console.log('error: ' + err);
          }
        });

}


function encodeImageAsURL() {
    var file = $("#input").prop('files')[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onload = function () {
      getHotels(reader.result);
    };
}
