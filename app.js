// hamburger menu
const hamburger = document.querySelector('.hamburger');
const linesParent = document.querySelector('.lines');
const closebtn = document.querySelector('.close');
const headerNav = document.querySelector('.header .navigation');

let toggled = false;
hamburger.addEventListener('click', () => {
  if (!toggled) {
    linesParent.style.visibility = 'hidden';
    closebtn.style.visibility = 'unset';
    headerNav.style.visibility = 'visible';
    toggled = true;
  } else {
    headerNav.style.visibility = 'hidden';
    linesParent.style.visibility = 'unset';
    closebtn.style.visibility = 'hidden';
    toggled = false;
  }
});

// logos infinite scrool
const logoImages = document.querySelector('.client-tags');
const images = document.querySelectorAll('.client-tags img');
const sliders = document.querySelectorAll('.sliders .slider');

let imageIndex = 0;
sliders[0].style.background = '#ffc451';

function slideImages() {
  logoImages.style.transition = 'transform 0.5s ease-in-out';
  logoImages.style.transform = `translateX(-12.5%)`;
  imageIndex = (imageIndex + 1) % 8;

  sliders.forEach(
    (slider, i) => (slider.style.background = i === imageIndex ? '#ffc451' : '')
  );

  setTimeout(() => {
    logoImages.style.transition = 'none';
    logoImages.style.transform = `translateX(0%)`;
    logoImages.appendChild(logoImages.firstElementChild);
  }, 1000);
}

function handleSliderClick(index) {
  const positionsToSlide = (index - imageIndex + 8) % 8;
  imageIndex = index;

  sliders.forEach(
    (slider, i) => (slider.style.background = i === imageIndex ? '#ffc451' : '')
  );

  for (let i = 0; i < positionsToSlide; i++) {
    logoImages.appendChild(logoImages.firstElementChild);
  }
}

sliders.forEach((slider, index) => {
  slider.addEventListener('click', () => handleSliderClick(index));
});

setInterval(slideImages, 2000);

// portfolio
const filterItems = document.querySelectorAll('.filter-items .filter-item');
const portfolioItems = document.querySelectorAll(
  '.portfolio-items .portfolio-item'
);

filterItems.forEach((filter) => {
  filter.addEventListener('click', () => {
    filterItems.forEach((otherItem) => (otherItem.style.background = 'unset'));
    filter.style.background = '#ffc451';

    portfolioItems.forEach((folio) => {
      const matchFilter =
        filter.id === 'all' || folio.className.includes(filter.id);

      if (matchFilter) {
        folio.classList.add('portfolio-item');
        folio.style.opacity = '1';
        folio.style.height = 'auto';
        folio.style.width = 'unset';
        folio.style.visibility = 'visible';
      } else {
        folio.classList.remove('portfolio-item');
        folio.style.visibility = 'hidden';
        folio.style.height = '0';
        folio.style.width = '0';
        folio.style.opacity = '0';
      }
    });
  });
});

// testimonials
const testimonials = document.querySelectorAll(
  '.testimonial-sliders .testimonial-slider'
);
const testimonialNav = document.querySelectorAll(
  '.testimonial-navbar .navigation'
);
let testimonialIndex = 0;
let autoScrollInterval;
testimonialNav[0].style.background = '#ffc451';

function testimonialScroll() {
  testimonialIndex = (testimonialIndex + 1) % 5;
  [0, 4];
  const transformValue = testimonialIndex * -100 + '%';
  testimonials.forEach((testimonial) => {
    testimonial.style.transition = 'transform .7s ease-in-out';
    if (testimonialIndex === 0) {
      testimonial.style.opacity = '0';
      setTimeout(() => {
        testimonial.style.transition = 'opacity .3s ease-in-out';
        testimonial.style.opacity = '1';
      }, 200);
    }
    testimonial.style.transform = 'translateX(' + transformValue + ')';
  });
  updateNavBackground();
}

function setAutoScrollInterval() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(testimonialScroll, 4000);
}

function updateNavBackground() {
  testimonialNav.forEach((nav) => {
    nav.style.backgroundColor = '';
  });

  testimonialNav[testimonialIndex].style.backgroundColor = '#ffc451';
}

// Add click event listeners to each navigation link
testimonialNav.forEach((nav, index) => {
  nav.addEventListener('click', () => {
    testimonialIndex = index;
    const transformValue = testimonialIndex * -100 + '%';

    testimonials.forEach((testimonial) => {
      testimonial.style.transition = 'transform .7s ease-in-out';
      testimonial.style.transform = 'translateX(' + transformValue + ')';
    });

    // setAutoScrollInterval();

    updateNavBackground();
  });
});

setAutoScrollInterval();

// number increase counter
const countBoxes = document.querySelectorAll('.count-box');
const options = { threshold: 0.5 };

const observer = new IntersectionObserver(
  (entries, observer) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    }),
  options
);

countBoxes.forEach((countBox) => observer.observe(countBox));

function startCounter(count) {
  let startNum = 0,
    endNum = parseInt(count.children[1].innerHTML, 10);
  count.children[1].innerHTML = startNum;

  let counter = setInterval(() => {
    if (startNum === endNum) clearInterval(counter);
    count.children[1].innerHTML = startNum++;
  }, 50);
}
