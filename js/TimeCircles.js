/**
 * Basic structure: TC_Class is the public class that is returned upon being called
 *
 * So, if you do
 *      var tc = $(".timer").TimeCircles();
 *
 * tc will contain an instance of the public TimeCircles class. It is important to
 * note that TimeCircles is not chained in the conventional way, check the
 * documentation for more info on how TimeCircles can be chained.
 *
 * After being called/created, the public TimerCircles class will then- for each element
 * within it's collection, either fetch or create an instance of the private class.
 * Each function called upon the public class will be forwarded to each instance
 * of the private classes within the relevant element collection
 **/
!function(t){function i(t){var i=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(i,function(t,i,e,a){return i+i+e+e+a+a});var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}function a(){return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}function s(t){var i=t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/);if(null!==i&&i.length>0){var e=t.split(" "),a=e[0].split("-"),s=e[1].split(":");return new Date(a[0],a[1]-1,a[2],s[0],s[1],s[2])}var n=Date.parse(t);return isNaN(n)?(n=Date.parse(t.replace(/-/g,"/").replace("T"," ")),isNaN(n)?new Date:n):n}function n(t,i,e,a,s){var n={},o={},r={},d={},h={},f={},c=null;for(var l in a){var m,p=a[l];m=null===c?e/u[p]:u[c]/u[p];var _=t/u[p],w=i/u[p];s&&(_=Math.floor(_)),s&&(w=Math.floor(w)),"Days"!==p&&(_%=m,w%=m),n[p]=_,r[p]=Math.abs(_),o[p]=w,f[p]=Math.abs(w),d[p]=Math.abs(_)/m,h[p]=Math.abs(w)/m,c=p}return{raw_time:n,raw_old_time:o,time:r,old_time:f,pct:d,old_pct:h}}var o=!1,r=200,d=("#debug"===location.hash,["Days","Hours","Minutes","Seconds"]),h={Seconds:"Minutes",Minutes:"Hours",Hours:"Days",Days:"Years"},u={Seconds:1,Minutes:60,Hours:3600,Days:86400,Months:2678400,Years:31536e3},f={};window!==window.top&&"undefined"!=typeof window.top.TC_Instance_List?f=window.top.TC_Instance_List:window.top.TC_Instance_List=f,function(){for(var t=["webkit","moz"],i=0;i<t.length&&!window.top.requestAnimationFrame;++i)window.top.requestAnimationFrame=window.top[t[i]+"RequestAnimationFrame"];window.top.requestAnimationFrame||(window.top.requestAnimationFrame=function(t,i,e){"undefined"==typeof e&&(e={data:{last_frame:0}});var a=(new Date).getTime(),s=Math.max(0,16-(a-e.data.last_frame)),n=window.top.setTimeout(function(){t(a+s)},s);return e.data.last_frame=a+s,n},window.top.cancelAnimationFrame=function(t){clearTimeout(t)})}();var c=function(t,i){this.element=t,this.container,this.listeners=null,this.data={paused:!1,last_frame:0,animation_frame:null,timer:!1,total_duration:null,prev_time:null,drawn_units:[],text_elements:{Days:null,Hours:null,Minutes:null,Seconds:null},attributes:{canvas:null,context:null,item_size:null,line_width:null,radius:null,outer_radius:null},state:{fading:{Days:!1,Hours:!1,Minutes:!1,Seconds:!1}}},this.config=null,this.setOptions(i),this.initialize()};c.prototype.initialize=function(i){this.data.drawn_units=[];for(var e in this.config.time)this.config.time[e].show&&this.data.drawn_units.push(e);t(this.element).children("div.time_circles").remove(),"undefined"==typeof i&&(i=!0),(i||null===this.listeners)&&(this.listeners={all:[],visible:[]}),this.container=t("<div>"),this.container.addClass("time_circles"),this.container.appendTo(this.element),this.data.attributes.canvas=t("<canvas>");try{this.data.attributes.context=this.data.attributes.canvas[0].getContext("2d")}catch(a){o=!0}var s=this.element.offsetHeight,n=this.element.offsetWidth;0===s&&(s=t(this.element).height()),0===n&&(n=t(this.element).width()),0===s&&n>0?s=n/this.data.drawn_units.length:0===n&&s>0&&(n=s*this.data.drawn_units.length),this.data.attributes.canvas[0].height=s,this.data.attributes.canvas[0].width=n,this.data.attributes.canvas.appendTo(this.container),this.data.attributes.item_size=Math.min(this.data.attributes.canvas[0].width/this.data.drawn_units.length,this.data.attributes.canvas[0].height),this.data.attributes.line_width=this.data.attributes.item_size*this.config.fg_width,this.data.attributes.radius=(.8*this.data.attributes.item_size-this.data.attributes.line_width)/2,this.data.attributes.outer_radius=this.data.attributes.radius+.5*Math.max(this.data.attributes.line_width,this.data.attributes.line_width*this.config.bg_width);var r=0;for(var d in this.data.text_elements)if(this.config.time[d].show){var h=t("<div>");h.addClass("textDiv_"+d),h.css("top",Math.round(.35*this.data.attributes.item_size)),h.css("left",Math.round(r++*this.data.attributes.item_size)),h.css("width",this.data.attributes.item_size),h.appendTo(this.container);var u=t("<h4>");u.text(this.config.time[d].text),u.css("font-size",Math.round(.07*this.data.attributes.item_size)),u.css("line-height",Math.round(.07*this.data.attributes.item_size)+"px"),u.appendTo(h);var f=t("<span>");f.css("font-size",Math.round(.21*this.data.attributes.item_size)),f.css("line-height",Math.round(.07*this.data.attributes.item_size)+"px"),f.appendTo(h),this.data.text_elements[d]=f}this.config.start&&this.data.paused===!1&&this.start()},c.prototype.update=function(){var t,i,e=this.data.prev_time,a=new Date;if(this.data.prev_time=a,null===e&&(e=a),!this.config.count_past_zero&&a>this.data.attributes.ref_date){for(var s in this.data.drawn_units){var o=this.data.drawn_units[s];this.data.text_elements[o].text("0");var h=s*this.data.attributes.item_size+this.data.attributes.item_size/2,f=this.data.attributes.item_size/2,c=this.config.time[o].color;this.drawArc(h,f,c,0)}return void this.stop()}t=(this.data.attributes.ref_date-a)/1e3,i=(this.data.attributes.ref_date-e)/1e3;var l="smooth"!==this.config.animation,m=n(t,i,this.data.total_duration,this.data.drawn_units,l),p=n(t,i,u.Years,d,l),s=0,_=0,w=null,b=this.data.drawn_units.slice();for(var s in d){var o=d[s];if(Math.floor(p.raw_time[o])!==Math.floor(p.raw_old_time[o])&&this.notifyListeners(o,Math.floor(p.time[o]),Math.floor(t),"all"),!(b.indexOf(o)<0)){Math.floor(m.raw_time[o])!==Math.floor(m.raw_old_time[o])&&this.notifyListeners(o,Math.floor(m.time[o]),Math.floor(t),"visible"),this.data.text_elements[o].text(Math.floor(Math.abs(m.time[o])));var h=_*this.data.attributes.item_size+this.data.attributes.item_size/2,f=this.data.attributes.item_size/2,c=this.config.time[o].color;"smooth"===this.config.animation?(null!==w&&(Math.floor(m.time[w])>Math.floor(m.old_time[w])?(this.radialFade(h,f,c,1,o),this.data.state.fading[o]=!0):Math.floor(m.time[w])<Math.floor(m.old_time[w])&&(this.radialFade(h,f,c,0,o),this.data.state.fading[o]=!0)),this.data.state.fading[o]||this.drawArc(h,f,c,m.pct[o])):this.animateArc(h,f,c,m.pct[o],m.old_pct[o],(new Date).getTime()+r),w=o,_++}}var g=this,v=function(){g.update.call(g)};if("smooth"===this.config.animation)this.data.animation_frame=window.top.requestAnimationFrame(v,g.element,g);else{var y=t%1*1e3;0>y&&(y=1e3+y),y+=50,g.data.animation_frame=window.top.setTimeout(function(){g.data.animation_frame=window.top.requestAnimationFrame(v,g.element,g)},y)}},c.prototype.animateArc=function(t,i,e,a,s,n){if(!o){var d=s-a;if(Math.abs(d)>.5)0===a?this.radialFade(t,i,e,1):this.radialFade(t,i,e,0);else{var h=(r-(n-(new Date).getTime()))/r;h>1&&(h=1);var u=s*(1-h)+a*h;if(this.drawArc(t,i,e,u),h>=1)return;var f=this;window.top.requestAnimationFrame(function(){f.animateArc(t,i,e,a,s,n)},this.element,null)}}},c.prototype.drawArc=function(t,i,e,a){if(!o){var s=Math.max(this.data.attributes.outer_radius,this.data.attributes.item_size/2);this.data.attributes.context.clearRect(t-s,i-s,2*s,2*s),this.config.use_background&&(this.data.attributes.context.beginPath(),this.data.attributes.context.arc(t,i,this.data.attributes.radius,0,2*Math.PI,!1),this.data.attributes.context.lineWidth=this.data.attributes.line_width*this.config.bg_width,this.data.attributes.context.strokeStyle=this.config.circle_bg_color,this.data.attributes.context.stroke());var n,r,d,h=-.5*Math.PI,u=2*Math.PI;n=h+this.config.start_angle/360*u;var f=2*a*Math.PI;"Both"===this.config.direction?(d=!1,n-=f/2,r=n+f):"Clockwise"===this.config.direction?(d=!1,r=n+f):(d=!0,r=n-f),this.data.attributes.context.beginPath(),this.data.attributes.context.arc(t,i,this.data.attributes.radius,n,r,d),this.data.attributes.context.lineWidth=this.data.attributes.line_width,this.data.attributes.context.strokeStyle=e,this.data.attributes.context.stroke()}},c.prototype.radialFade=function(t,e,a,s,n){var o,r=i(a),d=this,h=.2*(1===s?-1:1);for(o=0;1>=s&&s>=0;o++)!function(){var i=50*o,a="rgba("+r.r+", "+r.g+", "+r.b+", "+Math.round(10*s)/10+")";window.top.setTimeout(function(){d.drawArc(t,e,a,1)},i)}(),s+=h;void 0!==typeof n&&window.top.setTimeout(function(){d.data.state.fading[n]=!1},50*o)},c.prototype.timeLeft=function(){var t=new Date;return(this.data.attributes.ref_date-t)/1e3},c.prototype.start=function(){window.top.cancelAnimationFrame(this.data.animation_frame),window.top.clearTimeout(this.data.animation_frame);var i=t(this.element).data("date");if("undefined"==typeof i&&(i=t(this.element).attr("data-date")),"string"==typeof i)this.data.attributes.ref_date=s(i);else if("number"==typeof this.data.timer)this.data.paused&&(this.data.attributes.ref_date=(new Date).getTime()+1e3*this.data.timer);else{var e=t(this.element).data("timer");"undefined"==typeof e&&(e=t(this.element).attr("data-timer")),"string"==typeof e&&(e=parseFloat(e)),"number"==typeof e?(this.data.timer=e,this.data.attributes.ref_date=(new Date).getTime()+1e3*e):this.data.attributes.ref_date=this.config.ref_date}this.data.paused=!1,this.update()},c.prototype.restart=function(){this.data.timer=!1,this.start()},c.prototype.stop=function(){"number"==typeof this.data.timer&&(this.data.timer=this.timeLeft(this)),this.data.paused=!0,window.top.cancelAnimationFrame(this.data.animation_frame)},c.prototype.destroy=function(){this.stop(),this.container.remove(),t(this.element).removeAttr("data-tc-id"),t(this.element).removeData("tc-id")},c.prototype.setOptions=function(i){if(null===this.config&&(this.default_options.ref_date=new Date,this.config=t.extend(!0,{},this.default_options)),t.extend(!0,this.config,i),this.data.total_duration=this.config.total_duration,"string"==typeof this.data.total_duration)if("undefined"!=typeof u[this.data.total_duration])this.data.total_duration=u[this.data.total_duration];else if("Auto"===this.data.total_duration){for(var e in this.config.time)if(this.config.time[e].show){this.data.total_duration=u[h[e]];break}}else this.data.total_duration=u.Years,console.error("Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto")},c.prototype.addListener=function(t,i,e){"function"==typeof t&&("undefined"==typeof e&&(e="visible"),this.listeners[e].push({func:t,scope:i}))},c.prototype.notifyListeners=function(t,i,e,a){for(var s=0;s<this.listeners[a].length;s++){var n=this.listeners[a][s];n.func.apply(n.scope,[t,i,e])}},c.prototype.default_options={ref_date:new Date,start:!0,animation:"smooth",count_past_zero:!0,circle_bg_color:"#60686F",use_background:!0,fg_width:.1,bg_width:1.2,total_duration:"Auto",direction:"Clockwise",start_angle:0,time:{Days:{show:!0,text:"Days",color:"#FC6"},Hours:{show:!0,text:"Hours",color:"#9CF"},Minutes:{show:!0,text:"Minutes",color:"#BFB"},Seconds:{show:!0,text:"Seconds",color:"#F99"}}};var l=function(t,i){this.elements=t,this.options=i,this.foreach()};l.prototype.getInstance=function(i){var e,s=t(i).data("tc-id");if("undefined"==typeof s&&(s=a(),t(i).attr("data-tc-id",s)),"undefined"==typeof f[s]){var n=this.options,o=t(i).data("options");"string"==typeof o&&(o=JSON.parse(o)),"object"==typeof o&&(n=t.extend(!0,{},this.options,o)),e=new c(i,n),f[s]=e}else e=f[s],"undefined"!=typeof this.options&&e.setOptions(this.options);return e},l.prototype.foreach=function(t){var i=this;return this.elements.each(function(){var e=i.getInstance(this);"function"==typeof t&&t(e)}),this},l.prototype.start=function(){return this.foreach(function(t){t.start()}),this},l.prototype.stop=function(){return this.foreach(function(t){t.stop()}),this},l.prototype.restart=function(){return this.foreach(function(t){t.restart()}),this},l.prototype.rebuild=function(){return this.foreach(function(t){t.initialize(!1)}),this},l.prototype.getTime=function(){return this.getInstance(this.elements[0]).timeLeft()},l.prototype.addListener=function(t,i){"undefined"==typeof i&&(i="visible");var e=this;return this.foreach(function(a){a.addListener(t,e.elements,i)}),this},l.prototype.destroy=function(){return this.foreach(function(t){t.destroy()}),this},l.prototype.end=function(){return this.elements},t.fn.TimeCircles=function(t){return new l(this,t)}}(jQuery);