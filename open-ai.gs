function getDefinition(wordOrPhrase) {
  // Get an instance of the script properties service
  var scriptProperties = PropertiesService.getScriptProperties();

  // Retrieve API key from script properties
  var apiKey = scriptProperties.getProperty('OPENAI_API_KEY');

  var apiEndpoint = 'https://api.openai.com/v1/chat/completions';

  var data = {
    "model": "gpt-3.5-turbo-0125",
    "messages": [
      {"role": "system", "content": "I am here to provide the description of the company according to their wikipedia page. Don't share where the headquarter is nor if it is in the fortune 100/500 or global fortune 500"},
      {"role": "user", "content": "Define " + wordOrPhrase}
    ]
  };

  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': 'Bearer ' + apiKey
    },
    'payload' : JSON.stringify(data)
  };

  var response = UrlFetchApp.fetch(apiEndpoint, options);
  var responseJson = JSON.parse(response.getContentText());
  return responseJson["choices"][0]["message"]["content"]
}
