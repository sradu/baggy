_satellite.pushAsyncScript(function(event, target, $variables){
  var pixelID = '10056386';
if (_satellite.getVar('country') === "CA") {
  pixelID = '10065418';
}
(function(w,d,t,r,u){
  w[u]=w[u]||[];
  w[u].push(
    {'projectId':'10000','properties':{'pixelId': pixelID}}
  );
  var s=d.createElement(t);
  s.src=r;
  s.async=true;
  s.onload=s.onreadystatechange=function(){
    var y,rs=this.readyState,c=w[u];
    if(rs&&rs!="complete"&&rs!="loaded"){return}
    try{
      y=YAHOO.ywa.I13N.fireBeacon;
      w[u]=[];w[u].push=function(p)
      {y([p])};
      y(c)
    }catch(e){}
  };
  var scr=d.getElementsByTagName(t)[0],par=scr.parentNode;
  par.insertBefore(s,scr)
})(window,document,"script","https://s.yimg.com/wi/ytc.js","dotq");
});
