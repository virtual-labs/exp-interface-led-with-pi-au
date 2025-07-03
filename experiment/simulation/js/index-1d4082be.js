var ae = Object.defineProperty;
var le = (t, n, e) =>
  n in t
    ? ae(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var fn = (t, n, e) => (le(t, typeof n != "symbol" ? n + "" : n, e), e);
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = e(i);
    fetch(i.href, o);
  }
})();
var ue = { value: () => {} };
function zt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new yt(e);
}
function yt(t) {
  this._ = t;
}
function fe(t, n) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = "",
        i = e.indexOf(".");
      if (
        (i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))),
        e && !n.hasOwnProperty(e))
      )
        throw new Error("unknown type: " + e);
      return { type: e, name: r };
    });
}
yt.prototype = zt.prototype = {
  constructor: yt,
  on: function (t, n) {
    var e = this._,
      r = fe(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = he(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = hn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = hn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new yt(t);
  },
  call: function (t, n) {
    if ((i = arguments.length - 2) > 0)
      for (var e = new Array(i), r = 0, i, o; r < i; ++r)
        e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
  },
  apply: function (t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  },
};
function he(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function hn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = ue), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Dt = "http://www.w3.org/1999/xhtml";
const dn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Dt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Ct(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    dn.hasOwnProperty(n) ? { space: dn[n], local: t } : t
  );
}
function de(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Dt && n.documentElement.namespaceURI === Dt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function pe(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Sn(t) {
  var n = Ct(t);
  return (n.local ? pe : de)(n);
}
function ge() {}
function Ut(t) {
  return t == null
    ? ge
    : function () {
        return this.querySelector(t);
      };
}
function me(t) {
  typeof t != "function" && (t = Ut(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new v(r, this._parents);
}
function _e(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ye() {
  return [];
}
function Mn(t) {
  return t == null
    ? ye
    : function () {
        return this.querySelectorAll(t);
      };
}
function we(t) {
  return function () {
    return _e(t.apply(this, arguments));
  };
}
function xe(t) {
  typeof t == "function" ? (t = we(t)) : (t = Mn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new v(r, i);
}
function Ln(t) {
  return function () {
    return this.matches(t);
  };
}
function Rn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var ve = Array.prototype.find;
function be(t) {
  return function () {
    return ve.call(this.children, t);
  };
}
function Ee() {
  return this.firstElementChild;
}
function $e(t) {
  return this.select(t == null ? Ee : be(typeof t == "function" ? t : Rn(t)));
}
var Ne = Array.prototype.filter;
function Ie() {
  return Array.from(this.children);
}
function Ce(t) {
  return function () {
    return Ne.call(this.children, t);
  };
}
function ke(t) {
  return this.selectAll(
    t == null ? Ie : Ce(typeof t == "function" ? t : Rn(t))
  );
}
function Pe(t) {
  typeof t != "function" && (t = Ln(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new v(r, this._parents);
}
function Dn(t) {
  return new Array(t.length);
}
function Ae() {
  return new v(this._enter || this._groups.map(Dn), this._parents);
}
function vt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
vt.prototype = {
  constructor: vt,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function (t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function (t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t);
  },
};
function Te(t) {
  return function () {
    return t;
  };
}
function Se(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new vt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Me(t, n, e, r, i, o, s) {
  var c,
    a,
    l = new Map(),
    u = n.length,
    h = o.length,
    f = new Array(u),
    p;
  for (c = 0; c < u; ++c)
    (a = n[c]) &&
      ((f[c] = p = s.call(a, a.__data__, c, n) + ""),
      l.has(p) ? (i[c] = a) : l.set(p, a));
  for (c = 0; c < h; ++c)
    (p = s.call(t, o[c], c, o) + ""),
      (a = l.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), l.delete(p))
        : (e[c] = new vt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Le(t) {
  return t.__data__;
}
function Re(t, n) {
  if (!arguments.length) return Array.from(this, Le);
  var e = n ? Me : Se,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Te(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      a = new Array(o),
      l = 0;
    l < o;
    ++l
  ) {
    var u = r[l],
      h = i[l],
      f = h.length,
      p = De(t.call(u, u && u.__data__, l, r)),
      m = p.length,
      _ = (c[l] = new Array(m)),
      $ = (s[l] = new Array(m)),
      z = (a[l] = new Array(f));
    e(u, h, _, $, z, p, n);
    for (var C = 0, k = 0, d, g; C < m; ++C)
      if ((d = _[C])) {
        for (C >= k && (k = C + 1); !(g = $[k]) && ++k < m; );
        d._next = g || null;
      }
  }
  return (s = new v(s, r)), (s._enter = c), (s._exit = a), s;
}
function De(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Oe() {
  return new v(this._exit || this._groups.map(Dn), this._parents);
}
function Ge(t, n, e) {
  var r = this.enter(),
    i = this,
    o = this.exit();
  return (
    typeof t == "function"
      ? ((r = t(r)), r && (r = r.selection()))
      : (r = r.append(t + "")),
    n != null && ((i = n(i)), i && (i = i.selection())),
    e == null ? o.remove() : e(o),
    r && i ? r.merge(i).order() : i
  );
}
function Be(t) {
  for (
    var n = t.selection ? t.selection() : t,
      e = this._groups,
      r = n._groups,
      i = e.length,
      o = r.length,
      s = Math.min(i, o),
      c = new Array(i),
      a = 0;
    a < s;
    ++a
  )
    for (
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, m = 0;
      m < h;
      ++m
    )
      (p = l[m] || u[m]) && (f[m] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new v(c, this._parents);
}
function Xe() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function He(t) {
  t || (t = qe);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, a = (i[o] = new Array(c)), l, u = 0;
      u < c;
      ++u
    )
      (l = s[u]) && (a[u] = l);
    a.sort(n);
  }
  return new v(i, this._parents).order();
}
function qe(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Fe() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Ye() {
  return Array.from(this);
}
function Ve() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function ze() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Ue() {
  return !this.node();
}
function Ke(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function We(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ze(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Qe(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Je(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function je(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function tr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function nr(t, n) {
  var e = Ct(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Ze
        : We
      : typeof n == "function"
      ? e.local
        ? tr
        : je
      : e.local
      ? Je
      : Qe)(e, n)
  );
}
function On(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function er(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function rr(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function ir(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function or(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? er : typeof n == "function" ? ir : rr)(t, n, e ?? "")
      )
    : Q(this.node(), t);
}
function Q(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    On(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function sr(t) {
  return function () {
    delete this[t];
  };
}
function cr(t, n) {
  return function () {
    this[t] = n;
  };
}
function ar(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function lr(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? sr : typeof n == "function" ? ar : cr)(t, n))
    : this.node()[t];
}
function Gn(t) {
  return t.trim().split(/^|\s+/);
}
function Kt(t) {
  return t.classList || new Bn(t);
}
function Bn(t) {
  (this._node = t), (this._names = Gn(t.getAttribute("class") || ""));
}
Bn.prototype = {
  add: function (t) {
    var n = this._names.indexOf(t);
    n < 0 &&
      (this._names.push(t),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (t) {
    var n = this._names.indexOf(t);
    n >= 0 &&
      (this._names.splice(n, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0;
  },
};
function Xn(t, n) {
  for (var e = Kt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Hn(t, n) {
  for (var e = Kt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function ur(t) {
  return function () {
    Xn(this, t);
  };
}
function fr(t) {
  return function () {
    Hn(this, t);
  };
}
function hr(t, n) {
  return function () {
    (n.apply(this, arguments) ? Xn : Hn)(this, t);
  };
}
function dr(t, n) {
  var e = Gn(t + "");
  if (arguments.length < 2) {
    for (var r = Kt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? hr : n ? ur : fr)(e, n));
}
function pr() {
  this.textContent = "";
}
function gr(t) {
  return function () {
    this.textContent = t;
  };
}
function mr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function _r(t) {
  return arguments.length
    ? this.each(t == null ? pr : (typeof t == "function" ? mr : gr)(t))
    : this.node().textContent;
}
function yr() {
  this.innerHTML = "";
}
function wr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function xr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function vr(t) {
  return arguments.length
    ? this.each(t == null ? yr : (typeof t == "function" ? xr : wr)(t))
    : this.node().innerHTML;
}
function br() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Er() {
  return this.each(br);
}
function $r() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Nr() {
  return this.each($r);
}
function Ir(t) {
  var n = typeof t == "function" ? t : Sn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Cr() {
  return null;
}
function kr(t, n) {
  var e = typeof t == "function" ? t : Sn(t),
    r = n == null ? Cr : typeof n == "function" ? n : Ut(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Pr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ar() {
  return this.each(Pr);
}
function Tr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Sr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Mr(t) {
  return this.select(t ? Sr : Tr);
}
function Lr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Rr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Dr(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var e = "",
        r = n.indexOf(".");
      return (
        r >= 0 && ((e = n.slice(r + 1)), (n = n.slice(0, r))),
        { type: n, name: e }
      );
    });
}
function Or(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        (o = n[e]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++r] = o);
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function Gr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Rr(n);
    if (r) {
      for (var s = 0, c = r.length; s < c; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = e)),
            (i.value = n);
          return;
        }
    }
    this.addEventListener(t.type, o, e),
      (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
      r ? r.push(i) : (this.__on = [i]);
  };
}
function Br(t, n, e) {
  var r = Dr(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var a = 0, l = c.length, u; a < l; ++a)
        for (i = 0, u = c[a]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name) return u.value;
    }
    return;
  }
  for (c = n ? Gr : Or, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function qn(t, n, e) {
  var r = On(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Xr(t, n) {
  return function () {
    return qn(this, t, n);
  };
}
function Hr(t, n) {
  return function () {
    return qn(this, t, n.apply(this, arguments));
  };
}
function qr(t, n) {
  return this.each((typeof n == "function" ? Hr : Xr)(t, n));
}
function* Fr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Fn = [null];
function v(t, n) {
  (this._groups = t), (this._parents = n);
}
function at() {
  return new v([[document.documentElement]], Fn);
}
function Yr() {
  return this;
}
v.prototype = at.prototype = {
  constructor: v,
  select: me,
  selectAll: xe,
  selectChild: $e,
  selectChildren: ke,
  filter: Pe,
  data: Re,
  enter: Ae,
  exit: Oe,
  join: Ge,
  merge: Be,
  selection: Yr,
  order: Xe,
  sort: He,
  call: Fe,
  nodes: Ye,
  node: Ve,
  size: ze,
  empty: Ue,
  each: Ke,
  attr: nr,
  style: or,
  property: lr,
  classed: dr,
  text: _r,
  html: vr,
  raise: Er,
  lower: Nr,
  append: Ir,
  insert: kr,
  remove: Ar,
  clone: Mr,
  datum: Lr,
  on: Br,
  dispatch: qr,
  [Symbol.iterator]: Fr,
};
function L(t) {
  return typeof t == "string"
    ? new v([[document.querySelector(t)]], [document.documentElement])
    : new v([[t]], Fn);
}
function Vr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function pn(t, n) {
  if (((t = Vr(t)), n === void 0 && (n = t.currentTarget), n)) {
    var e = n.ownerSVGElement || n;
    if (e.createSVGPoint) {
      var r = e.createSVGPoint();
      return (
        (r.x = t.clientX),
        (r.y = t.clientY),
        (r = r.matrixTransform(n.getScreenCTM().inverse())),
        [r.x, r.y]
      );
    }
    if (n.getBoundingClientRect) {
      var i = n.getBoundingClientRect();
      return [
        t.clientX - i.left - n.clientLeft,
        t.clientY - i.top - n.clientTop,
      ];
    }
  }
  return [t.pageX, t.pageY];
}
const zr = { passive: !1 },
  rt = { capture: !0, passive: !1 };
function St(t) {
  t.stopImmediatePropagation();
}
function W(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ur(t) {
  var n = t.document.documentElement,
    e = L(t).on("dragstart.drag", W, rt);
  "onselectstart" in n
    ? e.on("selectstart.drag", W, rt)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Kr(t, n) {
  var e = t.document.documentElement,
    r = L(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", W, rt),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ft = (t) => () => t;
function Ot(
  t,
  {
    sourceEvent: n,
    subject: e,
    target: r,
    identifier: i,
    active: o,
    x: s,
    y: c,
    dx: a,
    dy: l,
    dispatch: u,
  }
) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    subject: { value: e, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: c, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u },
  });
}
Ot.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Wr(t) {
  return !t.ctrlKey && !t.button;
}
function Zr() {
  return this.parentNode;
}
function Qr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Jr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function jr() {
  var t = Wr,
    n = Zr,
    e = Qr,
    r = Jr,
    i = {},
    o = zt("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", $)
      .on("touchmove.drag", z, zr)
      .on("touchend.drag touchcancel.drag", C)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var y = k(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (L(d.view).on("mousemove.drag", m, rt).on("mouseup.drag", _, rt),
        Ur(d.view),
        St(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function m(d) {
    if ((W(d), !l)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      l = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function _(d) {
    L(d.view).on("mousemove.drag mouseup.drag", null),
      Kr(d.view, l),
      W(d),
      i.mouse("end", d);
  }
  function $(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        w = n.call(this, d, g),
        b = y.length,
        D,
        U;
      for (D = 0; D < b; ++D)
        (U = k(this, w, d, g, y[D].identifier, y[D])) &&
          (St(d), U("start", d, y[D]));
    }
  }
  function z(d) {
    var g = d.changedTouches,
      y = g.length,
      w,
      b;
    for (w = 0; w < y; ++w)
      (b = i[g[w].identifier]) && (W(d), b("drag", d, g[w]));
  }
  function C(d) {
    var g = d.changedTouches,
      y = g.length,
      w,
      b;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        w = 0;
      w < y;
      ++w
    )
      (b = i[g[w].identifier]) && (St(d), b("end", d, g[w]));
  }
  function k(d, g, y, w, b, D) {
    var U = o.copy(),
      P = pn(D || y, g),
      cn,
      an,
      ut;
    if (
      (ut = e.call(
        d,
        new Ot("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: b,
          active: s,
          x: P[0],
          y: P[1],
          dx: 0,
          dy: 0,
          dispatch: U,
        }),
        w
      )) != null
    )
      return (
        (cn = ut.x - P[0] || 0),
        (an = ut.y - P[1] || 0),
        function se(At, ln, ce) {
          var un = P,
            Tt;
          switch (At) {
            case "start":
              (i[b] = se), (Tt = s++);
              break;
            case "end":
              delete i[b], --s;
            case "drag":
              (P = pn(ce || ln, g)), (Tt = s);
              break;
          }
          U.call(
            At,
            d,
            new Ot(At, {
              sourceEvent: ln,
              subject: ut,
              target: f,
              identifier: b,
              active: Tt,
              x: P[0] + cn,
              y: P[1] + an,
              dx: P[0] - un[0],
              dy: P[1] - un[1],
              dispatch: U,
            }),
            w
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ft(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ft(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ft(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ft(!!d)), f)
        : r;
    }),
    (f.on = function () {
      var d = o.on.apply(o, arguments);
      return d === o ? f : d;
    }),
    (f.clickDistance = function (d) {
      return arguments.length ? ((h = (d = +d) * d), f) : Math.sqrt(h);
    }),
    f
  );
}
function Wt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function Yn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function lt() {}
var it = 0.7,
  bt = 1 / it,
  Z = "\\s*([+-]?\\d+)\\s*",
  ot = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  A = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  ti = /^#([0-9a-f]{3,8})$/,
  ni = new RegExp(`^rgb\\(${Z},${Z},${Z}\\)$`),
  ei = new RegExp(`^rgb\\(${A},${A},${A}\\)$`),
  ri = new RegExp(`^rgba\\(${Z},${Z},${Z},${ot}\\)$`),
  ii = new RegExp(`^rgba\\(${A},${A},${A},${ot}\\)$`),
  oi = new RegExp(`^hsl\\(${ot},${A},${A}\\)$`),
  si = new RegExp(`^hsla\\(${ot},${A},${A},${ot}\\)$`),
  gn = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Wt(lt, st, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: mn,
  formatHex: mn,
  formatHex8: ci,
  formatHsl: ai,
  formatRgb: _n,
  toString: _n,
});
function mn() {
  return this.rgb().formatHex();
}
function ci() {
  return this.rgb().formatHex8();
}
function ai() {
  return Vn(this).formatHsl();
}
function _n() {
  return this.rgb().formatRgb();
}
function st(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = ti.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? yn(n)
          : e === 3
          ? new x(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ht(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ht(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = ni.exec(t))
      ? new x(n[1], n[2], n[3], 1)
      : (n = ei.exec(t))
      ? new x((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = ri.exec(t))
      ? ht(n[1], n[2], n[3], n[4])
      : (n = ii.exec(t))
      ? ht((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = oi.exec(t))
      ? vn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = si.exec(t))
      ? vn(n[1], n[2] / 100, n[3] / 100, n[4])
      : gn.hasOwnProperty(t)
      ? yn(gn[t])
      : t === "transparent"
      ? new x(NaN, NaN, NaN, 0)
      : null
  );
}
function yn(t) {
  return new x((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ht(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new x(t, n, e, r);
}
function li(t) {
  return (
    t instanceof lt || (t = st(t)),
    t ? ((t = t.rgb()), new x(t.r, t.g, t.b, t.opacity)) : new x()
  );
}
function Gt(t, n, e, r) {
  return arguments.length === 1 ? li(t) : new x(t, n, e, r ?? 1);
}
function x(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Wt(
  x,
  Gt,
  Yn(lt, {
    brighter(t) {
      return (
        (t = t == null ? bt : Math.pow(bt, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? it : Math.pow(it, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new x(Y(this.r), Y(this.g), Y(this.b), Et(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: wn,
    formatHex: wn,
    formatHex8: ui,
    formatRgb: xn,
    toString: xn,
  })
);
function wn() {
  return `#${F(this.r)}${F(this.g)}${F(this.b)}`;
}
function ui() {
  return `#${F(this.r)}${F(this.g)}${F(this.b)}${F(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function xn() {
  const t = Et(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Y(this.r)}, ${Y(this.g)}, ${Y(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function Et(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Y(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function F(t) {
  return (t = Y(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function vn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new N(t, n, e, r)
  );
}
function Vn(t) {
  if (t instanceof N) return new N(t.h, t.s, t.l, t.opacity);
  if ((t instanceof lt || (t = st(t)), !t)) return new N();
  if (t instanceof N) return t;
  t = t.rgb();
  var n = t.r / 255,
    e = t.g / 255,
    r = t.b / 255,
    i = Math.min(n, e, r),
    o = Math.max(n, e, r),
    s = NaN,
    c = o - i,
    a = (o + i) / 2;
  return (
    c
      ? (n === o
          ? (s = (e - r) / c + (e < r) * 6)
          : e === o
          ? (s = (r - n) / c + 2)
          : (s = (n - e) / c + 4),
        (c /= a < 0.5 ? o + i : 2 - o - i),
        (s *= 60))
      : (c = a > 0 && a < 1 ? 0 : s),
    new N(s, c, a, t.opacity)
  );
}
function fi(t, n, e, r) {
  return arguments.length === 1 ? Vn(t) : new N(t, n, e, r ?? 1);
}
function N(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Wt(
  N,
  fi,
  Yn(lt, {
    brighter(t) {
      return (
        (t = t == null ? bt : Math.pow(bt, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? it : Math.pow(it, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new x(
        Mt(t >= 240 ? t - 240 : t + 120, i, r),
        Mt(t, i, r),
        Mt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new N(bn(this.h), dt(this.s), dt(this.l), Et(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const t = Et(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${bn(this.h)}, ${
        dt(this.s) * 100
      }%, ${dt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function bn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function dt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Mt(t, n, e) {
  return (
    (t < 60
      ? n + ((e - n) * t) / 60
      : t < 180
      ? e
      : t < 240
      ? n + ((e - n) * (240 - t)) / 60
      : n) * 255
  );
}
const zn = (t) => () => t;
function hi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function di(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function pi(t) {
  return (t = +t) == 1
    ? Un
    : function (n, e) {
        return e - n ? di(n, e, t) : zn(isNaN(n) ? e : n);
      };
}
function Un(t, n) {
  var e = n - t;
  return e ? hi(t, e) : zn(isNaN(t) ? n : t);
}
const En = (function t(n) {
  var e = pi(n);
  function r(i, o) {
    var s = e((i = Gt(i)).r, (o = Gt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Un(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function O(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Bt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Lt = new RegExp(Bt.source, "g");
function gi(t) {
  return function () {
    return t;
  };
}
function mi(t) {
  return function (n) {
    return t(n) + "";
  };
}
function _i(t, n) {
  var e = (Bt.lastIndex = Lt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Bt.exec(t)) && (i = Lt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: O(r, i) })),
      (e = Lt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? mi(a[0].x)
        : gi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var $n = 180 / Math.PI,
  Xt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Kn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * $n,
      skewX: Math.atan(a) * $n,
      scaleX: s,
      scaleY: c,
    }
  );
}
var pt;
function yi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Xt : Kn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function wi(t) {
  return t == null ||
    (pt || (pt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    pt.setAttribute("transform", t),
    !(t = pt.transform.baseVal.consolidate()))
    ? Xt
    : ((t = t.matrix), Kn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Wn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var _ = p.push("translate(", null, n, null, e);
      m.push({ i: _ - 4, x: O(l, h) }, { i: _ - 2, x: O(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: O(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: O(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var _ = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: O(l, h) }, { i: _ - 2, x: O(u, f) });
    } else (h !== 1 || f !== 1) && p.push(i(p) + "scale(" + h + "," + f + ")");
  }
  return function (l, u) {
    var h = [],
      f = [];
    return (
      (l = t(l)),
      (u = t(u)),
      o(l.translateX, l.translateY, u.translateX, u.translateY, h, f),
      s(l.rotate, u.rotate, h, f),
      c(l.skewX, u.skewX, h, f),
      a(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f),
      (l = u = null),
      function (p) {
        for (var m = -1, _ = f.length, $; ++m < _; ) h[($ = f[m]).i] = $.x(p);
        return h.join("");
      }
    );
  };
}
var xi = Wn(yi, "px, ", "px)", "deg)"),
  vi = Wn(wi, ", ", ")", ")"),
  J = 0,
  tt = 0,
  j = 0,
  Zn = 1e3,
  $t,
  nt,
  Nt = 0,
  V = 0,
  kt = 0,
  ct = typeof performance == "object" && performance.now ? performance : Date,
  Qn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Zt() {
  return V || (Qn(bi), (V = ct.now() + kt));
}
function bi() {
  V = 0;
}
function It() {
  this._call = this._time = this._next = null;
}
It.prototype = Jn.prototype = {
  constructor: It,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Zt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        nt !== this &&
        (nt ? (nt._next = this) : ($t = this), (nt = this)),
      (this._call = t),
      (this._time = e),
      Ht();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Ht());
  },
};
function Jn(t, n, e) {
  var r = new It();
  return r.restart(t, n, e), r;
}
function Ei() {
  Zt(), ++J;
  for (var t = $t, n; t; )
    (n = V - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --J;
}
function Nn() {
  (V = (Nt = ct.now()) + kt), (J = tt = 0);
  try {
    Ei();
  } finally {
    (J = 0), Ni(), (V = 0);
  }
}
function $i() {
  var t = ct.now(),
    n = t - Nt;
  n > Zn && ((kt -= n), (Nt = t));
}
function Ni() {
  for (var t, n = $t, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : ($t = e)));
  (nt = t), Ht(r);
}
function Ht(t) {
  if (!J) {
    tt && (tt = clearTimeout(tt));
    var n = t - V;
    n > 24
      ? (t < 1 / 0 && (tt = setTimeout(Nn, t - ct.now() - kt)),
        j && (j = clearInterval(j)))
      : (j || ((Nt = ct.now()), (j = setInterval($i, Zn))), (J = 1), Qn(Nn));
  }
}
function In(t, n, e) {
  var r = new It();
  return (
    (n = n == null ? 0 : +n),
    r.restart(
      (i) => {
        r.stop(), t(i + n);
      },
      n,
      e
    ),
    r
  );
}
var Ii = zt("start", "end", "cancel", "interrupt"),
  Ci = [],
  jn = 0,
  Cn = 1,
  qt = 2,
  wt = 3,
  kn = 4,
  Ft = 5,
  xt = 6;
function Pt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  ki(t, e, {
    name: n,
    index: r,
    group: i,
    on: Ii,
    tween: Ci,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: jn,
  });
}
function Qt(t, n) {
  var e = I(t, n);
  if (e.state > jn) throw new Error("too late; already scheduled");
  return e;
}
function S(t, n) {
  var e = I(t, n);
  if (e.state > wt) throw new Error("too late; already running");
  return e;
}
function I(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function ki(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Jn(o, 0, e.time));
  function o(l) {
    (e.state = Cn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== Cn) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === wt) return In(s);
        p.state === kn
          ? ((p.state = xt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = xt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (In(function () {
        e.state === wt &&
          ((e.state = kn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = qt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === qt)
    ) {
      for (
        e.state = wt, i = new Array((f = e.tween.length)), u = 0, h = -1;
        u < f;
        ++u
      )
        (p = e.tween[u].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++h] = p);
      i.length = h + 1;
    }
  }
  function c(l) {
    for (
      var u =
          l < e.duration
            ? e.ease.call(null, l / e.duration)
            : (e.timer.restart(a), (e.state = Ft), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Ft && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = xt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Pi(t, n) {
  var e = t.__transition,
    r,
    i,
    o = !0,
    s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      (i = r.state > qt && r.state < Ft),
        (r.state = xt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Ai(t) {
  return this.each(function () {
    Pi(this, t);
  });
}
function Ti(t, n) {
  var e, r;
  return function () {
    var i = S(this, t),
      o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, c = r.length; s < c; ++s)
        if (r[s].name === n) {
          (r = r.slice()), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Si(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = S(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, a = 0, l = i.length; a < l; ++a)
        if (i[a].name === n) {
          i[a] = c;
          break;
        }
      a === l && i.push(c);
    }
    o.tween = i;
  };
}
function Mi(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = I(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Ti : Si)(e, t, n));
}
function Jt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = S(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return I(i, r).value[n];
    }
  );
}
function te(t, n) {
  var e;
  return (
    typeof n == "number"
      ? O
      : n instanceof st
      ? En
      : (e = st(n))
      ? ((n = e), En)
      : _i
  )(t, n);
}
function Li(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ri(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Di(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Oi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Gi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttribute(t)
      : ((s = this.getAttribute(t)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Bi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((s = this.getAttributeNS(t.space, t.local)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Xi(t, n) {
  var e = Ct(t),
    r = e === "transform" ? vi : te;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Bi : Gi)(e, r, Jt(this, "attr." + t, n))
      : n == null
      ? (e.local ? Ri : Li)(e)
      : (e.local ? Oi : Di)(e, r, n)
  );
}
function Hi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function qi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Fi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && qi(t, o)), e;
  }
  return (i._value = n), i;
}
function Yi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Hi(t, o)), e;
  }
  return (i._value = n), i;
}
function Vi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Ct(t);
  return this.tween(e, (r.local ? Fi : Yi)(r, n));
}
function zi(t, n) {
  return function () {
    Qt(this, t).delay = +n.apply(this, arguments);
  };
}
function Ui(t, n) {
  return (
    (n = +n),
    function () {
      Qt(this, t).delay = n;
    }
  );
}
function Ki(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? zi : Ui)(n, t))
    : I(this.node(), n).delay;
}
function Wi(t, n) {
  return function () {
    S(this, t).duration = +n.apply(this, arguments);
  };
}
function Zi(t, n) {
  return (
    (n = +n),
    function () {
      S(this, t).duration = n;
    }
  );
}
function Qi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Wi : Zi)(n, t))
    : I(this.node(), n).duration;
}
function Ji(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    S(this, t).ease = n;
  };
}
function ji(t) {
  var n = this._id;
  return arguments.length ? this.each(Ji(n, t)) : I(this.node(), n).ease;
}
function to(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    S(this, t).ease = e;
  };
}
function no(t) {
  if (typeof t != "function") throw new Error();
  return this.each(to(this._id, t));
}
function eo(t) {
  typeof t != "function" && (t = Ln(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new R(r, this._parents, this._name, this._id);
}
function ro(t) {
  if (t._id !== this._id) throw new Error();
  for (
    var n = this._groups,
      e = t._groups,
      r = n.length,
      i = e.length,
      o = Math.min(r, i),
      s = new Array(r),
      c = 0;
    c < o;
    ++c
  )
    for (
      var a = n[c], l = e[c], u = a.length, h = (s[c] = new Array(u)), f, p = 0;
      p < u;
      ++p
    )
      (f = a[p] || l[p]) && (h[p] = f);
  for (; c < r; ++c) s[c] = n[c];
  return new R(s, this._parents, this._name, this._id);
}
function io(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function oo(t, n, e) {
  var r,
    i,
    o = io(n) ? Qt : S;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function so(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? I(this.node(), e).on.on(t)
    : this.each(oo(e, t, n));
}
function co(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function ao() {
  return this.on("end.remove", co(this._id));
}
function lo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Ut(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], a = c.length, l = (o[s] = new Array(a)), u, h, f = 0;
      f < a;
      ++f
    )
      (u = c[f]) &&
        (h = t.call(u, u.__data__, f, c)) &&
        ("__data__" in u && (h.__data__ = u.__data__),
        (l[f] = h),
        Pt(l[f], n, e, f, l, I(u, e)));
  return new R(o, this._parents, n, e);
}
function uo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Mn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            m = I(u, e),
            _ = 0,
            $ = f.length;
          _ < $;
          ++_
        )
          (p = f[_]) && Pt(p, n, e, _, f, m);
        o.push(f), s.push(u);
      }
  return new R(o, s, n, e);
}
var fo = at.prototype.constructor;
function ho() {
  return new fo(this._groups, this._parents);
}
function po(t, n) {
  var e, r, i;
  return function () {
    var o = Q(this, t),
      s = (this.style.removeProperty(t), Q(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function ne(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function go(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = Q(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function mo(t, n, e) {
  var r, i, o;
  return function () {
    var s = Q(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), Q(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function _o(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = S(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = ne(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function yo(t, n, e) {
  var r = (t += "") == "transform" ? xi : te;
  return n == null
    ? this.styleTween(t, po(t, r)).on("end.style." + t, ne(t))
    : typeof n == "function"
    ? this.styleTween(t, mo(t, r, Jt(this, "style." + t, n))).each(
        _o(this._id, t)
      )
    : this.styleTween(t, go(t, r, n), e).on("end.style." + t, null);
}
function wo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function xo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && wo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function vo(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, xo(t, n, e ?? ""));
}
function bo(t) {
  return function () {
    this.textContent = t;
  };
}
function Eo(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function $o(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Eo(Jt(this, "text", t))
      : bo(t == null ? "" : t + "")
  );
}
function No(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Io(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && No(i)), n;
  }
  return (r._value = t), r;
}
function Co(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Io(t));
}
function ko() {
  for (
    var t = this._name,
      n = this._id,
      e = ee(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = I(a, n);
        Pt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new R(r, this._parents, t, e);
}
function Po() {
  var t,
    n,
    e = this,
    r = e._id,
    i = e.size();
  return new Promise(function (o, s) {
    var c = { value: s },
      a = {
        value: function () {
          --i === 0 && o();
        },
      };
    e.each(function () {
      var l = S(this, r),
        u = l.on;
      u !== t &&
        ((n = (t = u).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (l.on = n);
    }),
      i === 0 && o();
  });
}
var Ao = 0;
function R(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function ee() {
  return ++Ao;
}
var M = at.prototype;
R.prototype = {
  constructor: R,
  select: lo,
  selectAll: uo,
  selectChild: M.selectChild,
  selectChildren: M.selectChildren,
  filter: eo,
  merge: ro,
  selection: ho,
  transition: ko,
  call: M.call,
  nodes: M.nodes,
  node: M.node,
  size: M.size,
  empty: M.empty,
  each: M.each,
  on: so,
  attr: Xi,
  attrTween: Vi,
  style: yo,
  styleTween: vo,
  text: $o,
  textTween: Co,
  remove: ao,
  tween: Mi,
  delay: Ki,
  duration: Qi,
  ease: ji,
  easeVarying: no,
  end: Po,
  [Symbol.iterator]: M[Symbol.iterator],
};
function To(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var So = { time: null, delay: 0, duration: 250, ease: To };
function Mo(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Lo(t) {
  var n, e;
  t instanceof R
    ? ((n = t._id), (t = t._name))
    : ((n = ee()), ((e = So).time = Zt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Pt(a, t, n, l, s, e || Mo(a, n));
  return new R(r, this._parents, t, n);
}
at.prototype.interrupt = Ai;
at.prototype.transition = Lo;
const Yt = Math.PI,
  Vt = 2 * Yt,
  H = 1e-6,
  Ro = Vt - H;
function re(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Do(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return re;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Oo {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? re : Do(n));
  }
  moveTo(n, e) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(n, e) {
    this._append`L${(this._x1 = +n)},${(this._y1 = +e)}`;
  }
  quadraticCurveTo(n, e, r, i) {
    this._append`Q${+n},${+e},${(this._x1 = +r)},${(this._y1 = +i)}`;
  }
  bezierCurveTo(n, e, r, i, o, s) {
    this._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 =
      +s)}`;
  }
  arcTo(n, e, r, i, o) {
    if (((n = +n), (e = +e), (r = +r), (i = +i), (o = +o), o < 0))
      throw new Error(`negative radius: ${o}`);
    let s = this._x1,
      c = this._y1,
      a = r - n,
      l = i - e,
      u = s - n,
      h = c - e,
      f = u * u + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (f > H)
      if (!(Math.abs(h * a - l * u) > H) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          m = i - c,
          _ = a * a + l * l,
          $ = p * p + m * m,
          z = Math.sqrt(_),
          C = Math.sqrt(f),
          k = o * Math.tan((Yt - Math.acos((_ + f - $) / (2 * z * C))) / 2),
          d = k / C,
          g = k / z;
        Math.abs(d - 1) > H && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * m)},${(this._x1 =
            n + g * a)},${(this._y1 = e + g * l)}`;
      }
  }
  arc(n, e, r, i, o, s) {
    if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let c = r * Math.cos(i),
      a = r * Math.sin(i),
      l = n + c,
      u = e + a,
      h = 1 ^ s,
      f = s ? i - o : o - i;
    this._x1 === null
      ? this._append`M${l},${u}`
      : (Math.abs(this._x1 - l) > H || Math.abs(this._y1 - u) > H) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Vt) + Vt),
        f > Ro
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > H &&
            this._append`A${r},${r},0,${+(f >= Yt)},${h},${(this._x1 =
              n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`);
  }
  rect(n, e, r, i) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 =
      +e)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Go(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Bo(t, n) {
  return fetch(t, n).then(Go);
}
function Xo(t) {
  return (n, e) => Bo(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Ho = Xo("application/xml");
function et(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
et.prototype = {
  constructor: et,
  scale: function (t) {
    return t === 1 ? this : new et(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new et(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function (t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function (t) {
    return t * this.k + this.x;
  },
  applyY: function (t) {
    return t * this.k + this.y;
  },
  invert: function (t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function (t) {
    return (t - this.x) / this.k;
  },
  invertY: function (t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function (t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function (t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  },
};
et.prototype;
class jt {
  constructor(n, e, r, i, o, s, c) {
    fn(this, "dragged", (n) => {
      this.sensor.attr(
        "transform",
        "translate(" +
          [n.sourceEvent.offsetX, n.sourceEvent.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      );
    });
    (this.id = n),
      (this.svgContainer = e),
      (this.url = r),
      this.sensor,
      (this.scale = i),
      (this.offsetX = s),
      (this.offsetY = c),
      (this.movable = o),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale);
  }
  async load() {
    if (L("#" + this.id).node() != null) return;
    const n = await Ho(this.url);
    (this.sensor = this.svgContainer
      .append("g")
      .attr(
        "transform",
        "translate(" +
          [this.offsetX, this.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      )
      .attr("id", this.id)),
      this.sensor.node().append(L(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          jr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    L(this).raise().classed("active", !0);
  }
  dragended(n) {
    L(this).classed("active", !1);
  }
}
const tn = [
    "connector0pin-0",
    "connector1pin-1",
    "connector2pin-3",
    "connector3pin-7",
    "connector4pin-4",
    "connector5pin-1",
    "connector6pin-1",
    "connector7pin-3",
    "connector8pin-0",
    "connector9pin-3",
    "connector10pin-2",
    "connector11pin-1",
    "connector12pin-7",
    "connector13pin-5",
    "connector14pin-6",
    "connector15pin-5",
    "connector16pin-4",
    "connector17pin-2",
    "connector18pin-2",
    "connector19pin-1",
    "connector20pin-7",
    "connector21pin-2",
    "connector22pin-4",
    "connector23pin-1",
    "connector24pin-6",
    "connector25pin-5",
    "connector26pin-7",
    "connector27pin-8",
    "connector28pin-5",
    "connector29pin-9",
    "connector30pin-2",
    "connector31pin-7",
    "connector32pin-3",
    "connector33pin-6",
    "connector34pin-4",
    "connector35pin-7",
    "connector36pin-9",
    "connector37pin-7",
    "connector38pin-2",
    "connector39pin-2",
    "_x30_.1.0.220.2.3-0",
    "_x30_.1.0.221.0.5.13-6",
    "_x30_.1.0.224.0.10_1_-3",
    "_x30_.1.0.223.0.0.1.12-2",
    "_x30_.1.0.224.0.10-7",
    "_x30_.1.0.226.0.1",
    "_x30_.1.0.227.1",
  ],
  G = {
    "connector0pin-0": "3.3v",
    "connector1pin-1": "GPIO 2",
    "connector2pin-3": "GPIO 3",
    "connector3pin-7": "GPIO 4",
    "connector4pin-4": "GND",
    "connector5pin-1": "GPIO 17",
    "connector6pin-1": "GPIO 27",
    "connector7pin-3": "GPIO 22",
    "connector8pin-0": "3.3v",
    "connector9pin-3": "GPIO 10",
    "connector10pin-2": "GPIO 9",
    "connector11pin-1": "GPIO 11",
    "connector12pin-7": "GND",
    "connector13pin-5": "RESERVED",
    "connector14pin-6": "GPIO 5",
    "connector15pin-5": "GPIO 6",
    "connector16pin-4": "GPIO 13",
    "connector17pin-2": "GPIO 19",
    "connector18pin-2": "GPIO 26",
    "connector19pin-1": "GND",
    "connector20pin-7": "GPIO 21",
    "connector21pin-2": "GPIO 20",
    "connector22pin-4": "GPIO 16",
    "connector23pin-1": "GND",
    "connector24pin-6": "GPIO 12",
    "connector25pin-5": "GND",
    "connector26pin-7": "RESERVED",
    "connector27pin-8": "GPIO 7",
    "connector28pin-5": "GPIO 8",
    "connector29pin-9": "GPIO 25",
    "connector30pin-2": "GND",
    "connector31pin-7": "GPIO 24",
    "connector32pin-3": "GPIO 23",
    "connector33pin-6": "GND",
    "connector34pin-4": "GPIO 18",
    "connector35pin-7": "UART 0 RX",
    "connector36pin-9": "UART 0 TX",
    "connector37pin-7": "GND",
    "connector38pin-2": "5V PWR",
    "connector39pin-2": "5V PWR",
    "_x30_.1.0.220.2.3-0": "HDMI",
    "_x30_.1.0.221.0.5.13-6": "Power",
    "_x30_.1.0.223.0.0.1.12-2": "Ethernet",
    "_x30_.1.0.224.0.10-7": "USB 0",
    "_x30_.1.0.224.0.10_1_-3": "USB 1",
    "_x30_.1.0.226.0.1": "CSI Camera",
    "_x30_.1.0.227.1": "DSI Display",
  },
  ie = ["path26583", "path26585"],
  gt = { path26583: "+ve terminal of LED", path26585: "-ve terminal of LED" },
  qo = ["res_1", "res_2"],
  mt = { res_1: "Resistor", res_2: "Resistor" };
class Fo {
  constructor(n) {
    (this.logLocationId = n), (this.connections = []);
  }
  addConnection(n) {
    this.connections.push(n), this.logConnectionsToHtml();
  }
  undoLastConnection() {
    if (this.connections.length) {
      const n = this.connections.pop(),
        e = document.getElementById(this.logLocationId),
        r = e.lastChild;
      e.removeChild(r),
        this.logConnectionsToHtml(),
        console.log("Removed connection:", n);
    } else console.warn("No more connections to undo");
  }
  logConnectionsToHtml() {
    if (this.connections.length % 2 === 0) {
      let n = document.createElement("li");
      const e = G[this.connections[this.connections.length - 2].connector]
          ? `${
              G[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : mt[this.connections[this.connections.length - 2].connector]
          ? mt[this.connections[this.connections.length - 2].connector]
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = G[this.connections[this.connections.length - 1].connector]
          ? `${
              G[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : mt[this.connections[this.connections.length - 1].connector]
          ? mt[this.connections[this.connections.length - 1].connector]
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
          : this.connections[this.connections.length - 1].connector;
      (n.innerHTML = `Connection no. ${
        this.connections.length / 2
      } : ${e} to  ${r}`),
        document.getElementById(this.logLocationId).appendChild(n);
      return;
    }
  }
  getConnectionLog() {
    return this.connections;
  }
}
class Yo {
  constructor(n, e, r, i) {
    (this.id = n),
      (this.headingId = e),
      (this.textId = r),
      (this.closeButtonId = i),
      document
        .getElementById(this.closeButtonId)
        .addEventListener("click", () => {
          document.getElementById(this.id).style.display = "none";
        });
  }
  throw(n, e) {
    (document.getElementById(this.id).style.display = "flex"),
      (document.getElementById(this.headingId).innerHTML = n),
      (document.getElementById(this.textId).innerHTML = e);
  }
}
const Vo = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = ["GPIO", "GND", "res_1", "res_2", "path26583", "path26585"];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          e++;
          return;
        }
        if (G[r.connector] == "GND") {
          e++;
          return;
        }
        if (
          G[r.connector].includes("GPIO") &&
          G[r.connector].includes(document.querySelector("#ledPin").value)
        ) {
          e++;
          return;
        }
      }),
      e == 6
    );
  },
  T = L("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  zo = new jt("raspberry", T, "images/pi3dirk.svg", 1, !1),
  Uo = new jt(
    "resistorComponent",
    T,
    "images/resistor.svg",
    0.1,
    !1,
    300,
    250
  ),
  Pn = new jt("led", T, "images/led.svg", 0.3, !1, 400, 25),
  nn = T.append("g").attr("id", "pathsGroup"),
  en = {
    rasberryPi:
      "Raspberry Pi: Acts as the power source and controller. A GPIO pin is connected to the LED anode (positive leg) to supply voltage and control the LED’s on/off state programmatically. A GND pin is connected to the resistor’s other end to complete the circuit.",
    ledlight:
      "LED: Emits light when current flows through it. The anode (longer leg) is connected to a Raspberry Pi GPIO pin, while the cathode (shorter leg) is connected to a resistor to limit current.",
    resistor:
      "Resistor: Protects the LED by limiting current flow. One end is connected to the LED cathode, and the other end is connected to a Raspberry Pi GND pin",
  },
  rn = document.getElementById("rasberryPi"),
  on = document.getElementById("ledlight"),
  sn = document.getElementById("resistor"),
  X = document.getElementById("componentDescription"),
  oe = document.getElementById("displayInfo"),
  Ko = document.getElementById("codeSubmit"),
  Wo = document.getElementById("undoButton"),
  K = document.getElementById("successMessage");
rn.addEventListener("click", async () => await zo.load());
sn.addEventListener("click", () => Uo.load());
on.addEventListener("click", () => {
  Pn.load().then(() => {
    const t = T.select(`#${Pn.id}`);
    t.select("#anode-label").style("display", "none"),
      t.select("#cathode-label").style("display", "none");
    const n = t.select("#path26583"),
      e = t.select("#path26585");
    n
      .on("mouseover", () => {
        t.select("#anode-label").style("display", "block"),
          t.select("#cathode-label").style("display", "block");
      })
      .on("mouseout", () => {
        t.select("#anode-label").style("display", "none"),
          t.select("#cathode-label").style("display", "none");
      }),
      e
        .on("mouseover", () => {
          t.select("#anode-label").style("display", "block"),
            t.select("#cathode-label").style("display", "block");
        })
        .on("mouseout", () => {
          t.select("#anode-label").style("display", "none"),
            t.select("#cathode-label").style("display", "none");
        });
  });
});
rn.addEventListener("mouseover", () => {
  (X.textContent = en.rasberryPi), (X.style.display = "block");
});
on.addEventListener("mouseover", () => {
  (X.textContent = en.ledlight), (X.style.display = "block");
});
sn.addEventListener("mouseover", () => {
  (X.textContent = en.resistor), (X.style.display = "block");
});
[rn, on, sn].forEach((t) => {
  t.addEventListener("mouseout", () => {
    (X.textContent = "Hover over a component to see its description."),
      (X.style.display = "none");
  });
});
const Rt = (t) =>
    tn.includes(t.srcElement.id) ||
    ie.includes(t.srcElement.id) ||
    qo.includes(t.srcElement.id),
  An = (t, n) => {
    nn.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  };
let E;
const B = new Fo("connectionLog"),
  _t = new Yo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let q = 0;
const Zo = (t) => {
    nn.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  Qo = () => {
    if (E) {
      nn
        .selectAll(`path[id^="path${q}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        (E = null),
        (q = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (B.connections.length > 0) {
      const n = B.connections[B.connections.length - 1].lineID;
      Zo(n),
        B.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
Wo.addEventListener("click", () => {
  B.undoLastConnection(), Qo();
});
T.on("dblclick", (t) => {
  if (Rt(t) && !E) {
    (E = new Oo()),
      E.moveTo(t.offsetX, t.offsetY),
      B.addConnection({
        lineID: `path${q}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      T.style("cursor", "crosshair"),
      console.log("Path started");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !Rt(t)) {
    E &&
      (E.lineTo(t.offsetX, t.offsetY),
      An(E.toString(), `path${q}`),
      console.log("Path segment added"));
    return;
  }
  if (Rt(t) && E) {
    E.lineTo(t.offsetX, t.offsetY),
      An(E.toString(), `path${q}`),
      B.addConnection({
        lineID: `path${q}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      q++,
      T.style("cursor", "default"),
      (E = null),
      console.log("Path completed");
    return;
  }
});
T.on("mouseover", (t) => {
  tn.includes(t.srcElement.id) && (oe.innerHTML = G[t.srcElement.id]);
});
T.on("mouseout", (t) => {
  (tn.includes(t.srcElement.id) || ie.includes(t.srcElement.id)) &&
    (oe.innerHTML = "CONNECTOR INFO");
});
const Tn = (t) => new Promise((n) => setTimeout(() => n(), t)),
  Jo = async (t, n, e, r) => {
    const i = document.querySelector(t),
      o = i.getAttribute("fill");
    for (;;)
      i.setAttribute("fill", r),
        await Tn(n),
        i.setAttribute("fill", o),
        await Tn(e);
  },
  jo = () => {
    (K.style.transform = `translate(${400}px, ${340}px)`),
      (K.textContent = "LED is blinking successfully!"),
      (K.style.display = "block"),
      K.classList.add("fade-in-scale"),
      setTimeout(() => {
        (K.style.display = "none"), K.classList.remove("fade-in-scale");
      }, 1e4);
  };
Ko.addEventListener("click", () => {
  const t = Vo(B.getConnectionLog()),
    n = document.querySelector("#blinkTime").value,
    e = document.querySelector("#waitTime").value,
    r = document.querySelector("#ledColor").value;
  if (n === "" || e === "") {
    _t.throw("Error", "Please enter the blink time and wait time");
    return;
  }
  const i = parseInt(n),
    o = parseInt(e);
  if (isNaN(i) || isNaN(o) || i <= 0 || o <= 0) {
    _t.throw("Error", "Blink time and wait time must be positive numbers");
    return;
  }
  if (t === !0) {
    const s = i * 1e3,
      c = o * 1e3;
    Jo("#ledLight", s, c, r),
      jo(),
      document.querySelector("#my-drawer-4").click();
  } else
    t.error
      ? _t.throw("Error", t.error)
      : _t.throw("Error", "Please connect the components properly.");
});
