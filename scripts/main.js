/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();
var canvas = null;
$(window).resize(function () { 
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight; 
});
var ctx = null;
var img = null;
var frameRate = 1000/60;
var framecount = 0;
var frame = 0;
var frames = [];
var Landscape = Class.extend({
	init: function(){
	this.Objects;//Later will add objects on the field.
	}
});
var Weapon = Class.extend({
	init: function(){
	this.angle;
	this.shot = false;
	this.Rate;//speed of the weapon
	this.Type;
	this.x ;//= -1+(window.innerWidth/2);
	this.y ;//= -35+(window.innerHeight-60);
	this.i = 0;
	this.Bullets;//bullet count before reload
	this.Sound;
	},
	shoot: function(){
			if((this.i-35) < canvas.height)
			{
			ctx.save();
			ctx.translate(canvas.width/2, canvas.height-60);
			ctx.rotate(this.angle);
			ctx.fillRect(-1,-35,3,3);
			ctx.restore();
			this.i += 4;
			}
	}
});
var Player = Class.extend({
	init: function(){
		this.Position = [(window.innerWidth/2),(window.innerHeight-60)];
		this.Box;
		this.Rotation;
	}, 
	Animate: function(){
	
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height-60);
	ctx.rotate(Math.atan2(world.mouseX-(canvas.width/2), canvas.height-world.mouseY));
	ctx.drawImage(img, 0, 702, 50, 65, -25, -33, 50, 66);
	ctx.restore();
	}
});
var World = Landscape.extend({
	init: function(level){
		this.Score;
		this.Level = level;
		//this.assets = [ 60, 90, 150, 180, 210, 180, 150 ,90];
		this.mouseX = 0;
		this.mouseY = 0;
		this.message = "Start you engines!";
	},
	/*vertical: function() {
	var i=0; 
	for (i<canvas.width)
	{
	 i+= 27;
	}
	 return i;
   }*/
});
var world = new World(1);//Needs to be Global;
console.log("User at Level:"+world.Level);
var weapon = new Weapon();
var player = new Player();
var setup = function(){
	canvas = document.getElementById("window");
	canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        world.message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		world.mouseX = mousePos.x;
		world.mouseY = mousePos.y;
      }, false);
	canvas.addEventListener('mousedown', onKeyDown);
	ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	img = new Image();
	img.onload = function(){
		ctx.drawImage(img, 0,0, 1008, 700, 0, 0, canvas.width, canvas.height);
	};	
	img.src = "images/landscape2.png";
	setInterval(animate, frameRate)
};
var animate = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0,0, 1008, 700, 0, 0, canvas.width, canvas.height);
	ctx.font = "bold 22px Arial";
	ctx.fillText("Score:0", 25, 25);
	ctx.fillText("Level:"+world.Level, canvas.width - 100, 25);
	player.Animate();
	//penguins.animate();
	ctx.rect(403, 500, 29, 26);
	ctx.stroke();
	 if(weapon.shot)
	 {
		 weapon.shoot();
		 weapon.angel = weapon.angle / Math.PI * 180;
		 weapon.x = window.innerWidth/2;
		 weapon.y = window.innerHeight-60;
		 var el1 = {x:weapon.x, y:weapon.y, r:weapon.angle};
		 el1 = getXYR(el1);
		 ctx.fillText("Angle:"+weapon.angle, 20, 120);
		 ctx.fillText("X:"+el1.x+" Y"+el1.y+" R:"+el1.r, 20, 50);
	 }
	
};
function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      };

//Input engine!  
function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      };
function onKeyDown(event){
		event.preventDefault()
		weapon.shot = true;
		var x = world.mouseX;
		var y = world.mouseY;
	    weapon.angle = Math.atan2(world.mouseX-(window.innerWidth/2), (window.innerHeight-60)- world.mouseY);
	  };
var deg2rad, rad2deg, getXYR;

deg2rad = function ( d ) { return d * Math.PI / 180 };
rad2deg = function ( r ) { return r / Math.PI * 180 };

getXYR = function ( node ) {
  var x, y, r,
      parentXYR, pX, pY, pR,
      nX, nY;

  x = y = r = 0;

  if ( node ) {
    parentXYR = getXYR( node.parent );
    pX = parentXYR.x;
    pY = parentXYR.y;
    pR = deg2rad( parentXYR.r );
    nX = node.x;
    nY = node.y;

    x = pX + nX * Math.cos( pR ) - nY * Math.sin( pR );
    y = pY + nX * Math.sin( pR ) + nY * Math.cos( pR );
    r = rad2deg( pR + deg2rad( node.r ) );
  }

  return { x:x, y:y, r:r };
};