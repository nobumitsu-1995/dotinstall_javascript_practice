'use strict';
{
  class Panel{
    constructor(){
      const section = document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop','inactive');
      this.stop.addEventListener('click' , ()=>{
        if(this.stop.classList.contains('inactive')){
          return;
        }
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);

        panelsLeft--;
        if(panelsLeft === 0){
          spin.classList.remove('inactive');
          panelsLeft = 3;
          checkResult();
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    getRandomImage(){
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
      ];
      return images[Math.floor(Math.random()*images.length)];
    }

    spin(){
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(()=>{
        this.spin();
      },50)
    }

    isUnmached(p1,p2){
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmach(){
      this.img.classList.add('unmached');
    }

    panelActivate(){
      this.img.classList.remove('unmached');
      this.stop.classList.remove('inactive');
    }
  }

  function checkResult(){
    if (panels[0].isUnmached(panels[1],panels[2])){
      panels[0].unmach();
    }
    if (panels[1].isUnmached(panels[0],panels[2])){
      panels[1].unmach();
    }
    if (panels[2].isUnmached(panels[1],panels[0])){
      panels[2].unmach();
    }
  }

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  let panelsLeft = 3;

  const spin = document.getElementById('spin');
  spin.addEventListener('click', ()=>{
    if(spin.classList.contains('inactive')){
      return;
    }
    spin.classList.add('inactive');
    panels.forEach(panel => {
      panel.panelActivate();
      panel.spin();
    });
  });


}
