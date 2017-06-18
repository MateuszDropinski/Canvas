window.addEventListener('load',function(){
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        width,height,particles;
    
    var image = document.getElementsByClassName('image')[0];
    
    function setResolution()
    {
        canvas.width = width = window.innerWidth;
        canvas.height = height = window.innerHeight;
    }
    
    function createParticles()
    {
        particles = new Array();
        var amountOfParticles = Math.ceil((width*height)/10000);
        for(i=0;i<amountOfParticles;i++)
        {
            particles.push(createNewParticle());
        }
        update();
    }
    
    function createNewParticle()
    {
        var x = Math.ceil(Math.random()*width),            
            y = Math.ceil(Math.random()*height),
            velX = Math.ceil(Math.random()*8)/32,
            xSign = Math.ceil(Math.random()*2)-1,
            velY = Math.ceil(Math.random()*8)/32,
            ySign = Math.ceil(Math.random()*2)-1;
        
        var particle = {
            x: x,
            y: y,
            velX: xSign ? velX : velX*-1,
            velY: ySign ? velY : velY*-1,
            lines:Math.floor(Math.random()*3)
        }
        return particle;
    }
    
    function drawParticles()
    {
        particles.forEach(function(elem,index){
            ctx.beginPath();
            ctx.arc(elem.x,elem.y,5,0,2*Math.PI);
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fill();
            elem.x+=elem.velX;
            elem.y+=elem.velY;
            var count = 0;
            particles.forEach(function(elem2,index2){
                if(index2!=index && elem.lines!=count)
                {
                    if(elem.x-elem2.x > -100 && elem.x-elem2.x < 100 && elem.y-elem2.y > -100 && elem.y-elem2.y < 100)
                    {
                        ctx.beginPath();
                        ctx.moveTo(elem.x,elem.y);
                        ctx.lineTo(elem2.x,elem2.y);
                        ctx.strokeStyle = "rgba(255,255,255,0.3)";
                        ctx.stroke();
                        count++;
                    }
                }
            });
            if(elem.x<0 || elem.x>width || elem.y <0 || elem.y>height)
            {
                particles.splice(index,1,createNewParticle());
            }
        });
    }
    
    function update()
    {
        ctx.clearRect(0,0,width,height);
        drawParticles();
        window.requestAnimationFrame(update);
    }
    
    window.addEventListener('resize',function(){setResolution();createParticles();})
    
    setResolution();
    createParticles();
});