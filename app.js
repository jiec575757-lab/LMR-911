'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const asset = (id, thumb = false) => `assets/${id}${thumb ? '-thumb' : ''}.jpg`;
const chapterNames = {cover: '封面', nanjing: '南京 · 城市漫游', henan: '河南 · 山野来信', life: '生活 · 日常私语', birthday: '生日 · 闪耀时刻', portrait: '写真 · 草莓白日梦'};
const photoInfo = [
  ['cover-01', '草莓与柔软的午后'],
  ['nanjing-01', '南京 · 夜色中的侧影'], ['nanjing-02', '南京 · 在书与光之间'],
  ['nanjing-03', '南京 · 路灯下的相伴'], ['nanjing-04', '南京 · 梧桐树下的风'],
  ['nanjing-05', '南京 · 书店里的红色回廊'], ['nanjing-06', '南京 · 一盏灯的电影感'],
  ['nanjing-07', '南京 · 走进一条绿色的路'], ['nanjing-08', '南京 · 和你一起走过'],
  ['henan-01', '河南 · 把风景放进眼睛'], ['henan-02', '河南 · 向自由张开双臂'],
  ['henan-03', '河南 · 一次勇敢的出发'], ['henan-04', '河南 · 听见瀑布的回声'],
  ['henan-05', '河南 · 站在水幕与光之间'], ['henan-06', '河南 · 山谷里的小小身影'],
  ['life-01', '生活 · 没有安排的好时光'], ['life-02', '生活 · 粉色的慢镜头'],
  ['life-03', '生活 · 枕边的一点小心情'], ['life-04', '生活 · 把开心比成双份'],
  ['birthday-01', '生日 · 今天，为自己盛装'], ['birthday-02', '生日 · 被花与温柔包围'],
  ['birthday-03', '生日 · 留住每一个表情'], ['birthday-04', '生日 · 烛光里的愿望'],
  ['birthday-05', '生日 · 闪闪发光的自己'], ['birthday-06', '生日 · 把快乐剪成一卷胶片'],
  ['portrait-01', '写真 · 窗边的一场草莓白日梦'], ['portrait-02', '写真 · 把甜蜜停在这一刻'],
  ['portrait-03', '写真 · 碎花沙发上的柔软目光'], ['portrait-04', '写真 · 粉色的午后与小心情'],
  ['portrait-05', '写真 · 草莓与发丝间的光'], ['portrait-06', '写真 · 慢下来，听窗外的风'],
  ['portrait-07', '写真 · 低头拾起一点甜'], ['portrait-08', '写真 · 不赶时间的好天气'],
  ['portrait-09', '写真 · 一口甜，一瞬间']
];
const photos = photoInfo.map(([id, caption]) => ({id, caption, group: id.split('-')[0]}));
const photoById = new Map(photos.map((photo) => [photo.id, photo]));
const chapters = [
  {num: '01', title: 'City poetry', cn: '南京 · 城市漫游', page: 2, photo: 'nanjing-04', range: '02 — 04'},
  {num: '02', title: 'Into the wild', cn: '河南 · 山野来信', page: 5, photo: 'henan-04', range: '05 — 07'},
  {num: '03', title: 'Soft hours', cn: '生活 · 日常私语', page: 8, photo: 'life-01', range: '08 — 09'},
  {num: '04', title: 'Born to bloom', cn: '生日 · 闪耀时刻', page: 10, photo: 'birthday-01', range: '10 — 12'},
  {num: '05', title: 'Strawberry reverie', cn: '写真 · 草莓白日梦', page: 13, photo: 'portrait-01', range: '13 — 18'}
];

function photograph(id, className, thumb = false) {
  const photo = photoById.get(id);
  return `<button class="photo ${className}" data-photo="${id}" aria-label="放大照片：${photo.caption}"><img src="${asset(id, thumb)}" alt="${photo.caption}" draggable="false" decoding="async"><span class="zoom-hint">${icon('zoom')}</span></button>`;
}
function meta(left, right = 'LMR / THE PERSONAL ISSUE') {return `<div class="page-meta"><span>${left}</span><span>${right}</span></div>`;}
function folio(n, chapter) {return `<div class="page-folio"><span>${chapter}</span><b>${String(n).padStart(2, '0')}</b><span>LMR</span></div>`;}
const shade = '<div class="image-vignette"></div>';
const pageDefinitions = [
  ['cover', '封面 / THE COVER', () => `
    <div class="cover-artwork">${photograph('cover-01', 'cover-photo')}<span class="cover-issue">THE PERSONAL ISSUE — NO. 001</span></div>
    <div class="cover-copy">
      <div class="cover-topline"><span>A LIFE IN PICTURES</span><span>VOL. 01 / PRIVATE EDITION</span></div>
      <div class="cover-brand"><div class="cover-title">LMR</div><p class="cover-tagline">THE ART OF BEING MYSELF</p></div>
      <div class="cover-side"><b>Little moments.<br><em>Real me.</em></b><span>日常有光 · 自在生长</span><span class="cover-small-star" aria-hidden="true">✳</span></div>
      <div class="cover-bottom"><div class="cover-kicker"><span>PORTRAITS / PLACES / LITTLE THINGS</span><span>01</span></div><h2 class="cover-heading">In my <em>own light.</em></h2><p class="cover-chinese">以自己的光，成为自己</p></div>
      <div class="cover-colophon"><span class="cover-corner">NOT FOR SALE · ONLY FOR ME</span><span class="cover-barcode" aria-hidden="true"></span></div>
    </div>`],
  ['contents-page', '目录 / CONTENTS', () => `
    ${meta('THE PERSONAL ISSUE', 'VOL. 01')}<div class="contents-intro"><div class="contents-title-block"><h2 class="contents-heading">A little<br>of <em>me.</em></h2><div class="contents-sub">关于我，也关于生活。</div></div>
    <div class="contents-stamp"><div>INDEPENDENT<span>01</span>PERSONAL ISSUE</div></div></div>
    <div class="printed-contents">${chapters.map(c => `<button class="printed-chapter" data-goto="${c.page}" aria-label="阅读${c.cn}"><span>${c.num}</span><span><strong>${c.title}</strong><small>${c.cn}</small></span><span>${String(c.page).padStart(2,'0')}</span></button>`).join('')}</div>
    <p class="contents-foot">不是每一个瞬间都需要被定义。<br>有些，只要被好好记住。</p>${folio(1, 'CONTENTS')}`],
  ['nanjing-opener', '南京 / CITY POETRY', () => `${photograph('nanjing-04','full-bleed')}${shade}${meta('CHAPTER 01', 'NANJING / 南京')}<h2 class="large-city">City<br><em>poetry.</em><span class="city-cn">梧 桐 写 给 城 市 的 诗</span></h2><div class="opener-bottom">Somewhere,<br>feeling alive.<p>风吹过，刚好是喜欢的模样。</p></div><span class="opener-number">01</span>${folio(2, 'THE CITY EDIT')}`],
  ['night-page', '南京 / AFTER HOURS', () => `${meta('NANJING / AFTER HOURS')}${photograph('nanjing-01','night-main')}${photograph('nanjing-03','night-detail')}${photograph('nanjing-06','night-wide')}<h2 class="night-title">After<br><em>hours.</em></h2><p class="night-caption">当城市慢下来，<br>每一盏灯都像电影。<br><br>STAY A LITTLE LONGER.</p>${folio(3, 'WARM LIGHT / SLOW NIGHTS')}`],
  ['library-page', '南京 / BETWEEN THE LINES', () => `${meta('NANJING / THE QUIET EDIT')}${photograph('nanjing-02','library-main')}${photograph('nanjing-05','library-secondary')}${photograph('nanjing-08','library-small')}<h2 class="library-heading">Between<br><em>the lines.</em><span>在 书 页 与 城 市 之 间</span></h2><span class="library-side">WANDER WITHOUT A PLAN.</span><p class="library-caption">逛一间书店，走一条没走过的路。<br>把平凡的一天，过成一段小小的漫游。</p>${folio(4, 'BOOKS / WALKS / COMPANY')}`],
  ['water-opener', '河南 / INTO THE WILD', () => `${photograph('henan-04','full-bleed')}${shade}${meta('CHAPTER 02','HENAN / 河南')}<h2 class="water-title">Into<br><em>the wild.</em></h2><span class="water-label">山 野 来 信</span><p class="water-bottom">去有风的地方。<br>把自己，还给自然。</p>${folio(5, 'THE NATURE EDIT')}`],
  ['nature-page', '河南 / A LITTLE BRAVER', () => `${meta('HENAN / THE OPEN AIR')}${photograph('henan-01','nature-landscape')}${photograph('henan-02','nature-adventure')}${photograph('henan-03','nature-square')}<h2 class="nature-title"><span>COLLECT EXPERIENCES, NOT THINGS.</span>A little<br><em>braver.</em></h2><p class="nature-label">有时候，勇敢只是向前迈一步。<br>然后就能看见，另一种风景。<b>↗</b></p>${folio(6, 'BREATHE / WANDER / FEEL')}`],
  ['silence-page', '河南 / SOUND OF SILENCE', () => `${meta('HENAN / WATER & LIGHT')}${photograph('henan-05','silence-main')}${photograph('henan-06','silence-detail')}<h2 class="silence-title">Sound of<br><em>silence.</em></h2><p class="silence-vertical">让世界大一点，<br>让心事小一点。</p><span class="silence-cap">SMALL IN THE WORLD. FULL OF WONDER.</span>${folio(7, 'A LETTER FROM THE MOUNTAINS')}`],
  ['life-opener', '生活 / SOFT HOURS', () => `${photograph('life-01','full-bleed')}${shade}${meta('CHAPTER 03','EVERYDAY / 生活')}<h2 class="life-title">Soft<br><em>hours.</em></h2><p class="life-subtitle">没什么特别，<br>就是很喜欢这一刻。</p>${folio(8, 'THE EVERYDAY EDIT')}`],
  ['life-notebook', '生活 / A PRIVATE DIARY', () => `${meta('A PRIVATE DIARY','NO OCCASION NEEDED.')}<span class="diary-date">SOME LITTLE THINGS / 日常私语</span><h2 class="diary-heading">Ordinary,<br><em>but mine.</em></h2>${photograph('life-02','diary-one')}${photograph('life-04','diary-three')}${photograph('life-03','diary-two')}<span class="diary-tape"></span><p class="diary-copy">允许日子慢一点，<br>也允许自己，什么都不做。<span class="diary-quote">此时情绪此时天<br>无事小神仙</span></p><span class="diary-flower">✳</span>${folio(9, 'A SOFT KIND OF BEAUTIFUL')}`],
  ['birthday-opener', '生日 / BORN TO BLOOM', () => `${photograph('birthday-01','full-bleed')}${shade}${meta('CHAPTER 04','BIRTHDAY / 生日')}<h2 class="birthday-title">Born to<br><em>bloom.</em></h2><span class="birthday-roundel">23</span><p class="birthday-sub">新的一岁。<br>继续热烈，继续闪耀。</p>${folio(10, 'THE CELEBRATION EDIT')}`],
  ['birthday-detail-page', '生日 / ALL THAT GLOWS', () => `${meta('BIRTHDAY / IN FULL BLOOM')}${photograph('birthday-02','birthday-detail-one')}${photograph('birthday-05','birthday-detail-two')}<h2 class="birthday-detail-heading">All that<br><em>glows.</em></h2><span class="birthday-spark">✧</span><p class="birthday-detail-cap">花，烛光，<br>漂亮的裙摆。<br><br>今天，<br>为自己盛装。</p>${folio(11, 'DRESS UP FOR YOURSELF')}`],
  ['birthday-film', '生日 / MAKE A WISH', () => `${meta('BIRTHDAY / THE CONTACT SHEET')}${photograph('birthday-04','birthday-wide')}${photograph('birthday-06','birthday-strip')}${photograph('birthday-03','birthday-selfies')}<h2 class="birthday-film-title">Make a wish.<br><em>Keep the feeling.</em></h2><div class="birthday-film-caption"><span>CANDLES OUT. HEART FULL.</span><span>把快乐，留得久一点。</span></div>${folio(12, 'A NIGHT TO REMEMBER')}`],
  ['portrait-opener portrait-page', '写真 / STRAWBERRY REVERIE', () => `${meta('CHAPTER 05', 'PORTRAITS / 写真')}${photograph('portrait-01','portrait-hero')}<div class="portrait-opening-copy"><span class="portrait-eyebrow">A SOFT AFTERNOON</span><h2>Strawberry<br><em>reverie.</em></h2><p>草 莓 白 日 梦</p></div><span class="portrait-issue">THE PORTRAIT SERIES / 01—09</span>${folio(13, 'WINDOW LIGHT / LITTLE DELIGHTS')}`],
  ['portrait-pair portrait-page', '写真 / SOFT FOCUS', () => `${meta('PORTRAITS / SOFT FOCUS', 'THE PINK EDIT')}<h2 class="portrait-pair-title">Soft <em>focus.</em></h2>${photograph('portrait-03','portrait-pair-main')}${photograph('portrait-09','portrait-pair-detail')}<p class="portrait-pair-copy">把午后<br>调成柔光。<span>NO RUSH.<br>JUST THIS.</span></p><span class="portrait-frame-label">02 / A CLOSER LOOK</span>${folio(14, 'FLOWERS / LIGHT / A LITTLE PINK')}`],
  ['portrait-tasting portrait-page', '写真 / A LITTLE SWEETNESS', () => `${meta('PORTRAITS / SMALL PLEASURES', 'STRAWBERRY SEASON')}${photograph('portrait-05','portrait-tasting-main')}${photograph('portrait-02','portrait-tasting-detail')}<span class="portrait-tasting-note">一点甜，<br>就很好。</span><h2 class="portrait-tasting-title">A little<br><em>sweetness.</em></h2>${folio(15, 'SWEET LITTLE NOTHING')}`],
  ['portrait-slow portrait-page', '写真 / SLOW AFTERNOON', () => `${meta('PORTRAITS / TAKE YOUR TIME', 'AN AFTERNOON IN BLOOM')}${photograph('portrait-06','portrait-hero')}<h2 class="portrait-slow-title">The art of<br><em>slowing down.</em></h2><span class="portrait-single-caption">把时间，留给喜欢的事。</span>${folio(16, 'NOWHERE ELSE TO BE')}`],
  ['portrait-pair portrait-pair-alt portrait-page', '写真 / IN A DAYDREAM', () => `${meta('PORTRAITS / IN A DAYDREAM', 'LITTLE MOMENTS')}<h2 class="portrait-pair-title">In a <em>daydream.</em></h2>${photograph('portrait-04','portrait-pair-main')}${photograph('portrait-07','portrait-pair-detail')}<p class="portrait-pair-copy">日光轻轻，<br>心情也轻轻。<span>A MOMENT<br>OF MY OWN.</span></p><span class="portrait-frame-label">05 / THE QUIET DETAILS</span>${folio(17, 'LET THE AFTERNOON LINGER')}`],
  ['portrait-ending portrait-page', '写真 / SWEET NOTHING', () => `${meta('PORTRAITS / THE LAST FRAME', 'STILL IN A DAYDREAM')}${photograph('portrait-08','portrait-hero')}<h2 class="portrait-ending-title">Sweet<br><em>nothing.</em></h2><span class="portrait-single-caption">没有安排，也自有好时光。</span>${folio(18, 'STRAWBERRY REVERIE / FIN')}`],
  ['letter-page', '后记 / A NOTE TO MYSELF', () => `${meta('EDITOR’S LETTER','TO MYSELF')}<span class="letter-kicker">A NOTE TO MYSELF</span><h2 class="letter-title">Still<br><em>becoming.</em></h2><p class="letter-body">不必急着成为谁。<br>去喜欢，去感受，去记录。<br>让每一个普通的今天，<br>都有被认真收藏的理由。</p><span class="letter-signature">with love, LMR</span><button class="secret-note-button" data-secret>拆开一封给自己的信 ${icon('arrow')}</button><div class="secret-note" hidden><button data-secret-close aria-label="收起信件">×</button><span>✳</span><h3>Dear me,</h3><p>愿你始终有<br>取悦自己的勇气，<br>也有慢慢生长的自由。<br><br>你值得被爱，<br>也值得所有美好的发生。</p></div>${folio(19, 'THE STORY IS STILL UNFOLDING')}`],
  ['archive-page', '影像档案 / PHOTO ARCHIVE', () => `${meta('THE PHOTO ARCHIVE',`${photos.length} FRAMES / ONE LIFE`)}<h2 class="archive-heading">Collected <em>moments.</em></h2><p class="archive-sub">每一格，都是生活的证据。点击重温。</p><div class="printed-archive">${photos.map(p => photograph(p.id,'',true)).join('')}</div><span class="archive-bottom">Little moments, real me.</span>${folio(20, 'KEEP WHAT MAKES YOU FEEL')}`],
  ['back-cover', '封底 / THE STORY CONTINUES', () => `${photograph('nanjing-07','full-bleed')}${shade}${meta('THE PERSONAL ISSUE','VOL. 01')}<div class="back-logo">LMR</div><h2 class="back-quote">To be<br><em>continued.</em><span>故事未完，来日方长。</span></h2><button class="back-restart" data-goto="0">${icon('arrow')} 再 翻 一 遍</button>${folio(lastPage, 'LITTLE MOMENTS. REAL ME.')}`]
];
const pageCount = pageDefinitions.length;
const lastPage = pageCount - 1;

const book = $('#book');
const base = $('#page-base');
const turnLayer = $('#turn-layer');
turnLayer.inert = true;
const media = window.matchMedia('(max-width: 760px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let mobile = media.matches;
let currentPage = 0;
let animating = false;
let animationTimer;
let photoIndex = 0;
let returnFocus = null;
let toastTimer;
let audioContext;
let turnSound = false;
let favorites = new Set();

try {
  const stored = JSON.parse(localStorage.getItem('lmr-favorites') || '[]');
  if (Array.isArray(stored)) favorites = new Set(stored.filter(id => photoById.has(id)));
  if (localStorage.getItem('lmr-theme') === 'dark') document.body.classList.add('dark');
} catch { /* Reading still works when browser storage is unavailable. */ }

function paper(index) {
  const [className, label, content] = pageDefinitions[index];
  return `<article class="paper ${className}" data-page="${index}" aria-label="${index === 0 ? '封面' : `第 ${index} 页`}，${label}">${content()}</article>`;
}
function isSpread(index) {return !mobile && index > 0 && index < lastPage;}
function normalize(index) {
  index = Math.max(0, Math.min(lastPage, index));
  return !mobile && index > 0 && index < lastPage ? (index % 2 ? index : index - 1) : index;
}
function stops() {return Array.from({length:pageCount},(_,i)=>i).filter(i=>mobile || i===0 || i===lastPage || i%2===1);}
function visiblePages(index = currentPage) {return isSpread(index) ? [index,index+1] : [index];}
function setBase(index) {
  base.innerHTML = visiblePages(index).map(paper).join('');
  book.classList.toggle('is-spread',isSpread(index));
  document.body.classList.toggle('cover-open',index === 0);
  document.body.classList.toggle('reading',index !== 0);
}
function fitBook() {
  const width = document.documentElement.clientWidth;
  const height = $('#reader').getBoundingClientRect().height;
  const spread = isSpread(currentPage);
  const pageRatio = 420 / 578;
  const usableWidth = Math.max(1, width - (mobile ? 48 : spread ? 128 : 64));
  const usableHeight = Math.max(1, height - (mobile ? 64 : 108));
  const pageWidth = Math.min(spread ? usableWidth / 2 : usableWidth, usableHeight * pageRatio);
  document.documentElement.style.setProperty('--page-w',`${pageWidth}px`);
  document.documentElement.style.setProperty('--page-h',`${pageWidth / pageRatio}px`);
}
function pageLabel(index) {
  if (index === 0) return 'COVER';
  if (index === lastPage) return 'BACK COVER';
  return visiblePages(index).map(p=>String(p).padStart(2,'0')).join(' — ');
}
function updateControls() {
  const positions = stops();
  const first = currentPage === 0, last = currentPage === lastPage;
  $('#prev-button').disabled = first;
  $('#side-prev').disabled = first;
  $('#next-button').disabled = last;
  $('#side-next').disabled = last;
  $('#next-button').setAttribute('aria-label', first ? '翻开杂志' : '下一页');
  $('#side-next').setAttribute('aria-label', first ? '翻开杂志' : '下一页');
  $('#page-number').textContent = pageLabel(currentPage);
  $('#page-total').textContent = `${pageCount} PAGES`;
  const labels = visiblePages().map(i=>pageDefinitions[i][1]);
  $('#chapter-label').textContent = currentPage === 0 ? 'THE COVER / 封面' : labels.join('   ·   ');
  $('#stage-edition').textContent = currentPage === 0 ? 'PERSONAL EDITION — 01' : 'LITTLE MOMENTS, REAL ME.';
  $('#progress-track').innerHTML = positions.map(p=>`<button class="progress-stop" data-goto="${p}" aria-label="${p===0?'封面':p===lastPage?'封底':`跳转到第 ${p} 页`}" aria-current="${p===currentPage}"></button>`).join('');
  $('#reader-hint').innerHTML = mobile ? '左右滑动翻页 <b>·</b> 点击照片放大 <b>·</b> ♡ 收藏心动瞬间' : '点击箭头翻页 <b>·</b> 按 ← → 阅读 <b>·</b> 点击照片放大';
  $('#announcement').textContent = `当前阅读：${labels.join('，')}。${pageLabel(currentPage)}`;
}
function setHash(index) {
  try { history.replaceState(null, '',index ? `#page-${index}` : '#cover'); } catch { /* Some local file viewers restrict history. */ }
}
function finishTurn() {
  clearTimeout(animationTimer);
  setBase(currentPage);
  turnLayer.replaceChildren();
  book.classList.remove('turning');
  animating = false;
}
function turnTo(rawIndex, animate = true) {
  if (animating) return;
  const target = normalize(rawIndex);
  if (target === currentPage) return;
  const previous = currentPage;
  const forward = target > previous;
  const sequential = Math.abs(stops().indexOf(target)-stops().indexOf(previous))===1;
  const canAnimate = animate && sequential && !reducedMotion.matches;
  currentPage = target;
  setBase(target);
  fitBook();
  updateControls();
  setHash(target);
  preloadAround(target);
  if (turnSound) playTurnSound();
  if (!canAnimate) {
    book.classList.add('cover-opening');
    setTimeout(()=>book.classList.remove('cover-opening'),600);
    return;
  }
  animating = true;
  book.classList.add('turning');
  let frontIndex, backIndex, className;
  if (mobile) {
    frontIndex = previous; backIndex = target;
    className = forward ? 'single-forward' : 'backwards single-back';
  } else if (previous === 0) {
    frontIndex = 0; backIndex = 1; className = 'cover-forward';
    base.innerHTML = '<article class="paper" aria-hidden="true"></article>'+paper(2);
  } else if (target === 0) {
    frontIndex = 1; backIndex = 0; className = 'backwards cover-backward';
    base.innerHTML = visiblePages(previous).map(paper).join('');
  } else if (target === lastPage) {
    frontIndex = lastPage-1; backIndex = lastPage; className = 'close-forward';
    base.innerHTML = visiblePages(previous).map(paper).join('');
  } else if (previous === lastPage) {
    frontIndex = lastPage; backIndex = lastPage-1; className = 'backwards back-cover-backward';
  } else {
    frontIndex = forward ? previous+1 : previous;
    backIndex = forward ? target : target+1;
    className = forward ? '' : 'backwards';
    base.innerHTML = forward ? paper(previous)+paper(target+1) : paper(target)+paper(previous+1);
  }
  turnLayer.innerHTML = `<div class="turn-sheet ${className}"><div class="turn-face front">${paper(frontIndex)}</div><div class="turn-face back">${paper(backIndex)}</div></div>`;
  // Cloned faces are decorative; only the final spread is interactive.
  $$('button',turnLayer).forEach(button=>{button.tabIndex=-1;});
  const sheet = $('.turn-sheet',turnLayer);
  sheet.addEventListener('animationend',finishTurn,{once:true});
  animationTimer = setTimeout(finishTurn,1100);
}
function movePage(direction) {
  const positions = stops();
  const next = positions[positions.indexOf(currentPage)+direction];
  if (next !== undefined) turnTo(next);
}
function preloadAround(index) {
  const pages = [index,index+1,index+2].filter(i=>i<pageCount);
  const html = pages.map(i=>pageDefinitions[i][2]()).join('');
  const ids = [...html.matchAll(/data-photo="([a-z]+-\d+)"/g)].map(match=>match[1]);
  [...new Set(ids)].forEach(id=>{const img=new Image();img.src=asset(id);});
}
function toast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2200);
}
function setTools(position, expanded) {
  const top = position === 'top';
  const button = $(top ? '#top-tools-toggle' : '#bottom-tools-toggle');
  const panel = $(top ? '#top-tools' : '#bottom-tools');
  document.body.classList.toggle(`${position}-tools-open`,expanded);
  button.setAttribute('aria-expanded',String(expanded));
  button.setAttribute('aria-label',`${expanded ? '收起' : '展开'}${top ? '顶部工具' : '底部翻页栏'}`);
  if (!expanded && panel.contains(document.activeElement)) button.focus({preventScroll:true});
  panel.inert = !expanded;
  if (top) $('use',button).setAttribute('href',expanded ? '#i-close' : '#i-grid');
}
function showDialog(dialog, trigger) {
  returnFocus = trigger || document.activeElement;
  if (!dialog.open) dialog.showModal();
}
function closeDialog(dialog) {
  if (dialog.open) dialog.close();
  if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
}
function showPhoto(id, trigger) {
  photoIndex = photos.findIndex(photo=>photo.id===id);
  if (photoIndex<0) return;
  updatePhoto();
  showDialog($('#lightbox'),trigger);
}
function updatePhoto() {
  const photo=photos[photoIndex];
  $('#lightbox-image').src=asset(photo.id);
  $('#lightbox-image').alt=photo.caption;
  $('#lightbox-title').textContent=chapterNames[photo.group];
  $('#lightbox-index').textContent=`FRAME ${String(photoIndex+1).padStart(2,'0')} / ${photos.length} — LMR ARCHIVE`;
  $('#lightbox-caption').textContent=photo.caption;
  $('#like-button').setAttribute('aria-pressed',String(favorites.has(photo.id)));
  $('#like-button span').textContent=favorites.has(photo.id)?'已收藏这一刻':'收藏这一刻';
  const preload = new Image();preload.src=asset(photos[(photoIndex+1)%photos.length].id);
}
function movePhoto(direction) {photoIndex=(photoIndex+direction+photos.length)%photos.length;updatePhoto();}
function saveFavorites() {
  try {localStorage.setItem('lmr-favorites',JSON.stringify([...favorites]));} catch {toast('本次收藏已记住；当前浏览器未允许持久保存。');}
}
function updateFavoritesCount() {
  $('#favorite-count').hidden=favorites.size===0;
  $('#favorite-count').textContent=favorites.size;
}
function renderFavorites() {
  const selected=photos.filter(photo=>favorites.has(photo.id));
  $('#favorites-grid').innerHTML=selected.length ? selected.map(photo=>`<button class="favorite-card" data-photo="${photo.id}" aria-label="查看收藏：${photo.caption}"><img src="${asset(photo.id,true)}" alt="${photo.caption}"><span>${photo.caption}</span></button>`).join('') : `<div class="empty-favorites">${icon('heart')}<p>还没有收藏的照片。<br>打开任意照片，点击「收藏这一刻」，就能把喜欢的画面留在这里。</p></div>`;
}
function playTurnSound() {
  try {
    audioContext ||= new (window.AudioContext||window.webkitAudioContext)();
    if (audioContext.state==='suspended') audioContext.resume();
    const duration=.24;
    const buffer=audioContext.createBuffer(1,audioContext.sampleRate*duration,audioContext.sampleRate);
    const data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/data.length);
    const source=audioContext.createBufferSource();source.buffer=buffer;
    const filter=audioContext.createBiquadFilter();filter.type='bandpass';filter.frequency.value=1700;filter.Q.value=.5;
    const gain=audioContext.createGain();gain.gain.value=.055;
    source.connect(filter);filter.connect(gain);gain.connect(audioContext.destination);source.start();
  } catch {turnSound=false;$('#sound-button').setAttribute('aria-pressed','false');$('#sound-button').classList.add('sound-off');toast('当前浏览器暂不支持翻页音效。');}
}

$('#chapter-list').innerHTML=chapters.map(c=>`<button class="chapter-card" data-goto="${c.page}"><img src="${asset(c.photo,true)}" alt="${c.cn}" loading="lazy"><span><span class="chapter-card-num">CHAPTER ${c.num} / P.${c.range}</span><strong>${c.title}</strong><small>${c.cn}</small></span></button>`).join('');
$('.dialog-footnote').textContent = `${photos.length} 张照片 · ${chapters.length} 个章节 · 一本关于自己的书`;
$('#prev-button').addEventListener('click',()=>movePage(-1));
$('#top-tools-toggle').addEventListener('click',()=>setTools('top',!document.body.classList.contains('top-tools-open')));
$('#bottom-tools-toggle').addEventListener('click',()=>setTools('bottom',!document.body.classList.contains('bottom-tools-open')));
$('#side-prev').addEventListener('click',()=>movePage(-1));
$('#next-button').addEventListener('click',()=>movePage(1));
$('#side-next').addEventListener('click',()=>movePage(1));
$('#open-book').addEventListener('click',()=>turnTo(1));
$('.wordmark').addEventListener('click',event=>{event.preventDefault();turnTo(0,false);});
$('#contents-button').addEventListener('click',event=>showDialog($('#contents-dialog'),event.currentTarget));
$('#return-cover').addEventListener('click',()=>{closeDialog($('#contents-dialog'));turnTo(0,false);});
$('#favorites-button').addEventListener('click',event=>{renderFavorites();showDialog($('#favorites-dialog'),event.currentTarget);});
$('#lightbox-prev').addEventListener('click',()=>movePhoto(-1));
$('#lightbox-next').addEventListener('click',()=>movePhoto(1));
$('#like-button').addEventListener('click',()=>{
  const id=photos[photoIndex].id;
  if(favorites.has(id))favorites.delete(id);else favorites.add(id);
  saveFavorites();updatePhoto();updateFavoritesCount();
  if($('#favorites-dialog').open)renderFavorites();
});
$('#theme-button').addEventListener('click',()=>{
  const dark=document.body.classList.toggle('dark');
  $('#theme-button').setAttribute('aria-pressed',String(dark));
  $('#theme-button').setAttribute('aria-label',dark?'切换浅色阅读背景':'切换深色阅读背景');
  try{localStorage.setItem('lmr-theme',dark?'dark':'light');}catch{}
});
$('#theme-button').setAttribute('aria-pressed',String(document.body.classList.contains('dark')));
$('#theme-button').setAttribute('aria-label',document.body.classList.contains('dark')?'切换浅色阅读背景':'切换深色阅读背景');
$('#sound-button').addEventListener('click',()=>{
  turnSound=!turnSound;
  $('#sound-button').setAttribute('aria-pressed',String(turnSound));
  $('#sound-button').setAttribute('aria-label',turnSound?'关闭翻页音效':'开启翻页音效');
  $('#sound-button').classList.toggle('sound-off',!turnSound);
  if(turnSound)playTurnSound();
  toast(turnSound?'翻页音效已开启':'翻页音效已关闭');
});
$('#fullscreen-button').addEventListener('click',async()=>{
  try{
    if(document.fullscreenElement)await document.exitFullscreen();
    else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();
    else toast('当前浏览器不支持全屏阅读。');
  }catch{toast('浏览器未开启全屏，可按 F11 阅读。');}
});
document.addEventListener('fullscreenchange',()=>{
  $('#fullscreen-button').setAttribute('aria-label',document.fullscreenElement?'退出全屏':'全屏阅读');
  fitBook();
});
document.addEventListener('click',event=>{
  const close=event.target.closest('.close-dialog');
  if(close){closeDialog(close.closest('dialog'));return;}
  const goto=event.target.closest('[data-goto]');
  if(goto){const dialog=goto.closest('dialog');if(dialog)closeDialog(dialog);turnTo(Number(goto.dataset.goto),false);return;}
  const photo=event.target.closest('[data-photo]');
  if(photo&&!photo.closest('#turn-layer')){showPhoto(photo.dataset.photo,photo);return;}
  const secret=event.target.closest('[data-secret]');
  if(secret){const note=$('.secret-note',secret.closest('.paper'));note.hidden=false;$('[data-secret-close]',note).focus();return;}
  const secretClose=event.target.closest('[data-secret-close]');
  if(secretClose){const page=secretClose.closest('.paper');$('.secret-note',page).hidden=true;$('[data-secret]',page).focus();}
});
$$('dialog').forEach(dialog=>{
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const bounds=dialog.getBoundingClientRect();
    if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)closeDialog(dialog);
  });
});
document.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName))return;
  if($('#lightbox').open){
    if(event.key==='ArrowRight'){event.preventDefault();movePhoto(1);}
    if(event.key==='ArrowLeft'){event.preventDefault();movePhoto(-1);}
    return;
  }
  if($('dialog[open]'))return;
  if(event.key==='ArrowRight'||event.key==='PageDown'){event.preventDefault();movePage(1);}
  if(event.key==='ArrowLeft'||event.key==='PageUp'){event.preventDefault();movePage(-1);}
  if(event.key==='Home'){event.preventDefault();turnTo(0,false);}
  if(event.key==='End'){event.preventDefault();turnTo(lastPage,false);}
  if(event.key==='Escape'){
    setTools('top',false);
    setTools('bottom',false);
    const note=$('.secret-note:not([hidden])');
    if(note){note.hidden=true;$('[data-secret]',note.closest('.paper')).focus();}
  }
});

function addSwipe(element,callback){
  let start;
  element.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse')return;start={x:event.clientX,y:event.clientY,time:Date.now()};},{passive:true});
  element.addEventListener('pointerup',event=>{
    if(!start)return;
    const dx=event.clientX-start.x,dy=event.clientY-start.y;
    const valid=Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5&&Date.now()-start.time<1200;
    start=null;
    if(valid){element.dataset.swiping='true';callback(dx<0?1:-1);setTimeout(()=>delete element.dataset.swiping,400);}
  },{passive:true});
  element.addEventListener('pointercancel',()=>{start=null;},{passive:true});
  element.addEventListener('click',event=>{if(element.dataset.swiping){event.preventDefault();event.stopPropagation();}},true);
}
addSwipe($('#book-space'),direction=>movePage(direction));
addSwipe($('.lightbox-body'),direction=>movePhoto(direction));
let resizeTimer;
window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{
    if(animating)finishTurn();
    mobile=media.matches;
    currentPage=normalize(currentPage);
    setBase(currentPage);fitBook();updateControls();
  },120);
});
window.addEventListener('hashchange',()=>{
  const match=location.hash.match(/^#page-(\d+)$/);
  turnTo(match?Number(match[1]):0,false);
});
const initialHash=location.hash.match(/^#page-(\d+)$/);
if(initialHash)currentPage=normalize(Number(initialHash[1]));
setBase(currentPage);
fitBook();
updateControls();
updateFavoritesCount();
document.fonts.ready.then(fitBook);
window.addEventListener('load',fitBook,{once:true});
