function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }

  locomotive();

  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    return `./male${String(index).padStart(4, '0')}.png`;
  }

  const frameCount = 300;
  const images = [];
  const imageSeq = { frame: 1 };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i + 1);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.15,
      trigger: "#page>canvas",
      start: "top top",
      end: "600% top",
      scroller: "#main",
    },
    onUpdate: render,
  });

  images[0].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  ScrollTrigger.create({
    trigger: "#page>canvas",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "600% top",
  });

  gsap.to("#page1",{
    scrollTrigger:`#page1`,
    start:`top top`,
    end:`bottom top`,
    markers:true,
    pin:true,
    scroller:'#main',
  })
  gsap.to("#page2",{
    scrollTrigger:`#page2`,
    start:`top top`,
    end:`bottom top`,
    markers:true,
    pin:true,
    scroller:'#main',
  })
  gsap.to("#page3",{
    scrollTrigger:`#page3`,
    start:`top top`,
    end:`bottom top`,
    markers:true,
    pin:true,
    scroller:'#main',
  })
gsap.to("#loop",{
    transform:"translateX(-350%)",
    repeat:-1,
    markers:true,
    duration:10,
    ease:"linear",
    scrollTrigger:`#loop`,
    start:"top top",
    end:"bottom top",
    scroller:'#main',
   
})