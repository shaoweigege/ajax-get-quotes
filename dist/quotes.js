!function(){"use strict";const t=$(".quote"),e=$(".quote-author"),o=$(".get-quote-button");$(".image-container");let n,u;function r(t){const e={"&":"&amp;","'":"&#39;",'"':"&quot;","<":"&lt;",">":"&gt;","\\":"&#x5c;","`":"&#x60;",":":"&#58;"};return t.replace(/[&"'<>\\`:]/g,(function(t){return e[t]}))}function a(){$.ajax({type:"GET",url:"https://quote-garden.herokuapp.com/api/v2/quotes/random",success:function(t){n=r(t.quote.quoteText),u=r(t.quote.quoteAuthor)},error:function(t){console.log(t)}}).done(()=>{l(n,u),localStorage.setItem("quoteStored",n),localStorage.setItem("quoteAuthorStored",u)})}function l(o="",n=""){t.html(o),e.html(n)}setInterval((function(){$("body").hasClass("red")?$("body").removeClass("red").addClass("green"):$("body").removeClass("green").addClass("red")}),1e4),function(){const t=localStorage.getItem("quoteStored"),e=localStorage.getItem("quoteAuthorStored");"undefined"!==t&&"undefined"!==e&&(null!==t&&null!==e)?l(t,e):a()}(),o.on("click",a)}();