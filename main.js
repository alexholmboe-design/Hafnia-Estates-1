
document.addEventListener('DOMContentLoaded',function(){
  var params=new URLSearchParams(window.location.search);

  var bg=document.querySelector('.burger'), nl=document.querySelector('.navlinks');
  if(bg&&nl){
    bg.addEventListener('click',function(){var o=nl.classList.toggle('open');bg.classList.toggle('x',o);bg.setAttribute('aria-expanded',o?'true':'false')});
    nl.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nl.classList.remove('open');bg.classList.remove('x')})});
  }

  document.querySelectorAll('.fq').forEach(function(f){
    var q=f.querySelector('button'); if(!q)return;
    q.addEventListener('click',function(){
      var open=f.getAttribute('data-o')==='1';
      f.parentNode.querySelectorAll('.fq').forEach(function(x){x.setAttribute('data-o','0')});
      f.setAttribute('data-o',open?'0':'1');
    });
  });

  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){io.observe(e)});
  } else { els.forEach(function(e){e.classList.add('in')}); }

  var sel=document.getElementById('role');
  if(sel){
    var ty=params.get('type'), map={tenant:0,company:1,owner:2};
    if(ty && map[ty]!==undefined) sel.selectedIndex=map[ty];
  }

  var da=(HH_LANG==='da');

  var form=document.getElementById('cform');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(form);
      var subj=(da?'Henvendelse - ':'Enquiry - ')+(d.get('role')||'');
      var body=(da?'Navn: ':'Name: ')+(d.get('name')||'')
        +'\n'+(da?'E-mail: ':'Email: ')+(d.get('email')||'')
        +'\n'+(da?'Telefon: ':'Phone: ')+(d.get('phone')||'')
        +'\n'+(da?'Type: ':'Enquiry type: ')+(d.get('role')||'')
        +'\n'+(da?'Tidsramme: ':'Timing: ')+(d.get('timing')||'')
        +'\n\n'+(da?'Besked:\n':'Message:\n')+(d.get('message')||'');
      window.location.href='mailto:hello@hafniahomes.dk?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
    });
  }

  document.querySelectorAll('#yr').forEach(function(y){y.textContent=new Date().getFullYear()});

  /* ---------- rent calculator ---------- */
  var AREAS=[[1000,1499,"Indre By",245],[1500,1799,"Vesterbro",228],[1800,1999,"Frederiksberg C",235],[2000,2000,"Frederiksberg",230],[2100,2100,"Østerbro",228],[2150,2150,"Nordhavn",250],[2200,2200,"Nørrebro",208],[2300,2300,"Amager / Islands Brygge",218],[2400,2400,"København NV",188],[2450,2450,"København SV",200],[2500,2500,"Valby",188],[2600,2600,"Glostrup",165],[2610,2610,"Rødovre",168],[2620,2620,"Albertslund",155],[2630,2630,"Taastrup",155],[2650,2650,"Hvidovre",168],[2660,2660,"Brøndby Strand",152],[2700,2700,"Brønshøj",172],[2720,2720,"Vanløse",182],[2730,2730,"Herlev",168],[2740,2740,"Skovlunde",160],[2750,2750,"Ballerup",158],[2760,2760,"Måløv",155],[2770,2770,"Kastrup",185],[2791,2791,"Dragør",180],[2800,2800,"Kongens Lyngby",185],[2820,2820,"Gentofte",215],[2830,2830,"Virum",180],[2840,2840,"Holte",185],[2850,2850,"Nærum",175],[2860,2860,"Søborg",175],[2870,2870,"Dyssegård",190],[2880,2880,"Bagsværd",172],[2900,2900,"Hellerup",232],[2920,2920,"Charlottenlund",220],[2930,2930,"Klampenborg",218],[2942,2942,"Skodsborg",205],[2950,2950,"Vedbæk",195],[2960,2960,"Rungsted Kyst",195],[2970,2970,"Hørsholm",185],[2980,2980,"Kokkedal",165],[2990,2990,"Nivå",160]];
  var calc=document.getElementById('calc');
  if(!calc) return;

  /* stop the mouse wheel / trackpad from changing a focused number field */
  document.querySelectorAll('input[type=number]').forEach(function(inp){
    inp.addEventListener('wheel', function(e){
      if(document.activeElement===inp){ inp.blur(); }
    }, {passive:true});
  });
  var state={cond:'standard',furn:'furnished'};
  var T = da
    ? {pc:'Skriv et københavnsk postnummer, for eksempel 2100, eller en fuld adresse.',
       out:'Det postnummer ligger uden for vores område. Vi arbejder i København og omegn.',
       m2:'Skriv boligens størrelse i kvadratmeter, mellem 15 og 400.',
       furnished:'møbleret',unfurnished:'umøbleret',
       basic:'oprindelig stand',standard:'god stand',premium:'renoveret',
       year:' / år',perm:' / m²'}
    : {pc:'Enter a Copenhagen postcode, for example 2100, or a full address.',
       out:'That postcode is outside the area we cover. We work in Copenhagen and the surrounding municipalities.',
       m2:'Enter the size in square metres, between 15 and 400.',
       furnished:'furnished',unfurnished:'unfurnished',
       basic:'original condition',standard:'good condition',premium:'renovated',
       year:' / year',perm:' / m²'};
  function area(pc){for(var i=0;i<AREAS.length;i++){if(pc>=AREAS[i][0]&&pc<=AREAS[i][1])return{name:AREAS[i][2],rate:AREAS[i][3]}}return null}
  function sizeF(m){if(m<40)return 1.20;if(m<60)return 1.08;if(m<85)return 1.00;if(m<110)return 0.94;return 0.88}
  function fmt(n){return new Intl.NumberFormat('da-DK').format(Math.round(n/50)*50)}

  var HINTS = da ? {
    cond:{basic:'Oprindeligt køkken og bad. Fungerer fint, men er ikke sat i stand i nyere tid.',
          standard:'Vedligeholdt og indflytningsklar. Køkken og bad virker og ser pæne ud, uden at være nye.',
          premium:'Nyere køkken og bad, eller en gennemgribende istandsættelse inden for de seneste år.'},
    furn:{unfurnished:'Uden møbler. Lejeren tager sit eget indbo med.',
          furnished:'Møbler, hvidevarer og det nødvendige køkkenudstyr følger med boligen.'}
  } : {
    cond:{basic:'Original kitchen and bathroom. Perfectly usable, but not updated in recent years.',
          standard:'Maintained and ready to move into. Kitchen and bathroom work and look tidy, without being new.',
          premium:'Newer kitchen and bathroom, or a full refurbishment within the last few years.'},
    furn:{unfurnished:'No furniture. The tenant brings their own belongings.',
          furnished:'Furniture, appliances and the kitchen basics are included with the home.'}
  };
  function setHint(key,val){
    var el=document.querySelector('[data-hint="'+key+'"]');
    if(el && HINTS[key] && HINTS[key][val]) el.textContent=HINTS[key][val];
  }
  setHint('cond', state.cond); setHint('furn', state.furn);

  calc.querySelectorAll('.seg').forEach(function(seg){
    seg.querySelectorAll('button').forEach(function(btn){
      btn.addEventListener('click',function(){
        seg.querySelectorAll('button').forEach(function(b){b.classList.remove('sel')});
        btn.classList.add('sel');
        var key=seg.getAttribute('data-key'), val=btn.getAttribute('data-val');
        state[key]=val;
        setHint(key,val);
      });
    });
  });

  document.getElementById('calc-go').addEventListener('click',function(){
    var loc=document.getElementById('c-loc').value.trim();
    var m2=parseFloat(document.getElementById('c-m2').value);
    var err=document.getElementById('calc-err'), res=document.getElementById('calc-res');
    function fail(m){err.textContent=m;err.classList.add('on');res.classList.remove('on')}
    var pcm=loc.match(/\b(\d{4})\b/);
    if(!pcm){ fail(T.pc); return; }
    var a=area(parseInt(pcm[1],10));
    if(!a){ fail(T.out); return; }
    if(!m2||m2<15||m2>400){ fail(T.m2); return; }
    err.classList.remove('on');
    var condF=state.cond==='basic'?0.90:state.cond==='premium'?1.12:1.0;
    var furnF=state.furn==='furnished'?1.18:1.0;
    var perM2=a.rate*sizeF(m2)*condF*furnF, mid=perM2*m2, lo=mid*0.92, hi=mid*1.08;
    document.getElementById('r-range').textContent='DKK '+fmt(lo)+' – '+fmt(hi);
    document.getElementById('r-area').textContent=a.name;
    document.getElementById('r-perm2').textContent='DKK '+Math.round(perM2)+T.perm;
    document.getElementById('r-year').textContent='DKK '+fmt(mid*12)+T.year;
    document.getElementById('r-sum').textContent=m2+' m² · '+T[state.furn]+' · '+T[state.cond];
    res.classList.add('on');
    var b=(da?'Hej Hafnia Homes,\n\nJeg vil gerne have en konkret vurdering af min bolig.\n\nAdresse: ':'Hello Hafnia Homes,\n\nI would like a proper valuation of my property.\n\nLocation: ')+loc
      +(da?'\nOmråde: ':'\nArea: ')+a.name
      +(da?'\nStørrelse: ':'\nSize: ')+m2+' m2'
      +(da?'\nStand: ':'\nCondition: ')+T[state.cond]
      +(da?'\nMøblering: ':'\nFurnishing: ')+T[state.furn]
      +(da?'\nEstimat fra beregneren: DKK ':'\nOnline estimate: DKK ')+fmt(lo)+' - '+fmt(hi)
      +(da?' pr. måned\n\nNavn: \nTelefon: \nLedig fra: \n':' per month\n\nName: \nPhone: \nAvailable from: \n');
    document.getElementById('r-mail').setAttribute('href','mailto:hello@hafniahomes.dk?subject='
      +encodeURIComponent((da?'Vurdering af bolig - ':'Property valuation - ')+a.name)+'&body='+encodeURIComponent(b));
    res.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
});
