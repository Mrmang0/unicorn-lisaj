 document.getElementsByTagName('input')[5].value = "#FFFFFF"


 class Main {
     constructor(width = 1000, height = 600) {
         this.canvas = document.getElementById('canvas_lisaj');
         this.context = this.canvas.getContext('2d');
         this.canvas.height = height;
         this.canvas.width = width;
     }

     freenum = 1;
     context;
     setStyles() {
         this.context.strokeStyle = 'white';
         this.context.translate(500, 250);
         this.context.fillStyle = "rgba(0,0,0,0.01)"
         this.context.scale = 3;

         this.context.moveTo(0, 0);
         this.context.lineTo(1, 1);
         this.context.stroke();


     }

     line() {
         const context = this.context;
         context.beginPath();
         context.moveTo(10, 10);
         context.lineTo(100, 100);
         context.stroke();


     }

     lisaj(ampA, ampB, freqA, freqB, t) {
         const rnum = 2;
         const shift = (rnum - 1 / rnum) * Math.PI / 2;
         const x = ampA * Math.sin(freqA * t + shift);
         const y = ampB * Math.sin(freqB * t);
         // console.log(x,y)
         return {
             x,
             y
         }
     }

     drawLisaj() {
         const values = getSlidersValue();
         const freenum = this.freenum;
         const context = this.context;
         const c = this.lisaj(2 * values[0], 2 * values[1], Math.floor(values[2] / 10), Math.floor(values[3] / 10), freenum);

         if (document.getElementsByTagName('input')[6].checked) {
             context.strokeStyle = `rgba(${rnd(0,255)},${rnd(0,255)},${rnd(0,255)},1)`;
         } else {
             context.strokeStyle = document.getElementsByTagName('input')[5].value
         }
         context.lineTo(c.x, c.y);
         context.stroke();


         this.freenum -= 1;
     }

     clear() {
         this.context.beginPath()
         this.context.fillStyle = "rgba(0,0,0,0.1)"
         this.context.fillRect(-510, -400, 1010, 610);
     }

     paint() {
         draw.clear();
         for (let index = 0; index < 8; index++) {
             draw.drawLisaj();
         }
     }

 }

 const draw = new Main();
 draw.setStyles();
 // draw.line();

 let freenum = 1;

 function m() {
     var lim = Date.now() + Number(document.getElementById('sp').value);
     if (document.getElementById('tm').checked)
         while (true) {
             if (lim < Date.now())
                 break;
         }
     draw.paint();
     requestAnimationFrame(m);

 }

 requestAnimationFrame(m);

 function rnd(min, max) {
     return Math.random() * (max - min) + min;
 }


 function getSlidersValue() {
     const elements = document.getElementsByTagName('input');
     const values = []
     for (let i = 0; i < elements.length; i++) {
         values.push(elements[i].value);
     }
     return values;
 };



 function setVal(input) {
     var val = ($(input).val() - $(input).attr('min')) / ($(input).attr('max') - $(input).attr('min'));
     var percent = val * 100;
     $(input).css('background-image',
         '-webkit-gradient(linear, left top, right top, ' +
         'color-stop(' + percent / 7 + '%, red), ' +
         'color-stop(' + percent / 6 + '%, orange), ' +
         'color-stop(' + percent / 5 + '%, yellow), ' +
         'color-stop(' + percent / 4 + '%, green), ' +
         'color-stop(' + percent / 3 + '%, aquamarine), ' +
         'color-stop(' + percent / 2 + '%, blue), ' +
         'color-stop(' + percent + '%, violet), ' +
         'color-stop(' + percent + '%, slateblue)' +
         ')');

 }


 function checkHiding(chb,block,inverted =false) {
     if(!inverted)
    $('#'+block).hide();
    $('#'+chb).change(e => {
        if(inverted)
        !e.target.checked ? $('#'+block).show() : $('#'+block).hide();
        else
        e.target.checked ? $('#'+block).show() : $('#'+block).hide();
    })
 }


 $(document).ready(() => {

    checkHiding("tm","speed");
    checkHiding("cb","color",true)

     $("input[type=range]").mousemove(function (e) {
         setVal(this)
     });

     var inp = $("input[type=range]");

     for (let i = 0; i < inp.length; i++) {
         setVal(inp);
     }
 })