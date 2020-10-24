(function() {

    setUpPage();
  
    function setUpPage() {
      addNavEventListeners();
      addArticleEventListeners();
      addWindowEventListeners();
      addModalEventListeners();
      addSliderEventListeners();
    }
  
    // Navigation menu can be toggled
    function addNavEventListeners() {
  
      const nav = document.querySelector('nav');
  
      const navClickHandler = function() {
        this.classList.toggle('open');
        event.stopPropagation();
      };
  
      nav.addEventListener('click', navClickHandler);
  
      const bodyClickHandler = function() {
        nav.classList.remove('open');
      };
  
      document.body.addEventListener('click', bodyClickHandler);
    }
  
    // Project details can be expanded
    function addArticleEventListeners() {
  
      const articles = document.querySelectorAll('#products article');
  
      for (let article of articles) {
        let button = article.querySelector('button');
  
        button.addEventListener('click', function() {
          article.classList.toggle('expanded');
          button.innerHTML = article.classList.contains('expanded') ?
            'Hide Details' : 'Show Details';
        });
      }
    }
  
    // Resizing the window resets open/closed product details
    // Resizing the window resets nav visibility
    function addWindowEventListeners() {
  
      const windowResizeHandler = function() {
  
        const nav = document.querySelector('nav');
        nav.classList.remove('open');
  
        const articles = document.querySelectorAll('#products article');
        
        for (let article of articles) {
          article.classList.remove('expanded');
        }
      };
  
      window.addEventListener('resize', windowResizeHandler); 
    }
  
    // Modal can be opened
    function addModalEventListeners() {
  
      const modalTriggerElement = document.querySelector('#modal-trigger');
  
      const modalTriggerClickHandler = function() {
        document.body.classList.add('modal-open');
      };
  
      modalTriggerElement.addEventListener('click', modalTriggerClickHandler);
  
      // Modal can be closed
      const modalCloseButton = document.querySelector('#modal button');
  
      const modalCloseButtonClickHandler = function() {
        document.body.classList.remove('modal-open');
      };
  
      modalCloseButton.addEventListener('click', modalCloseButtonClickHandler);
    }
  
    // Image Carousel / Slider
    function addSliderEventListeners() {
  
      const sliderPrev = document.getElementById('slider-prev');
      const sliderNext = document.getElementById('slider-next');
      const sliderFrame = document.getElementById('slider-frame');
      const sliderCaption = document.getElementById('slider-caption');
  
      const slides =
        Array.from(sliderFrame.querySelectorAll('div[data-src]'))
          .map(div => {
            return {
              imageUrl: div.getAttribute('data-src'),
              caption: div.textContent.trim(),
            };
          });
  
      let sliderIndex = 0;
      displaySliderImage();
  
      function displaySliderImage() {
        let { imageUrl, caption } = slides[sliderIndex];
        sliderFrame.style.backgroundImage = `url('${imageUrl}')`;
        let count = `(${sliderIndex+1}/${slides.length}) `;
        sliderCaption.innerHTML = count + caption;
        sliderCaption.classList.add('flash');
        setTimeout(() => {
          sliderCaption.classList.remove('flash');
        }, 0);
      }
  
      function displayPrevSliderImage() {
        sliderIndex--;
        if (sliderIndex < 0) {
          sliderIndex = slides.length - 1;
        }
        displaySliderImage();
      }
  
      function displayNextSliderImage() {
        sliderIndex++;
        if (sliderIndex === slides.length) {
          sliderIndex = 0;
        }
        displaySliderImage();
      }
  
      sliderPrev.addEventListener('click', displayPrevSliderImage);
      sliderNext.addEventListener('click', displayNextSliderImage);
  
      setInterval(function() {
        displayNextSliderImage();
      }, 8000);
    }
  
  })();