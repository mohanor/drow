window.addEventListener('load', ()=>{
    const myCanvas = document.getElementById('canvas');
    const myContext = myCanvas.getContext('2d');
    const btn = document.getElementsByClassName('color');
    const btnSize = document.getElementsByClassName('size');
    const down = document.getElementById('down');
    var painting = false;

    myContext.fillStyle = "#FF0000";
    myContext.fillRect(0,0,500,600);
    myCanvas.height = 600;
    myCanvas.width = 500;
    myContext.lineWidth = 10;
    const drow = (e) =>
    {
        if(!painting) return;
        myContext.lineCap = "round";
        myContext.lineTo(e.clientX, e.clientY);
        myContext.stroke();
        myContext.beginPath();
        myContext.moveTo(e.clientX, e.clientY);
        
    };

    down.addEventListener('click', ()=>{
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = document.getElementById('canvas').toDataURL();
        link.download = "canvas.png";
        link.click();
        document.body.removeChild(link);
    });

    for(let i = 0; i < btn.length; i++)
    {
        btn[i].style.backgroundColor = btn[i].getAttribute('data-color');
        btn[i].addEventListener('click',(e)=>{
            const parent = e.srcElement;
            myContext.strokeStyle = parent.getAttribute('data-color');
        });
    }

    for(let i = 0; i < btnSize.length; i++)
    {
        btnSize[i].addEventListener('click', (e)=>{
            const parent = e.srcElement;
            console.log(parent)
            myContext.lineWidth = parent.getAttribute('data-size');
        })
    }
    myCanvas.addEventListener('mousedown', (e)=>{
        painting = true;
        drow(e);
    });

     myCanvas.addEventListener('mouseup', ()=>{
        painting = false;
        myContext.beginPath();
    });
     myCanvas.addEventListener('mousemove', drow);
});
