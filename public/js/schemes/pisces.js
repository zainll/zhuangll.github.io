/* global NexT, CONFIG */

var Affix = {
  init: function(element, options) {
    this.element = element;
    this.offset = options || 0;
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;
    this.checkPosition();
    window.addEventListener('scroll', this.checkPosition.bind(this));
    window.addEventListener('click', this.checkPositionWithEventLoop.bind(this));
    window.matchMedia('(min-width: 992px)').addListener(event =&gt; {
      if (event.matches) {
        this.offset = NexT.utils.getAffixParam();
        this.checkPosition();
      }
    });
  },
  getState: function(scrollHeight, height, offsetTop, offsetBottom) {
    let scrollTop = window.scrollY;
    let targetHeight = window.innerHeight;
    if (offsetTop != null &amp;&amp; this.affixed === 'top') {
      if (document.querySelector('.content-wrap').offsetHeight &lt; offsetTop) return 'top';
      return scrollTop &lt; offsetTop ? 'top' : false;
    }
    if (this.affixed === 'bottom') {
      if (offsetTop != null) return this.unpin &lt;= this.element.getBoundingClientRect().top ? false : 'bottom';
      return scrollTop + targetHeight &lt;= scrollHeight - offsetBottom ? false : 'bottom';
    }
    let initializing = this.affixed === null;
    let colliderTop = initializing ? scrollTop : this.element.getBoundingClientRect().top + scrollTop;
    let colliderHeight = initializing ? targetHeight : height;
    if (offsetTop != null &amp;&amp; scrollTop &lt;= offsetTop) return 'top';
    if (offsetBottom != null &amp;&amp; (colliderTop + colliderHeight &gt;= scrollHeight - offsetBottom)) return 'bottom';
    return false;
  },
  getPinnedOffset: function() {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.element.classList.remove('affix-top', 'affix-bottom');
    this.element.classList.add('affix');
    return (this.pinnedOffset = this.element.getBoundingClientRect().top);
  },
  checkPositionWithEventLoop() {
    setTimeout(this.checkPosition.bind(this), 1);
  },
  checkPosition: function() {
    if (window.getComputedStyle(this.element).display === 'none') return;
    let height = this.element.offsetHeight;
    let { offset } = this;
    let offsetTop = offset.top;
    let offsetBottom = offset.bottom;
    let { scrollHeight } = document.body;
    let affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
    if (this.affixed !== affix) {
      if (this.unpin != null) this.element.style.top = '';
      let affixType = 'affix' + (affix ? '-' + affix : '');
      this.affixed = affix;
      this.unpin = affix === 'bottom' ? this.getPinnedOffset() : null;
      this.element.classList.remove('affix', 'affix-top', 'affix-bottom');
      this.element.classList.add(affixType);
    }
    if (affix === 'bottom') {
      this.element.style.top = scrollHeight - height - offsetBottom + 'px';
    }
  }
};

NexT.utils.getAffixParam = function() {
  const sidebarOffset = CONFIG.sidebar.offset || 12;

  let headerOffset = document.querySelector('.header-inner').offsetHeight;
  let footerOffset = document.querySelector('.footer').offsetHeight;

  document.querySelector('.sidebar').style.marginTop = headerOffset + sidebarOffset + 'px';

  return {
    top   : headerOffset,
    bottom: footerOffset
  };
};

document.addEventListener('DOMContentLoaded', () =&gt; {

  Affix.init(document.querySelector('.sidebar-inner'), NexT.utils.getAffixParam());
});
<script type="text&#x2F;javascript" src="https://cdn.jsdelivr.net/npm/kity@2.0.4/dist/kity.min.js"></script><script type="text&#x2F;javascript" src="https://cdn.jsdelivr.net/npm/kityminder-core@1.4.50/dist/kityminder.core.min.js"></script><script defer="true" type="text&#x2F;javascript" src="https://cdn.jsdelivr.net/npm/hexo-simple-mindmap@0.7.0/dist/mindmap.min.js"></script><link rel="stylesheet" type="text&#x2F;css" href="https://cdn.jsdelivr.net/npm/hexo-simple-mindmap@0.7.0/dist/mindmap.min.css">