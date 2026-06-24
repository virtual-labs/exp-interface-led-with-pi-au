var de = Object.defineProperty;
var pe = (t, n, e) =>
  n in t
    ? de(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var fn = (t, n, e) => (pe(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var ge = { value: () => {} };
function Kt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new xt(e);
}
function xt(t) {
  this._ = t;
}
function me(t, n) {
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
xt.prototype = Kt.prototype = {
  constructor: xt,
  on: function (t, n) {
    var e = this._,
      r = me(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = ye(e[i], t.name))) return i;
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
    return new xt(t);
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
function ye(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function hn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      ((t[r] = ge), (t = t.slice(0, r).concat(t.slice(r + 1))));
      break;
    }
  return (e != null && t.push({ name: n, value: e }), t);
}
var Bt = "http://www.w3.org/1999/xhtml";
const dn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Bt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function At(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    dn.hasOwnProperty(n) ? { space: dn[n], local: t } : t
  );
}
function _e(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Bt && n.documentElement.namespaceURI === Bt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function we(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ln(t) {
  var n = At(t);
  return (n.local ? we : _e)(n);
}
function xe() {}
function Zt(t) {
  return t == null
    ? xe
    : function () {
        return this.querySelector(t);
      };
}
function ve(t) {
  typeof t != "function" && (t = Zt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new E(r, this._parents);
}
function be(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ee() {
  return [];
}
function Rn(t) {
  return t == null
    ? Ee
    : function () {
        return this.querySelectorAll(t);
      };
}
function $e(t) {
  return function () {
    return be(t.apply(this, arguments));
  };
}
function ke(t) {
  typeof t == "function" ? (t = $e(t)) : (t = Rn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new E(r, i);
}
function Dn(t) {
  return function () {
    return this.matches(t);
  };
}
function On(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Ne = Array.prototype.find;
function Ie(t) {
  return function () {
    return Ne.call(this.children, t);
  };
}
function Ce() {
  return this.firstElementChild;
}
function Pe(t) {
  return this.select(t == null ? Ce : Ie(typeof t == "function" ? t : On(t)));
}
var Ae = Array.prototype.filter;
function Te() {
  return Array.from(this.children);
}
function Me(t) {
  return function () {
    return Ae.call(this.children, t);
  };
}
function Se(t) {
  return this.selectAll(
    t == null ? Te : Me(typeof t == "function" ? t : On(t)),
  );
}
function Le(t) {
  typeof t != "function" && (t = Dn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new E(r, this._parents);
}
function Gn(t) {
  return new Array(t.length);
}
function Re() {
  return new E(this._enter || this._groups.map(Gn), this._parents);
}
function Et(t, n) {
  ((this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n));
}
Et.prototype = {
  constructor: Et,
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
function De(t) {
  return function () {
    return t;
  };
}
function Oe(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new Et(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Ge(t, n, e, r, i, o, s) {
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
    ((p = s.call(t, o[c], c, o) + ""),
      (a = l.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), l.delete(p))
        : (e[c] = new Et(t, o[c])));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Be(t) {
  return t.__data__;
}
function He(t, n) {
  if (!arguments.length) return Array.from(this, Be);
  var e = n ? Ge : Oe,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = De(t));
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
      p = Xe(t.call(u, u && u.__data__, l, r)),
      m = p.length,
      y = (c[l] = new Array(m)),
      I = (s[l] = new Array(m)),
      U = (a[l] = new Array(f));
    e(u, h, y, I, U, p, n);
    for (var A = 0, T = 0, d, g; A < m; ++A)
      if ((d = y[A])) {
        for (A >= T && (T = A + 1); !(g = I[T]) && ++T < m; );
        d._next = g || null;
      }
  }
  return ((s = new E(s, r)), (s._enter = c), (s._exit = a), s);
}
function Xe(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function qe() {
  return new E(this._exit || this._groups.map(Gn), this._parents);
}
function Fe(t, n, e) {
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
function Ye(t) {
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
  return new E(c, this._parents);
}
function Ve() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function ze(t) {
  t || (t = Ue);
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
  return new E(i, this._parents).order();
}
function Ue(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function We() {
  var t = arguments[0];
  return ((arguments[0] = this), t.apply(null, arguments), this);
}
function Ke() {
  return Array.from(this);
}
function Ze() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Qe() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Je() {
  return !this.node();
}
function je(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function tr(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function nr(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function er(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function rr(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function ir(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function or(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function sr(t, n) {
  var e = At(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? nr
        : tr
      : typeof n == "function"
        ? e.local
          ? or
          : ir
        : e.local
          ? rr
          : er)(e, n),
  );
}
function Bn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function cr(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function ar(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function lr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function ur(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? cr : typeof n == "function" ? lr : ar)(t, n, e ?? ""),
      )
    : J(this.node(), t);
}
function J(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Bn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function fr(t) {
  return function () {
    delete this[t];
  };
}
function hr(t, n) {
  return function () {
    this[t] = n;
  };
}
function dr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function pr(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? fr : typeof n == "function" ? dr : hr)(t, n))
    : this.node()[t];
}
function Hn(t) {
  return t.trim().split(/^|\s+/);
}
function Qt(t) {
  return t.classList || new Xn(t);
}
function Xn(t) {
  ((this._node = t), (this._names = Hn(t.getAttribute("class") || "")));
}
Xn.prototype = {
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
function qn(t, n) {
  for (var e = Qt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Fn(t, n) {
  for (var e = Qt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function gr(t) {
  return function () {
    qn(this, t);
  };
}
function mr(t) {
  return function () {
    Fn(this, t);
  };
}
function yr(t, n) {
  return function () {
    (n.apply(this, arguments) ? qn : Fn)(this, t);
  };
}
function _r(t, n) {
  var e = Hn(t + "");
  if (arguments.length < 2) {
    for (var r = Qt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? yr : n ? gr : mr)(e, n));
}
function wr() {
  this.textContent = "";
}
function xr(t) {
  return function () {
    this.textContent = t;
  };
}
function vr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function br(t) {
  return arguments.length
    ? this.each(t == null ? wr : (typeof t == "function" ? vr : xr)(t))
    : this.node().textContent;
}
function Er() {
  this.innerHTML = "";
}
function $r(t) {
  return function () {
    this.innerHTML = t;
  };
}
function kr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Nr(t) {
  return arguments.length
    ? this.each(t == null ? Er : (typeof t == "function" ? kr : $r)(t))
    : this.node().innerHTML;
}
function Ir() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Cr() {
  return this.each(Ir);
}
function Pr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ar() {
  return this.each(Pr);
}
function Tr(t) {
  var n = typeof t == "function" ? t : Ln(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Mr() {
  return null;
}
function Sr(t, n) {
  var e = typeof t == "function" ? t : Ln(t),
    r = n == null ? Mr : typeof n == "function" ? n : Zt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null,
    );
  });
}
function Lr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Rr() {
  return this.each(Lr);
}
function Dr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Or() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Gr(t) {
  return this.select(t ? Or : Dr);
}
function Br(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Hr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Xr(t) {
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
function qr(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        ((o = n[e]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++r] = o));
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function Fr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Hr(n);
    if (r) {
      for (var s = 0, c = r.length; s < c; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          (this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = e)),
            (i.value = n));
          return;
        }
    }
    (this.addEventListener(t.type, o, e),
      (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
      r ? r.push(i) : (this.__on = [i]));
  };
}
function Yr(t, n, e) {
  var r = Xr(t + ""),
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
  for (c = n ? Fr : qr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Yn(t, n, e) {
  var r = Bn(t),
    i = r.CustomEvent;
  (typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i));
}
function Vr(t, n) {
  return function () {
    return Yn(this, t, n);
  };
}
function zr(t, n) {
  return function () {
    return Yn(this, t, n.apply(this, arguments));
  };
}
function Ur(t, n) {
  return this.each((typeof n == "function" ? zr : Vr)(t, n));
}
function* Wr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Vn = [null];
function E(t, n) {
  ((this._groups = t), (this._parents = n));
}
function lt() {
  return new E([[document.documentElement]], Vn);
}
function Kr() {
  return this;
}
E.prototype = lt.prototype = {
  constructor: E,
  select: ve,
  selectAll: ke,
  selectChild: Pe,
  selectChildren: Se,
  filter: Le,
  data: He,
  enter: Re,
  exit: qe,
  join: Fe,
  merge: Ye,
  selection: Kr,
  order: Ve,
  sort: ze,
  call: We,
  nodes: Ke,
  node: Ze,
  size: Qe,
  empty: Je,
  each: je,
  attr: sr,
  style: ur,
  property: pr,
  classed: _r,
  text: br,
  html: Nr,
  raise: Cr,
  lower: Ar,
  append: Tr,
  insert: Sr,
  remove: Rr,
  clone: Gr,
  datum: Br,
  on: Yr,
  dispatch: Ur,
  [Symbol.iterator]: Wr,
};
function b(t) {
  return typeof t == "string"
    ? new E([[document.querySelector(t)]], [document.documentElement])
    : new E([[t]], Vn);
}
function Zr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function pn(t, n) {
  if (((t = Zr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Qr = { passive: !1 },
  it = { capture: !0, passive: !1 };
function Rt(t) {
  t.stopImmediatePropagation();
}
function Z(t) {
  (t.preventDefault(), t.stopImmediatePropagation());
}
function Jr(t) {
  var n = t.document.documentElement,
    e = b(t).on("dragstart.drag", Z, it);
  "onselectstart" in n
    ? e.on("selectstart.drag", Z, it)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function jr(t, n) {
  var e = t.document.documentElement,
    r = b(t).on("dragstart.drag", null);
  (n &&
    (r.on("click.drag", Z, it),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect));
}
const ht = (t) => () => t;
function Ht(
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
  },
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
Ht.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function ti(t) {
  return !t.ctrlKey && !t.button;
}
function ni() {
  return this.parentNode;
}
function ei(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function ri() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ii() {
  var t = ti,
    n = ni,
    e = ei,
    r = ri,
    i = {},
    o = Kt("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", I)
      .on("touchmove.drag", U, Qr)
      .on("touchend.drag touchcancel.drag", A)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var _ = T(this, n.call(this, d, g), d, g, "mouse");
      _ &&
        (b(d.view).on("mousemove.drag", m, it).on("mouseup.drag", y, it),
        Jr(d.view),
        Rt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        _("start", d));
    }
  }
  function m(d) {
    if ((Z(d), !l)) {
      var g = d.clientX - c,
        _ = d.clientY - a;
      l = g * g + _ * _ > h;
    }
    i.mouse("drag", d);
  }
  function y(d) {
    (b(d.view).on("mousemove.drag mouseup.drag", null),
      jr(d.view, l),
      Z(d),
      i.mouse("end", d));
  }
  function I(d, g) {
    if (t.call(this, d, g)) {
      var _ = d.changedTouches,
        w = n.call(this, d, g),
        $ = _.length,
        B,
        W;
      for (B = 0; B < $; ++B)
        (W = T(this, w, d, g, _[B].identifier, _[B])) &&
          (Rt(d), W("start", d, _[B]));
    }
  }
  function U(d) {
    var g = d.changedTouches,
      _ = g.length,
      w,
      $;
    for (w = 0; w < _; ++w)
      ($ = i[g[w].identifier]) && (Z(d), $("drag", d, g[w]));
  }
  function A(d) {
    var g = d.changedTouches,
      _ = g.length,
      w,
      $;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        w = 0;
      w < _;
      ++w
    )
      ($ = i[g[w].identifier]) && (Rt(d), $("end", d, g[w]));
  }
  function T(d, g, _, w, $, B) {
    var W = o.copy(),
      M = pn(B || _, g),
      cn,
      an,
      ft;
    if (
      (ft = e.call(
        d,
        new Ht("beforestart", {
          sourceEvent: _,
          target: f,
          identifier: $,
          active: s,
          x: M[0],
          y: M[1],
          dx: 0,
          dy: 0,
          dispatch: W,
        }),
        w,
      )) != null
    )
      return (
        (cn = ft.x - M[0] || 0),
        (an = ft.y - M[1] || 0),
        function fe(St, ln, he) {
          var un = M,
            Lt;
          switch (St) {
            case "start":
              ((i[$] = fe), (Lt = s++));
              break;
            case "end":
              (delete i[$], --s);
            case "drag":
              ((M = pn(he || ln, g)), (Lt = s));
              break;
          }
          W.call(
            St,
            d,
            new Ht(St, {
              sourceEvent: ln,
              subject: ft,
              target: f,
              identifier: $,
              active: Lt,
              x: M[0] + cn,
              y: M[1] + an,
              dx: M[0] - un[0],
              dy: M[1] - un[1],
              dispatch: W,
            }),
            w,
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ht(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ht(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ht(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ht(!!d)), f)
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
function Jt(t, n, e) {
  ((t.prototype = n.prototype = e), (e.constructor = t));
}
function zn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function ut() {}
var ot = 0.7,
  $t = 1 / ot,
  Q = "\\s*([+-]?\\d+)\\s*",
  st = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  S = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  oi = /^#([0-9a-f]{3,8})$/,
  si = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`),
  ci = new RegExp(`^rgb\\(${S},${S},${S}\\)$`),
  ai = new RegExp(`^rgba\\(${Q},${Q},${Q},${st}\\)$`),
  li = new RegExp(`^rgba\\(${S},${S},${S},${st}\\)$`),
  ui = new RegExp(`^hsl\\(${st},${S},${S}\\)$`),
  fi = new RegExp(`^hsla\\(${st},${S},${S},${st}\\)$`),
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
Jt(ut, ct, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: mn,
  formatHex: mn,
  formatHex8: hi,
  formatHsl: di,
  formatRgb: yn,
  toString: yn,
});
function mn() {
  return this.rgb().formatHex();
}
function hi() {
  return this.rgb().formatHex8();
}
function di() {
  return Un(this).formatHsl();
}
function yn() {
  return this.rgb().formatRgb();
}
function ct(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = oi.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? _n(n)
          : e === 3
            ? new v(
                ((n >> 8) & 15) | ((n >> 4) & 240),
                ((n >> 4) & 15) | (n & 240),
                ((n & 15) << 4) | (n & 15),
                1,
              )
            : e === 8
              ? dt(
                  (n >> 24) & 255,
                  (n >> 16) & 255,
                  (n >> 8) & 255,
                  (n & 255) / 255,
                )
              : e === 4
                ? dt(
                    ((n >> 12) & 15) | ((n >> 8) & 240),
                    ((n >> 8) & 15) | ((n >> 4) & 240),
                    ((n >> 4) & 15) | (n & 240),
                    (((n & 15) << 4) | (n & 15)) / 255,
                  )
                : null)
      : (n = si.exec(t))
        ? new v(n[1], n[2], n[3], 1)
        : (n = ci.exec(t))
          ? new v((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
          : (n = ai.exec(t))
            ? dt(n[1], n[2], n[3], n[4])
            : (n = li.exec(t))
              ? dt(
                  (n[1] * 255) / 100,
                  (n[2] * 255) / 100,
                  (n[3] * 255) / 100,
                  n[4],
                )
              : (n = ui.exec(t))
                ? vn(n[1], n[2] / 100, n[3] / 100, 1)
                : (n = fi.exec(t))
                  ? vn(n[1], n[2] / 100, n[3] / 100, n[4])
                  : gn.hasOwnProperty(t)
                    ? _n(gn[t])
                    : t === "transparent"
                      ? new v(NaN, NaN, NaN, 0)
                      : null
  );
}
function _n(t) {
  return new v((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function dt(t, n, e, r) {
  return (r <= 0 && (t = n = e = NaN), new v(t, n, e, r));
}
function pi(t) {
  return (
    t instanceof ut || (t = ct(t)),
    t ? ((t = t.rgb()), new v(t.r, t.g, t.b, t.opacity)) : new v()
  );
}
function Xt(t, n, e, r) {
  return arguments.length === 1 ? pi(t) : new v(t, n, e, r ?? 1);
}
function v(t, n, e, r) {
  ((this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r));
}
Jt(
  v,
  Xt,
  zn(ut, {
    brighter(t) {
      return (
        (t = t == null ? $t : Math.pow($t, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? ot : Math.pow(ot, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new v(Y(this.r), Y(this.g), Y(this.b), kt(this.opacity));
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
    formatHex8: gi,
    formatRgb: xn,
    toString: xn,
  }),
);
function wn() {
  return `#${F(this.r)}${F(this.g)}${F(this.b)}`;
}
function gi() {
  return `#${F(this.r)}${F(this.g)}${F(this.b)}${F((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function xn() {
  const t = kt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Y(this.r)}, ${Y(this.g)}, ${Y(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function kt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Y(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function F(t) {
  return ((t = Y(t)), (t < 16 ? "0" : "") + t.toString(16));
}
function vn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
        ? (t = n = NaN)
        : n <= 0 && (t = NaN),
    new C(t, n, e, r)
  );
}
function Un(t) {
  if (t instanceof C) return new C(t.h, t.s, t.l, t.opacity);
  if ((t instanceof ut || (t = ct(t)), !t)) return new C();
  if (t instanceof C) return t;
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
    new C(s, c, a, t.opacity)
  );
}
function mi(t, n, e, r) {
  return arguments.length === 1 ? Un(t) : new C(t, n, e, r ?? 1);
}
function C(t, n, e, r) {
  ((this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r));
}
Jt(
  C,
  mi,
  zn(ut, {
    brighter(t) {
      return (
        (t = t == null ? $t : Math.pow($t, t)),
        new C(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? ot : Math.pow(ot, t)),
        new C(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new v(
        Dt(t >= 240 ? t - 240 : t + 120, i, r),
        Dt(t, i, r),
        Dt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity,
      );
    },
    clamp() {
      return new C(bn(this.h), pt(this.s), pt(this.l), kt(this.opacity));
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
      const t = kt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${bn(this.h)}, ${pt(this.s) * 100}%, ${pt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  }),
);
function bn(t) {
  return ((t = (t || 0) % 360), t < 0 ? t + 360 : t);
}
function pt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Dt(t, n, e) {
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
const Wn = (t) => () => t;
function yi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function _i(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function wi(t) {
  return (t = +t) == 1
    ? Kn
    : function (n, e) {
        return e - n ? _i(n, e, t) : Wn(isNaN(n) ? e : n);
      };
}
function Kn(t, n) {
  var e = n - t;
  return e ? yi(t, e) : Wn(isNaN(t) ? n : t);
}
const En = (function t(n) {
  var e = wi(n);
  function r(i, o) {
    var s = e((i = Xt(i)).r, (o = Xt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Kn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)),
        (i.g = c(u)),
        (i.b = a(u)),
        (i.opacity = l(u)),
        i + ""
      );
    };
  }
  return ((r.gamma = t), r);
})(1);
function H(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var qt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Ot = new RegExp(qt.source, "g");
function xi(t) {
  return function () {
    return t;
  };
}
function vi(t) {
  return function (n) {
    return t(n) + "";
  };
}
function bi(t, n) {
  var e = (qt.lastIndex = Ot.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = qt.exec(t)) && (i = Ot.exec(n)); )
    ((o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: H(r, i) })),
      (e = Ot.lastIndex));
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? vi(a[0].x)
        : xi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var $n = 180 / Math.PI,
  Ft = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Zn(t, n, e, r, i, o) {
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
var gt;
function Ei(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + "",
  );
  return n.isIdentity ? Ft : Zn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function $i(t) {
  return t == null ||
    (gt || (gt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    gt.setAttribute("transform", t),
    !(t = gt.transform.baseVal.consolidate()))
    ? Ft
    : ((t = t.matrix), Zn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Qn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var y = p.push("translate(", null, n, null, e);
      m.push({ i: y - 4, x: H(l, h) }, { i: y - 2, x: H(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: H(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: H(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var y = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: y - 4, x: H(l, h) }, { i: y - 2, x: H(u, f) });
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
        for (var m = -1, y = f.length, I; ++m < y; ) h[(I = f[m]).i] = I.x(p);
        return h.join("");
      }
    );
  };
}
var ki = Qn(Ei, "px, ", "px)", "deg)"),
  Ni = Qn($i, ", ", ")", ")"),
  j = 0,
  nt = 0,
  tt = 0,
  Jn = 1e3,
  Nt,
  et,
  It = 0,
  V = 0,
  Tt = 0,
  at = typeof performance == "object" && performance.now ? performance : Date,
  jn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function jt() {
  return V || (jn(Ii), (V = at.now() + Tt));
}
function Ii() {
  V = 0;
}
function Ct() {
  this._call = this._time = this._next = null;
}
Ct.prototype = te.prototype = {
  constructor: Ct,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    ((e = (e == null ? jt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        et !== this &&
        (et ? (et._next = this) : (Nt = this), (et = this)),
      (this._call = t),
      (this._time = e),
      Yt());
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Yt());
  },
};
function te(t, n, e) {
  var r = new Ct();
  return (r.restart(t, n, e), r);
}
function Ci() {
  (jt(), ++j);
  for (var t = Nt, n; t; )
    ((n = V - t._time) >= 0 && t._call.call(void 0, n), (t = t._next));
  --j;
}
function kn() {
  ((V = (It = at.now()) + Tt), (j = nt = 0));
  try {
    Ci();
  } finally {
    ((j = 0), Ai(), (V = 0));
  }
}
function Pi() {
  var t = at.now(),
    n = t - It;
  n > Jn && ((Tt -= n), (It = t));
}
function Ai() {
  for (var t, n = Nt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Nt = e)));
  ((et = t), Yt(r));
}
function Yt(t) {
  if (!j) {
    nt && (nt = clearTimeout(nt));
    var n = t - V;
    n > 24
      ? (t < 1 / 0 && (nt = setTimeout(kn, t - at.now() - Tt)),
        tt && (tt = clearInterval(tt)))
      : (tt || ((It = at.now()), (tt = setInterval(Pi, Jn))), (j = 1), jn(kn));
  }
}
function Nn(t, n, e) {
  var r = new Ct();
  return (
    (n = n == null ? 0 : +n),
    r.restart(
      (i) => {
        (r.stop(), t(i + n));
      },
      n,
      e,
    ),
    r
  );
}
var Ti = Kt("start", "end", "cancel", "interrupt"),
  Mi = [],
  ne = 0,
  In = 1,
  Vt = 2,
  vt = 3,
  Cn = 4,
  zt = 5,
  bt = 6;
function Mt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Si(t, e, {
    name: n,
    index: r,
    group: i,
    on: Ti,
    tween: Mi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ne,
  });
}
function tn(t, n) {
  var e = P(t, n);
  if (e.state > ne) throw new Error("too late; already scheduled");
  return e;
}
function L(t, n) {
  var e = P(t, n);
  if (e.state > vt) throw new Error("too late; already running");
  return e;
}
function P(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Si(t, n, e) {
  var r = t.__transition,
    i;
  ((r[n] = e), (e.timer = te(o, 0, e.time)));
  function o(l) {
    ((e.state = In),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay));
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== In) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === vt) return Nn(s);
        p.state === Cn
          ? ((p.state = bt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = bt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (Nn(function () {
        e.state === vt &&
          ((e.state = Cn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Vt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Vt)
    ) {
      for (
        e.state = vt, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
            : (e.timer.restart(a), (e.state = zt), 1),
        h = -1,
        f = i.length;
      ++h < f;
    )
      i[h].call(t, u);
    e.state === zt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    ((e.state = bt), e.timer.stop(), delete r[n]);
    for (var l in r) return;
    delete t.__transition;
  }
}
function Li(t, n) {
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
      ((i = r.state > Vt && r.state < zt),
        (r.state = bt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s]);
    }
    o && delete t.__transition;
  }
}
function Ri(t) {
  return this.each(function () {
    Li(this, t);
  });
}
function Di(t, n) {
  var e, r;
  return function () {
    var i = L(this, t),
      o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, c = r.length; s < c; ++s)
        if (r[s].name === n) {
          ((r = r.slice()), r.splice(s, 1));
          break;
        }
    }
    i.tween = r;
  };
}
function Oi(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = L(this, t),
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
function Gi(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = P(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Di : Oi)(e, t, n));
}
function nn(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = L(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return P(i, r).value[n];
    }
  );
}
function ee(t, n) {
  var e;
  return (
    typeof n == "number"
      ? H
      : n instanceof ct
        ? En
        : (e = ct(n))
          ? ((n = e), En)
          : bi
  )(t, n);
}
function Bi(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Hi(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Xi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function qi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Fi(t, n, e) {
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
function Yi(t, n, e) {
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
function Vi(t, n) {
  var e = At(t),
    r = e === "transform" ? Ni : ee;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Yi : Fi)(e, r, nn(this, "attr." + t, n))
      : n == null
        ? (e.local ? Hi : Bi)(e)
        : (e.local ? qi : Xi)(e, r, n),
  );
}
function zi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Ui(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Wi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return (o !== r && (e = (r = o) && Ui(t, o)), e);
  }
  return ((i._value = n), i);
}
function Ki(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return (o !== r && (e = (r = o) && zi(t, o)), e);
  }
  return ((i._value = n), i);
}
function Zi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = At(t);
  return this.tween(e, (r.local ? Wi : Ki)(r, n));
}
function Qi(t, n) {
  return function () {
    tn(this, t).delay = +n.apply(this, arguments);
  };
}
function Ji(t, n) {
  return (
    (n = +n),
    function () {
      tn(this, t).delay = n;
    }
  );
}
function ji(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Qi : Ji)(n, t))
    : P(this.node(), n).delay;
}
function to(t, n) {
  return function () {
    L(this, t).duration = +n.apply(this, arguments);
  };
}
function no(t, n) {
  return (
    (n = +n),
    function () {
      L(this, t).duration = n;
    }
  );
}
function eo(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? to : no)(n, t))
    : P(this.node(), n).duration;
}
function ro(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    L(this, t).ease = n;
  };
}
function io(t) {
  var n = this._id;
  return arguments.length ? this.each(ro(n, t)) : P(this.node(), n).ease;
}
function oo(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    L(this, t).ease = e;
  };
}
function so(t) {
  if (typeof t != "function") throw new Error();
  return this.each(oo(this._id, t));
}
function co(t) {
  typeof t != "function" && (t = Dn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new G(r, this._parents, this._name, this._id);
}
function ao(t) {
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
  return new G(s, this._parents, this._name, this._id);
}
function lo(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return (e >= 0 && (n = n.slice(0, e)), !n || n === "start");
    });
}
function uo(t, n, e) {
  var r,
    i,
    o = lo(n) ? tn : L;
  return function () {
    var s = o(this, t),
      c = s.on;
    (c !== r && (i = (r = c).copy()).on(n, e), (s.on = i));
  };
}
function fo(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? P(this.node(), e).on.on(t)
    : this.each(uo(e, t, n));
}
function ho(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function po() {
  return this.on("end.remove", ho(this._id));
}
function go(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Zt(t));
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
        Mt(l[f], n, e, f, l, P(u, e)));
  return new G(o, this._parents, n, e);
}
function mo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Rn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            m = P(u, e),
            y = 0,
            I = f.length;
          y < I;
          ++y
        )
          (p = f[y]) && Mt(p, n, e, y, f, m);
        (o.push(f), s.push(u));
      }
  return new G(o, s, n, e);
}
var yo = lt.prototype.constructor;
function _o() {
  return new yo(this._groups, this._parents);
}
function wo(t, n) {
  var e, r, i;
  return function () {
    var o = J(this, t),
      s = (this.style.removeProperty(t), J(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function re(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function xo(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = J(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function vo(t, n, e) {
  var r, i, o;
  return function () {
    var s = J(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), J(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function bo(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = L(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = re(n)) : void 0;
    ((l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r));
  };
}
function Eo(t, n, e) {
  var r = (t += "") == "transform" ? ki : ee;
  return n == null
    ? this.styleTween(t, wo(t, r)).on("end.style." + t, re(t))
    : typeof n == "function"
      ? this.styleTween(t, vo(t, r, nn(this, "style." + t, n))).each(
          bo(this._id, t),
        )
      : this.styleTween(t, xo(t, r, n), e).on("end.style." + t, null);
}
function $o(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function ko(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return (s !== i && (r = (i = s) && $o(t, s, e)), r);
  }
  return ((o._value = n), o);
}
function No(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, ko(t, n, e ?? ""));
}
function Io(t) {
  return function () {
    this.textContent = t;
  };
}
function Co(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Po(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Co(nn(this, "text", t))
      : Io(t == null ? "" : t + ""),
  );
}
function Ao(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function To(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return (i !== e && (n = (e = i) && Ao(i)), n);
  }
  return ((r._value = t), r);
}
function Mo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, To(t));
}
function So() {
  for (
    var t = this._name,
      n = this._id,
      e = ie(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = P(a, n);
        Mt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new G(r, this._parents, t, e);
}
function Lo() {
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
    (e.each(function () {
      var l = L(this, r),
        u = l.on;
      (u !== t &&
        ((n = (t = u).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (l.on = n));
    }),
      i === 0 && o());
  });
}
var Ro = 0;
function G(t, n, e, r) {
  ((this._groups = t), (this._parents = n), (this._name = e), (this._id = r));
}
function ie() {
  return ++Ro;
}
var R = lt.prototype;
G.prototype = {
  constructor: G,
  select: go,
  selectAll: mo,
  selectChild: R.selectChild,
  selectChildren: R.selectChildren,
  filter: co,
  merge: ao,
  selection: _o,
  transition: So,
  call: R.call,
  nodes: R.nodes,
  node: R.node,
  size: R.size,
  empty: R.empty,
  each: R.each,
  on: fo,
  attr: Vi,
  attrTween: Zi,
  style: Eo,
  styleTween: No,
  text: Po,
  textTween: Mo,
  remove: po,
  tween: Gi,
  delay: ji,
  duration: eo,
  ease: io,
  easeVarying: so,
  end: Lo,
  [Symbol.iterator]: R[Symbol.iterator],
};
function Do(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Oo = { time: null, delay: 0, duration: 250, ease: Do };
function Go(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Bo(t) {
  var n, e;
  t instanceof G
    ? ((n = t._id), (t = t._name))
    : ((n = ie()), ((e = Oo).time = jt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Mt(a, t, n, l, s, e || Go(a, n));
  return new G(r, this._parents, t, n);
}
lt.prototype.interrupt = Ri;
lt.prototype.transition = Bo;
const Ut = Math.PI,
  Wt = 2 * Ut,
  q = 1e-6,
  Ho = Wt - q;
function oe(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Xo(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return oe;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class qo {
  constructor(n) {
    ((this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? oe : Xo(n)));
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
    this
      ._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 = +s)}`;
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
    else if (f > q)
      if (!(Math.abs(h * a - l * u) > q) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          m = i - c,
          y = a * a + l * l,
          I = p * p + m * m,
          U = Math.sqrt(y),
          A = Math.sqrt(f),
          T = o * Math.tan((Ut - Math.acos((y + f - I) / (2 * U * A))) / 2),
          d = T / A,
          g = T / U;
        (Math.abs(d - 1) > q && this._append`L${n + d * u},${e + d * h}`,
          this
            ._append`A${o},${o},0,0,${+(h * p > u * m)},${(this._x1 = n + g * a)},${(this._y1 = e + g * l)}`);
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
    (this._x1 === null
      ? this._append`M${l},${u}`
      : (Math.abs(this._x1 - l) > q || Math.abs(this._y1 - u) > q) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Wt) + Wt),
        f > Ho
          ? this
              ._append`A${r},${r},0,1,${h},${n - c},${e - a}A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > q &&
            this
              ._append`A${r},${r},0,${+(f >= Ut)},${h},${(this._x1 = n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`));
  }
  rect(n, e, r, i) {
    this
      ._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Fo(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Yo(t, n) {
  return fetch(t, n).then(Fo);
}
function Vo(t) {
  return (n, e) => Yo(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const zo = Vo("application/xml");
function rt(t, n, e) {
  ((this.k = t), (this.x = n), (this.y = e));
}
rt.prototype = {
  constructor: rt,
  scale: function (t) {
    return t === 1 ? this : new rt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new rt(this.k, this.x + this.k * t, this.y + this.k * n);
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
rt.prototype;
class en {
  constructor(n, e, r, i, o, s, c) {
    fn(this, "dragged", (n) => {
      this.sensor.attr(
        "transform",
        "translate(" +
          [n.sourceEvent.offsetX, n.sourceEvent.offsetY] +
          ") scale(" +
          this.scale +
          ")",
      );
    });
    ((this.id = n),
      (this.svgContainer = e),
      (this.url = r),
      this.sensor,
      (this.scale = i),
      (this.offsetX = s),
      (this.offsetY = c),
      (this.movable = o),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale));
  }
  async load() {
    if (b("#" + this.id).node() != null) return;
    const n = await zo(this.url);
    ((this.sensor = this.svgContainer
      .append("g")
      .attr(
        "transform",
        "translate(" +
          [this.offsetX, this.offsetY] +
          ") scale(" +
          this.scale +
          ")",
      )
      .attr("id", this.id)),
      this.sensor.node().append(b(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          ii()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended),
        ));
  }
  dragstarted(n) {
    b(this).raise().classed("active", !0);
  }
  dragended(n) {
    b(this).classed("active", !1);
  }
}
const z = [
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
  X = {
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
  se = ["path26583", "path26585"],
  mt = { path26583: "+ve terminal of LED", path26585: "-ve terminal of LED" },
  Uo = ["res_1", "res_2"],
  yt = { res_1: "Resistor", res_2: "Resistor" };
class Wo {
  constructor(n) {
    ((this.logLocationId = n), (this.connections = []));
  }
  addConnection(n) {
    (this.connections.push(n), this.logConnectionsToHtml());
  }
  undoLastConnection() {
    if (this.connections.length) {
      const n = this.connections.pop(),
        e = document.getElementById(this.logLocationId),
        r = e.lastChild;
      (e.removeChild(r),
        this.logConnectionsToHtml(),
        console.log("Removed connection:", n));
    } else console.warn("No more connections to undo");
  }
  logConnectionsToHtml() {
    if (this.connections.length % 2 === 0) {
      let n = document.createElement("li");
      const e = X[this.connections[this.connections.length - 2].connector]
          ? `${X[this.connections[this.connections.length - 2].connector]} pin of Raspberry Pi`
          : yt[this.connections[this.connections.length - 2].connector]
            ? yt[this.connections[this.connections.length - 2].connector]
            : mt[this.connections[this.connections.length - 2].connector]
              ? mt[this.connections[this.connections.length - 2].connector]
              : this.connections[this.connections.length - 2].connector,
        r = X[this.connections[this.connections.length - 1].connector]
          ? `${X[this.connections[this.connections.length - 1].connector]} pin of Raspberry Pi`
          : yt[this.connections[this.connections.length - 1].connector]
            ? yt[this.connections[this.connections.length - 1].connector]
            : mt[this.connections[this.connections.length - 1].connector]
              ? mt[this.connections[this.connections.length - 1].connector]
              : this.connections[this.connections.length - 1].connector;
      ((n.innerHTML = `Connection no. ${this.connections.length / 2} : ${e} to  ${r}`),
        document.getElementById(this.logLocationId).appendChild(n));
      return;
    }
  }
  getConnectionLog() {
    return this.connections;
  }
}
class Ko {
  constructor(n, e, r, i) {
    ((this.id = n),
      (this.headingId = e),
      (this.textId = r),
      (this.closeButtonId = i),
      document
        .getElementById(this.closeButtonId)
        .addEventListener("click", () => {
          document.getElementById(this.id).style.display = "none";
        }));
  }
  throw(n, e) {
    ((document.getElementById(this.id).style.display = "flex"),
      (document.getElementById(this.headingId).innerHTML = n),
      (document.getElementById(this.textId).innerHTML = e));
  }
}
const Zo = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = ["GPIO", "GND", "res_1", "res_2", "path26583", "path26585"];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          e++;
          return;
        }
        if (X[r.connector] == "GND") {
          e++;
          return;
        }
        if (
          X[r.connector].includes("GPIO") &&
          X[r.connector].includes(document.querySelector("#ledPin").value)
        ) {
          e++;
          return;
        }
      }),
      e == 6
    );
  },
  Pt = document.getElementById("svg"),
  Qo = Pt.clientWidth,
  Jo = window.innerHeight - Pt.getBoundingClientRect().top,
  x = b("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr("viewBox", `0 0 ${Qo} ${Jo}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "100%"),
  jo = (t) => {
    const n = document.getElementById("svgContainer"),
      e = n.createSVGPoint();
    return (
      (e.x = t.clientX),
      (e.y = t.clientY),
      e.matrixTransform(n.getScreenCTM().inverse())
    );
  };
window.addEventListener("resize", () => {
  const t = Pt.clientWidth,
    n = window.innerHeight - Pt.getBoundingClientRect().top;
  x.attr("viewBox", `0 0 ${t} ${n}`);
});
const Pn = (t, n, e) => {
    x.append("circle")
      .attr("cx", t)
      .attr("cy", n)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("id", e);
  },
  An = (t, n) => {
    rn.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  ts = window.innerWidth < 850,
  Tn = {
    desktop: {
      raspberry: { scale: 1.2, x: 0, y: 20 },
      led: { scale: 0.3, x: 400, y: 25 },
      resistor: { scale: 0.1, x: 300, y: 250 },
    },
    mobile: {
      raspberry: { scale: 0.5, x: 10, y: 10 },
      led: { scale: 0.15, x: 200, y: 50 },
      resistor: { scale: 0.05, x: 150, y: 200 },
    },
  },
  N = ts ? Tn.mobile : Tn.desktop,
  ns = new en(
    "raspberry",
    x,
    "images/pi3dirk.svg",
    N.raspberry.scale,
    !1,
    N.raspberry.x,
    N.raspberry.y,
  ),
  es = new en(
    "resistorComponent",
    x,
    "images/resistor.svg",
    N.resistor.scale,
    !1,
    N.resistor.x,
    N.resistor.y,
  ),
  Mn = new en("led", x, "images/led.svg", N.led.scale, !1, N.led.x, N.led.y),
  rn = x.append("g").attr("id", "pathsGroup"),
  on = {
    rasberryPi:
      "Raspberry Pi: Acts as the power source and controller. A GPIO pin is connected to the LED anode (positive leg) to supply voltage and control the LED’s on/off state programmatically. A GND pin is connected to the resistor’s other end to complete the circuit.",
    ledlight:
      "LED: Emits light when current flows through it. The anode (longer leg) is connected to a Raspberry Pi GPIO pin, while the cathode (shorter leg) is connected to a resistor to limit current.",
    resistor:
      "Resistor: Protects the LED by limiting current flow. One end is connected to the LED cathode, and the other end is connected to a Raspberry Pi GND pin",
  },
  ce = document.getElementById("rasberryPi"),
  ae = document.getElementById("ledlight"),
  le = document.getElementById("resistor"),
  _t = document.getElementById("componentDescription"),
  ue = document.getElementById("displayInfo"),
  rs = document.getElementById("codeSubmit"),
  is = document.getElementById("undoButton"),
  K = document.getElementById("successMessage");
ce.addEventListener("click", async () => await ns.load());
le.addEventListener("click", () => es.load());
ae.addEventListener("click", () => {
  Mn.load().then(() => {
    const t = x.select(`#${Mn.id}`);
    (t.select("#anode-label").style("display", "none"),
      t.select("#cathode-label").style("display", "none"));
    const n = t.select("#path26583"),
      e = t.select("#path26585");
    (n
      .on("mouseover", () => {
        (t.select("#anode-label").style("display", "block"),
          t.select("#cathode-label").style("display", "block"));
      })
      .on("mouseout", () => {
        (t.select("#anode-label").style("display", "none"),
          t.select("#cathode-label").style("display", "none"));
      }),
      e
        .on("mouseover", () => {
          (t.select("#anode-label").style("display", "block"),
            t.select("#cathode-label").style("display", "block"));
        })
        .on("mouseout", () => {
          (t.select("#anode-label").style("display", "none"),
            t.select("#cathode-label").style("display", "none"));
        }));
  });
});
const sn = (t, n) => {
  (t.addEventListener("mouseover", () => {
    ((_t.innerHTML = n), (_t.style.display = "block"));
  }),
    t.addEventListener("mouseout", () => {
      ((_t.innerHTML = "Hover over a component to see its description."),
        (_t.style.display = "none"));
    }));
};
sn(ce, on.rasberryPi);
sn(ae, on.ledlight);
sn(le, on.resistor);
const Gt = (t) =>
  z.includes(t.srcElement.id) ||
  se.includes(t.srcElement.id) ||
  Uo.includes(t.srcElement.id);
let k;
const O = new Wo("connectionLog"),
  wt = new Ko("errorBox", "errorHeading", "errorText", "closeErrorBox");
let D = 0;
const Sn = (t) => new Promise((n) => setTimeout(() => n(), t)),
  os = async (t, n, e, r) => {
    const i = document.querySelector(t),
      o = i.getAttribute("fill") || "white";
    for (;;)
      (i.setAttribute("fill", r),
        await Sn(n),
        i.setAttribute("fill", o),
        await Sn(e));
  },
  ss = () => {
    const t = N.resistor.y,
      e = 100 * N.resistor.scale,
      r = t + e + 80,
      i = N.resistor.x + 100;
    ((K.style.transform = `translate(${i}px, ${r}px)`),
      (K.textContent = "LED is blinking successfully!"),
      (K.style.display = "block"),
      K.classList.add("fade-in-scale"),
      setTimeout(() => {
        ((K.style.display = "none"), K.classList.remove("fade-in-scale"));
      }, 1e4));
  },
  cs = (t) => {
    rn.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((i) => i.remove());
    const e = x.select(`#marker-start-${t.replace("path", "")}`);
    e.empty() || e.remove();
    const r = x.select(`#marker-end-${t.replace("path", "")}`);
    r.empty() || r.remove();
  },
  as = () => {
    if (k) {
      rn.selectAll(`path[id^="path${D}"]`)
        .nodes()
        .forEach((r) => r.remove());
      const n = x.select(`#marker-start-${D}`);
      n.empty() || n.remove();
      const e = O.connections[O.connections.length - 1];
      (z.includes(e.connector) && b(`#${e.connector}`).style("fill", "#9a916c"),
        (k = null),
        console.log("Removed all incomplete paths"));
      return;
    }
    if (O.connections.length > 0) {
      const t = O.connections[O.connections.length - 1],
        n = t.lineID;
      (parseInt(n.replace("path", "")),
        cs(n),
        z.includes(t.connector) &&
          b(`#${t.connector}`).style("fill", "#9a916c"),
        console.log(`Removed paths with line ID: ${n}`));
    } else console.warn("No more connections to undo");
  };
is.addEventListener("click", () => {
  (O.undoLastConnection(), as());
});
x.on("dblclick", (t) => {
  const n = jo(t),
    e = n.x,
    r = n.y;
  if (Gt(t) && !k) {
    ((k = new qo()),
      k.moveTo(e, r),
      z.includes(t.srcElement.id)
        ? b(`#${t.srcElement.id}`).style("fill", "black")
        : Pn(e, r, `marker-start-${D}`),
      O.addConnection({
        lineID: `path${D}`,
        x: e,
        y: r,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      x.style("cursor", "crosshair"),
      console.log("Path started"));
    return;
  }
  if (t.srcElement.id === "svgContainer" && !Gt(t)) {
    k &&
      (k.lineTo(e, r),
      An(k.toString(), `path${D}`),
      console.log("Path segment added"));
    return;
  }
  if (Gt(t) && k) {
    (k.lineTo(e, r),
      An(k.toString(), `path${D}`),
      z.includes(t.srcElement.id)
        ? b(`#${t.srcElement.id}`).style("fill", "black")
        : Pn(e, r, `marker-end-${D}`),
      O.addConnection({
        lineID: `path${D}`,
        x: e,
        y: r,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      D++,
      x.style("cursor", "default"),
      (k = null),
      console.log("Path completed"));
    return;
  }
});
x.on("mouseover", (t) => {
  z.includes(t.srcElement.id) && (ue.innerHTML = X[t.srcElement.id]);
});
x.on("mouseout", (t) => {
  (z.includes(t.srcElement.id) || se.includes(t.srcElement.id)) &&
    (ue.innerHTML = "CONNECTOR INFO");
});
rs.addEventListener("click", () => {
  const t = Zo(O.getConnectionLog()),
    n = document.querySelector("#blinkTime").value,
    e = document.querySelector("#waitTime").value,
    r = document.querySelector("#ledColor").value;
  if (n === "" || e === "") {
    wt.throw("Error", "Please enter the blink time and wait time");
    return;
  }
  const i = parseInt(n),
    o = parseInt(e);
  if (isNaN(i) || isNaN(o) || i <= 0 || o <= 0) {
    wt.throw("Error", "Blink time and wait time must be positive numbers");
    return;
  }
  if (t === !0) {
    const s = i * 1e3,
      c = o * 1e3;
    (os("#ledLight", s, c, r),
      ss(),
      document.querySelector("#my-drawer-4").click());
  } else
    t.error
      ? wt.throw("Error", t.error)
      : wt.throw("Error", "Please connect the components properly.");
});
document.getElementById("backButton").addEventListener("click", function () {
  document.getElementById("my-drawer-4").checked = !1;
});
