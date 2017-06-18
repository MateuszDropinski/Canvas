window.addEventListener('load',function(){
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    
    function getImageRGB(img)
    {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            rgb = {
                r: 0,                
                g: 0,
                b: 0,
            },
            width,height,length,
            data, count=0;
        
        if(img.path != undefined)
        {
            height = canvas.height = img.path[0].naturalHeight;
            width = canvas.width = img.path[0].naturalWidth;
        }
        else
        {
            height = canvas.height = img.naturalHeight;
            width = canvas.width = img.naturalWidth;
        }
        
        ctx.drawImage(img,0,0);
        
        data = ctx.getImageData(0,0,width,height).data; 
        
        for(i=0,l=data.length;i<l;i+=4)
        {
            rgb.r+=data[i];
            rgb.g+=data[i+1];
            rgb.b+=data[i+2];
            count++;
        }
        
        rgb.r=Math.floor(rgb.r/count);
        rgb.g=Math.floor(rgb.g/count);
        rgb.b=Math.floor(rgb.b/count);
        
        var boxShadow = `0px 0px 75px 25px rgb(${rgb.r} , ${rgb.g} , ${rgb.b})`;
        
        return boxShadow;
            
    }
    
    function changeShadow()
    {
        image.style.boxShadow = getImageRGB(image);
    }
    
    function getSrc(img)
    {
        if (img.files && img.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e){
                image.setAttribute('src', e.target.result);
            }

            reader.readAsDataURL(img.files[0]);
        }
    }
    
    var image = document.getElementsByClassName('image')[0],
        input = document.getElementsByClassName('change-image')[0]; 
    
    image.addEventListener('click',function(){
        input.click();    
    });
    
    input.addEventListener('change',function(){
        getSrc(this);    
    });
    
    image.addEventListener('load',function(){
        changeShadow();
    })
    
    changeShadow();
});