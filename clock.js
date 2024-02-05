var canvas = document.getElementById("canvas"); //connects to the canvas id in html
 var ctx = canvas.getContext("2d"); //create a 2d drawing object
 var radius = canvas.height / 2; //alows the clock to work and fit within the canvas
 ctx.translate(radius, radius); // remaps it to the center of the canvas
 radius = radius * 0.90
 setInterval(drawClock, 1000); //allow the clock to start, ever econd the clock ticks

 
 function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    
}

function drawFace(ctx, radius) {
    var grad; //variable for gradient
    ctx.beginPath(); //14 to 17, draw the white circle
    ctx.arc(0, 0, radius, 0, 2*Math.PI); // circle parameters
    ctx.fillStyle = 'white'; //inside color of clock
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05); //creating the outer ciecle
    grad.addColorStop(0, '#335');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#335'); //colorstop is used to create a 3d effect
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke(); //to draw the circle
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle ='#333';
    ctx.fill();   //to draw the center
}


function drawNumbers(ctx, radius)
{
    var ang;
    var num;
    ctx.font = radius*0.15 + "px arial"; //setting the font size to be 15% of the radius
    ctx.textBaseline="middle"; // set the text alignment to middle and center
    ctx.textAlign="center";
    for(num = 1; num<13;num++)    //calculating the print number, 85% of the radius.
    {
        ang = num* Math.PI / 6;  //allows the numbers to fit perfectly within the circle
        ctx.rotate(ang); 
        ctx.translate(0, -radius*0.85); //remap
        ctx.rotate(-ang); 
        ctx.fillText(num.toString(), 0, 0); //putting th text on the clock
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }

}

//time for the clock
function drawTime(ctx, radius)
{
    var now = new Date();
    var hour = now.getHours()          //using the date ot get hour min and second
    var minute = now.getMinutes();
    var second = now.getSeconds();

    hour = hour%12;
    hour = (hour*Math.PI/6)+ 
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));                       //Calculate the angle of the hour hand and draws it
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));     //Calculate the angle of the Min hand and draws it  
    drawHand(ctx, minute, radius*0.8, radius*0.07);

    //second 
    second =(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);        ////Calculate the angle of the second hand and draws it

}

function drawHand(ctx, pos, length, width)
{
    ctx.beginPath();   //drawing begins
    ctx.lineWidth = width; //width of the hand
    ctx.lineCap = "round";   //linecap is used to set the style of the end caps of the line
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length); //creates a new point and creates a line to that point from the last specified point from the canvas
    ctx.stroke();
    ctx.rotate(-pos);

}