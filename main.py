#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
game = '''
<!DOCTYPE html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <title>Penguins Rising</title>
    <meta name="description" content="Penguins Rising"/>
	<link rel="icon" type="image/png" href="images/myicon.png">
	<link rel="stylesheet" type="text/css" href="static/index.css">
</head>
<body id="body" onload="setup()" class="loading">
<img src="static/landscape.png" width="1200" id="background" style="display:none;" alt="Please Wait..." onloadstart="showProgressBar()"  onprogress="updateProgressBar(event)" onloadend="hideProgressBar()"/>
<div id="SplashScreen">
<h1>Penguins Rising</h1>
<input id="StartButton" type="button" value="Start" style="display:none;"/>
    <span id="signinButton">
        <span class="g-signin"
            data-scope="https://www.googleapis.com/auth/games"
            data-requestvisibleactions="http://schemas.google.com/AddActivity"
            data-clientId="ID HERE!"
            data-callback="signinCallback"
            data-cookiepolicy="single_host_origin">
        </span>
    </span>
</div>
<canvas id="window" >Sorry but Canvas is not Supported</canvas>
<audio id="gunshot">
  <source src="static/gunshot.wav" type="audio/wav">
  <source src="static/gunshot.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<!--img class="promotes left" src="images/HTML5_Logo_32.png" width="32" height="32" alt="HTML5 Powered" title="HTML5 Powered"-->
</body><script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="https://apis.google.com/js/client.js?onload=onLoadCallback"></script>
<script src="static/main.js"></script>

    </script>
</html>
'''

class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(game)

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
