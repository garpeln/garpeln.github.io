// https://github.com/ghiculescu/jekyll-table-of-contents

(function($) {
  $.fn.toc = function(options) {
    var defaults = {
      noBackToTopLinks: true,
      title: '',
      minimumHeaders: 3,
      headers: 'h1, h2, h3, h4, h5, h6',
      listType: 'ul',// values: [ol|ul]
      showEffect: 'slideDown',// values: [show|slideDown|fadeIn|none]
      showSpeed: '0',// set to 0 to deactivate effect
      classes: {
        list: '',
        item: '',
        activeItem: 'active' // 新增高亮项的 CSS 类名
      },
      highlightOnScroll: true,
      highlightOffset: 100
    },
    settings = $.extend(defaults, options);

    function fixedEncodeURIComponent(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    }

function createLink(header) {
  var innerText = (header.textContent === undefined) ? header.innerText : header.textContent;
  var link = "<a data-id='" + header.id.replace(/\s/g, "_") + "' class=toc-normal " + "href='#" + fixedEncodeURIComponent(header.id) + "'>" + innerText + "</a>";
  return link;
}


    // 新增滚动时高亮显示的函数
function highlightOnScroll(scrollPosition) {
  var headers = $("#toc a");

  headers.removeClass("toc-active");

  var closestHeader = null;
  var closestDistance = Number.MAX_VALUE;

  headers.each(function(index, header) {
    var targetId = header.getAttribute("data-id");
    var targetElement = $("#" + targetId);

    if (targetElement.length) {
      var headerTop = targetElement.offset().top - settings.highlightOffset;
      var distance = Math.abs(scrollPosition - headerTop);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestHeader = header;
      }
    }
  });

  if (closestHeader) {
    $(closestHeader).addClass("toc-active");
  }
}


    window.highlightOnScroll = highlightOnScroll;

    var headers = $(settings.headers).filter(function() {
      // get all headers with an ID
      var previousSiblingName = $(this).prev().attr("name");
      if (!this.id && previousSiblingName) {
        this.id = $(this).attr("id", previousSiblingName.replace(/\./g, "-"));
      }
      return this.id;
    }), output = $(this);

    if (!headers.length || headers.length < settings.minimumHeaders || !output.length) {
      $(this).hide();
      return;
    }

    if (0 === settings.showSpeed) {
      settings.showEffect = 'none';
    }

    var render = {
      show: function() {
        output.hide().html(html).show(settings.showSpeed);
        if (settings.highlightOnScroll) {
          highlightOnScroll($(window).scrollTop());
        }
      },
      slideDown: function() {
        output.hide().html(html).slideDown(settings.showSpeed);
        if (settings.highlightOnScroll) {
          highlightOnScroll($(window).scrollTop());
        }
      },
      fadeIn: function() {
        output.hide().html(html).fadeIn(settings.showSpeed);
        if (settings.highlightOnScroll) {
          highlightOnScroll($(window).scrollTop());
        }
      },
      none: function() {
        output.html(html);
      }
    };

    var get_level = function(ele) {
      return parseInt(ele.nodeName.replace("H", ""), 10);
    };
    var highest_level = headers.map(function(_, ele) {
      return get_level(ele);
    }).get().sort()[0];
    var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>';

    var level = get_level(headers[0]),
      this_level,
      html = settings.title + " <" + settings.listType + " style='display: contents;list-style: none;'" + " class=\"" + settings.classes.list + "\">";

    headers.on('click', function() {
      if (!settings.noBackToTopLinks) {
        window.location.hash = this.id;
      }
    })
    .addClass('clickable-header')
    .each(function(_, header) {
      this_level = get_level(header);
      if (!settings.noBackToTopLinks && this_level === highest_level) {
        $(header).addClass('top-level-header').after(return_to_top);
      }
      if (this_level === level) {
        html += "<li class=\"" + settings.classes.item + "\">" + createLink(header);
      } else if (this_level <= level) {
        for (var i = this_level; i < level; i++) {
          html += "</li></" + settings.listType + ">";
        }
        html += "<li class=\"" + settings.classes.item + "\">" + createLink(header);
      } else if (this_level > level) {
        for (i = this_level; i > level; i--) {
          html += "<" + settings.listType + " style='list-style: none;margin-left: 2em;'" + " class=\"" + settings.classes.list + "\">" +
                  "<li class=\"" + settings.classes.item + "\">";
        }
        html += createLink(header);
      }
      level = this_level;
    });
    html += "</" + settings.listType + ">";
    if (!settings.noBackToTopLinks) {
      $(document).on('click', '.back-to-top', function() {
        $(window).scrollTop(0);
        window.location.hash = '';
      });
    }

    // 在滚动时触发高亮显示
    if (settings.highlightOnScroll) {
      $(window).scroll(function() {
        highlightOnScroll($(window).scrollTop());
      });
    }

    render[settings.showEffect]();
  };
})(jQuery);
