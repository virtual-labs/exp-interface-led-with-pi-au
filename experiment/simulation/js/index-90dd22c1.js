var ce = Object.defineProperty;
var ae = (t, n, e) =>
  n in t
    ? ce(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var un = (t, n, e) => (ae(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var le = { value: () => {} };
function Vt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new mt(e);
}
function mt(t) {
  this._ = t;
}
function ue(t, n) {
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
mt.prototype = Vt.prototype = {
  constructor: mt,
  on: function (t, n) {
    var e = this._,
      r = ue(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = fe(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = fn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = fn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new mt(t);
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
function fe(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function fn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = le), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Rt = "http://www.w3.org/1999/xhtml";
const hn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Rt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function It(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    hn.hasOwnProperty(n) ? { space: hn[n], local: t } : t
  );
}
function he(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Rt && n.documentElement.namespaceURI === Rt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function de(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Tn(t) {
  var n = It(t);
  return (n.local ? de : he)(n);
}
function pe() {}
function zt(t) {
  return t == null
    ? pe
    : function () {
        return this.querySelector(t);
      };
}
function ge(t) {
  typeof t != "function" && (t = zt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new x(r, this._parents);
}
function _e(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function me() {
  return [];
}
function Sn(t) {
  return t == null
    ? me
    : function () {
        return this.querySelectorAll(t);
      };
}
function ye(t) {
  return function () {
    return _e(t.apply(this, arguments));
  };
}
function we(t) {
  typeof t == "function" ? (t = ye(t)) : (t = Sn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new x(r, i);
}
function Mn(t) {
  return function () {
    return this.matches(t);
  };
}
function Ln(t) {
  return function (n) {
    return n.matches(t);
  };
}
var ve = Array.prototype.find;
function xe(t) {
  return function () {
    return ve.call(this.children, t);
  };
}
function be() {
  return this.firstElementChild;
}
function Ee(t) {
  return this.select(t == null ? be : xe(typeof t == "function" ? t : Ln(t)));
}
var $e = Array.prototype.filter;
function Ne() {
  return Array.from(this.children);
}
function Ie(t) {
  return function () {
    return $e.call(this.children, t);
  };
}
function Ce(t) {
  return this.selectAll(
    t == null ? Ne : Ie(typeof t == "function" ? t : Ln(t))
  );
}
function Pe(t) {
  typeof t != "function" && (t = Mn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new x(r, this._parents);
}
function Rn(t) {
  return new Array(t.length);
}
function Ae() {
  return new x(this._enter || this._groups.map(Rn), this._parents);
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
function ke(t) {
  return function () {
    return t;
  };
}
function Te(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new vt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Se(t, n, e, r, i, o, s) {
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
function Me(t) {
  return t.__data__;
}
function Le(t, n) {
  if (!arguments.length) return Array.from(this, Me);
  var e = n ? Se : Te,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = ke(t));
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
      p = Re(t.call(u, u && u.__data__, l, r)),
      _ = p.length,
      m = (c[l] = new Array(_)),
      $ = (s[l] = new Array(_)),
      z = (a[l] = new Array(f));
    e(u, h, m, $, z, p, n);
    for (var C = 0, P = 0, d, g; C < _; ++C)
      if ((d = m[C])) {
        for (C >= P && (P = C + 1); !(g = $[P]) && ++P < _; );
        d._next = g || null;
      }
  }
  return (s = new x(s, r)), (s._enter = c), (s._exit = a), s;
}
function Re(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function De() {
  return new x(this._exit || this._groups.map(Rn), this._parents);
}
function Oe(t, n, e) {
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
function Ge(t) {
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
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, _ = 0;
      _ < h;
      ++_
    )
      (p = l[_] || u[_]) && (f[_] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new x(c, this._parents);
}
function Be() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Xe(t) {
  t || (t = He);
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
  return new x(i, this._parents).order();
}
function He(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function qe() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Fe() {
  return Array.from(this);
}
function Ye() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ve() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function ze() {
  return !this.node();
}
function Ue(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Ke(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function We(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ze(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Qe(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Je(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function je(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function tr(t, n) {
  var e = It(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? We
        : Ke
      : typeof n == "function"
      ? e.local
        ? je
        : Je
      : e.local
      ? Qe
      : Ze)(e, n)
  );
}
function Dn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function nr(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function er(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function rr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function ir(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? nr : typeof n == "function" ? rr : er)(t, n, e ?? "")
      )
    : Z(this.node(), t);
}
function Z(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Dn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function or(t) {
  return function () {
    delete this[t];
  };
}
function sr(t, n) {
  return function () {
    this[t] = n;
  };
}
function cr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function ar(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? or : typeof n == "function" ? cr : sr)(t, n))
    : this.node()[t];
}
function On(t) {
  return t.trim().split(/^|\s+/);
}
function Ut(t) {
  return t.classList || new Gn(t);
}
function Gn(t) {
  (this._node = t), (this._names = On(t.getAttribute("class") || ""));
}
Gn.prototype = {
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
function Bn(t, n) {
  for (var e = Ut(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Xn(t, n) {
  for (var e = Ut(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function lr(t) {
  return function () {
    Bn(this, t);
  };
}
function ur(t) {
  return function () {
    Xn(this, t);
  };
}
function fr(t, n) {
  return function () {
    (n.apply(this, arguments) ? Bn : Xn)(this, t);
  };
}
function hr(t, n) {
  var e = On(t + "");
  if (arguments.length < 2) {
    for (var r = Ut(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? fr : n ? lr : ur)(e, n));
}
function dr() {
  this.textContent = "";
}
function pr(t) {
  return function () {
    this.textContent = t;
  };
}
function gr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function _r(t) {
  return arguments.length
    ? this.each(t == null ? dr : (typeof t == "function" ? gr : pr)(t))
    : this.node().textContent;
}
function mr() {
  this.innerHTML = "";
}
function yr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function wr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function vr(t) {
  return arguments.length
    ? this.each(t == null ? mr : (typeof t == "function" ? wr : yr)(t))
    : this.node().innerHTML;
}
function xr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function br() {
  return this.each(xr);
}
function Er() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function $r() {
  return this.each(Er);
}
function Nr(t) {
  var n = typeof t == "function" ? t : Tn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Ir() {
  return null;
}
function Cr(t, n) {
  var e = typeof t == "function" ? t : Tn(t),
    r = n == null ? Ir : typeof n == "function" ? n : zt(n);
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
function kr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Tr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Sr(t) {
  return this.select(t ? Tr : kr);
}
function Mr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Lr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Rr(t) {
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
function Dr(t) {
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
function Or(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Lr(n);
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
function Gr(t, n, e) {
  var r = Rr(t + ""),
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
  for (c = n ? Or : Dr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Hn(t, n, e) {
  var r = Dn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Br(t, n) {
  return function () {
    return Hn(this, t, n);
  };
}
function Xr(t, n) {
  return function () {
    return Hn(this, t, n.apply(this, arguments));
  };
}
function Hr(t, n) {
  return this.each((typeof n == "function" ? Xr : Br)(t, n));
}
function* qr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var qn = [null];
function x(t, n) {
  (this._groups = t), (this._parents = n);
}
function ct() {
  return new x([[document.documentElement]], qn);
}
function Fr() {
  return this;
}
x.prototype = ct.prototype = {
  constructor: x,
  select: ge,
  selectAll: we,
  selectChild: Ee,
  selectChildren: Ce,
  filter: Pe,
  data: Le,
  enter: Ae,
  exit: De,
  join: Oe,
  merge: Ge,
  selection: Fr,
  order: Be,
  sort: Xe,
  call: qe,
  nodes: Fe,
  node: Ye,
  size: Ve,
  empty: ze,
  each: Ue,
  attr: tr,
  style: ir,
  property: ar,
  classed: hr,
  text: _r,
  html: vr,
  raise: br,
  lower: $r,
  append: Nr,
  insert: Cr,
  remove: Ar,
  clone: Sr,
  datum: Mr,
  on: Gr,
  dispatch: Hr,
  [Symbol.iterator]: qr,
};
function L(t) {
  return typeof t == "string"
    ? new x([[document.querySelector(t)]], [document.documentElement])
    : new x([[t]], qn);
}
function Yr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function dn(t, n) {
  if (((t = Yr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Vr = { passive: !1 },
  et = { capture: !0, passive: !1 };
function Tt(t) {
  t.stopImmediatePropagation();
}
function K(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function zr(t) {
  var n = t.document.documentElement,
    e = L(t).on("dragstart.drag", K, et);
  "onselectstart" in n
    ? e.on("selectstart.drag", K, et)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Ur(t, n) {
  var e = t.document.documentElement,
    r = L(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", K, et),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ut = (t) => () => t;
function Dt(
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
Dt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Kr(t) {
  return !t.ctrlKey && !t.button;
}
function Wr() {
  return this.parentNode;
}
function Zr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Qr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Jr() {
  var t = Kr,
    n = Wr,
    e = Zr,
    r = Qr,
    i = {},
    o = Vt("start", "drag", "end"),
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
      .on("touchmove.drag", z, Vr)
      .on("touchend.drag touchcancel.drag", C)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var y = P(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (L(d.view).on("mousemove.drag", _, et).on("mouseup.drag", m, et),
        zr(d.view),
        Tt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function _(d) {
    if ((K(d), !l)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      l = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    L(d.view).on("mousemove.drag mouseup.drag", null),
      Ur(d.view, l),
      K(d),
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
        (U = P(this, w, d, g, y[D].identifier, y[D])) &&
          (Tt(d), U("start", d, y[D]));
    }
  }
  function z(d) {
    var g = d.changedTouches,
      y = g.length,
      w,
      b;
    for (w = 0; w < y; ++w)
      (b = i[g[w].identifier]) && (K(d), b("drag", d, g[w]));
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
      (b = i[g[w].identifier]) && (Tt(d), b("end", d, g[w]));
  }
  function P(d, g, y, w, b, D) {
    var U = o.copy(),
      A = dn(D || y, g),
      sn,
      cn,
      lt;
    if (
      (lt = e.call(
        d,
        new Dt("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: b,
          active: s,
          x: A[0],
          y: A[1],
          dx: 0,
          dy: 0,
          dispatch: U,
        }),
        w
      )) != null
    )
      return (
        (sn = lt.x - A[0] || 0),
        (cn = lt.y - A[1] || 0),
        function oe(At, an, se) {
          var ln = A,
            kt;
          switch (At) {
            case "start":
              (i[b] = oe), (kt = s++);
              break;
            case "end":
              delete i[b], --s;
            case "drag":
              (A = dn(se || an, g)), (kt = s);
              break;
          }
          U.call(
            At,
            d,
            new Dt(At, {
              sourceEvent: an,
              subject: lt,
              target: f,
              identifier: b,
              active: kt,
              x: A[0] + sn,
              y: A[1] + cn,
              dx: A[0] - ln[0],
              dy: A[1] - ln[1],
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
        ? ((t = typeof d == "function" ? d : ut(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ut(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ut(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ut(!!d)), f)
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
function Kt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function Fn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function at() {}
var rt = 0.7,
  xt = 1 / rt,
  W = "\\s*([+-]?\\d+)\\s*",
  it = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  k = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  jr = /^#([0-9a-f]{3,8})$/,
  ti = new RegExp(`^rgb\\(${W},${W},${W}\\)$`),
  ni = new RegExp(`^rgb\\(${k},${k},${k}\\)$`),
  ei = new RegExp(`^rgba\\(${W},${W},${W},${it}\\)$`),
  ri = new RegExp(`^rgba\\(${k},${k},${k},${it}\\)$`),
  ii = new RegExp(`^hsl\\(${it},${k},${k}\\)$`),
  oi = new RegExp(`^hsla\\(${it},${k},${k},${it}\\)$`),
  pn = {
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
Kt(at, ot, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: gn,
  formatHex: gn,
  formatHex8: si,
  formatHsl: ci,
  formatRgb: _n,
  toString: _n,
});
function gn() {
  return this.rgb().formatHex();
}
function si() {
  return this.rgb().formatHex8();
}
function ci() {
  return Yn(this).formatHsl();
}
function _n() {
  return this.rgb().formatRgb();
}
function ot(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = jr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? mn(n)
          : e === 3
          ? new v(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ft(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ft(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = ti.exec(t))
      ? new v(n[1], n[2], n[3], 1)
      : (n = ni.exec(t))
      ? new v((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = ei.exec(t))
      ? ft(n[1], n[2], n[3], n[4])
      : (n = ri.exec(t))
      ? ft((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = ii.exec(t))
      ? vn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = oi.exec(t))
      ? vn(n[1], n[2] / 100, n[3] / 100, n[4])
      : pn.hasOwnProperty(t)
      ? mn(pn[t])
      : t === "transparent"
      ? new v(NaN, NaN, NaN, 0)
      : null
  );
}
function mn(t) {
  return new v((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ft(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new v(t, n, e, r);
}
function ai(t) {
  return (
    t instanceof at || (t = ot(t)),
    t ? ((t = t.rgb()), new v(t.r, t.g, t.b, t.opacity)) : new v()
  );
}
function Ot(t, n, e, r) {
  return arguments.length === 1 ? ai(t) : new v(t, n, e, r ?? 1);
}
function v(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Kt(
  v,
  Ot,
  Fn(at, {
    brighter(t) {
      return (
        (t = t == null ? xt : Math.pow(xt, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? rt : Math.pow(rt, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new v(Y(this.r), Y(this.g), Y(this.b), bt(this.opacity));
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
    hex: yn,
    formatHex: yn,
    formatHex8: li,
    formatRgb: wn,
    toString: wn,
  })
);
function yn() {
  return `#${F(this.r)}${F(this.g)}${F(this.b)}`;
}
function li() {
  return `#${F(this.r)}${F(this.g)}${F(this.b)}${F(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function wn() {
  const t = bt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Y(this.r)}, ${Y(this.g)}, ${Y(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function bt(t) {
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
function Yn(t) {
  if (t instanceof N) return new N(t.h, t.s, t.l, t.opacity);
  if ((t instanceof at || (t = ot(t)), !t)) return new N();
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
function ui(t, n, e, r) {
  return arguments.length === 1 ? Yn(t) : new N(t, n, e, r ?? 1);
}
function N(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Kt(
  N,
  ui,
  Fn(at, {
    brighter(t) {
      return (
        (t = t == null ? xt : Math.pow(xt, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? rt : Math.pow(rt, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new v(
        St(t >= 240 ? t - 240 : t + 120, i, r),
        St(t, i, r),
        St(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new N(xn(this.h), ht(this.s), ht(this.l), bt(this.opacity));
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
      const t = bt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${xn(this.h)}, ${
        ht(this.s) * 100
      }%, ${ht(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function xn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function ht(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function St(t, n, e) {
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
const Vn = (t) => () => t;
function fi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function hi(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function di(t) {
  return (t = +t) == 1
    ? zn
    : function (n, e) {
        return e - n ? hi(n, e, t) : Vn(isNaN(n) ? e : n);
      };
}
function zn(t, n) {
  var e = n - t;
  return e ? fi(t, e) : Vn(isNaN(t) ? n : t);
}
const bn = (function t(n) {
  var e = di(n);
  function r(i, o) {
    var s = e((i = Ot(i)).r, (o = Ot(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = zn(i.opacity, o.opacity);
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
var Gt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Mt = new RegExp(Gt.source, "g");
function pi(t) {
  return function () {
    return t;
  };
}
function gi(t) {
  return function (n) {
    return t(n) + "";
  };
}
function _i(t, n) {
  var e = (Gt.lastIndex = Mt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Gt.exec(t)) && (i = Mt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: O(r, i) })),
      (e = Mt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? gi(a[0].x)
        : pi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var En = 180 / Math.PI,
  Bt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Un(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * En,
      skewX: Math.atan(a) * En,
      scaleX: s,
      scaleY: c,
    }
  );
}
var dt;
function mi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Bt : Un(n.a, n.b, n.c, n.d, n.e, n.f);
}
function yi(t) {
  return t == null ||
    (dt || (dt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    dt.setAttribute("transform", t),
    !(t = dt.transform.baseVal.consolidate()))
    ? Bt
    : ((t = t.matrix), Un(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Kn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push("translate(", null, n, null, e);
      _.push({ i: m - 4, x: O(l, h) }, { i: m - 2, x: O(u, f) });
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
  function a(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      _.push({ i: m - 4, x: O(l, h) }, { i: m - 2, x: O(u, f) });
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
        for (var _ = -1, m = f.length, $; ++_ < m; ) h[($ = f[_]).i] = $.x(p);
        return h.join("");
      }
    );
  };
}
var wi = Kn(mi, "px, ", "px)", "deg)"),
  vi = Kn(yi, ", ", ")", ")"),
  Q = 0,
  j = 0,
  J = 0,
  Wn = 1e3,
  Et,
  tt,
  $t = 0,
  V = 0,
  Ct = 0,
  st = typeof performance == "object" && performance.now ? performance : Date,
  Zn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Wt() {
  return V || (Zn(xi), (V = st.now() + Ct));
}
function xi() {
  V = 0;
}
function Nt() {
  this._call = this._time = this._next = null;
}
Nt.prototype = Qn.prototype = {
  constructor: Nt,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Wt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        tt !== this &&
        (tt ? (tt._next = this) : (Et = this), (tt = this)),
      (this._call = t),
      (this._time = e),
      Xt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Xt());
  },
};
function Qn(t, n, e) {
  var r = new Nt();
  return r.restart(t, n, e), r;
}
function bi() {
  Wt(), ++Q;
  for (var t = Et, n; t; )
    (n = V - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Q;
}
function $n() {
  (V = ($t = st.now()) + Ct), (Q = j = 0);
  try {
    bi();
  } finally {
    (Q = 0), $i(), (V = 0);
  }
}
function Ei() {
  var t = st.now(),
    n = t - $t;
  n > Wn && ((Ct -= n), ($t = t));
}
function $i() {
  for (var t, n = Et, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Et = e)));
  (tt = t), Xt(r);
}
function Xt(t) {
  if (!Q) {
    j && (j = clearTimeout(j));
    var n = t - V;
    n > 24
      ? (t < 1 / 0 && (j = setTimeout($n, t - st.now() - Ct)),
        J && (J = clearInterval(J)))
      : (J || (($t = st.now()), (J = setInterval(Ei, Wn))), (Q = 1), Zn($n));
  }
}
function Nn(t, n, e) {
  var r = new Nt();
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
var Ni = Vt("start", "end", "cancel", "interrupt"),
  Ii = [],
  Jn = 0,
  In = 1,
  Ht = 2,
  yt = 3,
  Cn = 4,
  qt = 5,
  wt = 6;
function Pt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Ci(t, e, {
    name: n,
    index: r,
    group: i,
    on: Ni,
    tween: Ii,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Jn,
  });
}
function Zt(t, n) {
  var e = I(t, n);
  if (e.state > Jn) throw new Error("too late; already scheduled");
  return e;
}
function S(t, n) {
  var e = I(t, n);
  if (e.state > yt) throw new Error("too late; already running");
  return e;
}
function I(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Ci(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Qn(o, 0, e.time));
  function o(l) {
    (e.state = In),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== In) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === yt) return Nn(s);
        p.state === Cn
          ? ((p.state = wt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = wt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (Nn(function () {
        e.state === yt &&
          ((e.state = Cn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Ht),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Ht)
    ) {
      for (
        e.state = yt, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
            : (e.timer.restart(a), (e.state = qt), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === qt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = wt), e.timer.stop(), delete r[n];
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
      (i = r.state > Ht && r.state < qt),
        (r.state = wt),
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
function ki(t, n) {
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
function Ti(t, n, e) {
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
function Si(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = I(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? ki : Ti)(e, t, n));
}
function Qt(t, n, e) {
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
function jn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? O
      : n instanceof ot
      ? bn
      : (e = ot(n))
      ? ((n = e), bn)
      : _i
  )(t, n);
}
function Mi(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Li(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ri(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Di(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Oi(t, n, e) {
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
function Gi(t, n, e) {
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
function Bi(t, n) {
  var e = It(t),
    r = e === "transform" ? vi : jn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Gi : Oi)(e, r, Qt(this, "attr." + t, n))
      : n == null
      ? (e.local ? Li : Mi)(e)
      : (e.local ? Di : Ri)(e, r, n)
  );
}
function Xi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Hi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function qi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Hi(t, o)), e;
  }
  return (i._value = n), i;
}
function Fi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Xi(t, o)), e;
  }
  return (i._value = n), i;
}
function Yi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = It(t);
  return this.tween(e, (r.local ? qi : Fi)(r, n));
}
function Vi(t, n) {
  return function () {
    Zt(this, t).delay = +n.apply(this, arguments);
  };
}
function zi(t, n) {
  return (
    (n = +n),
    function () {
      Zt(this, t).delay = n;
    }
  );
}
function Ui(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Vi : zi)(n, t))
    : I(this.node(), n).delay;
}
function Ki(t, n) {
  return function () {
    S(this, t).duration = +n.apply(this, arguments);
  };
}
function Wi(t, n) {
  return (
    (n = +n),
    function () {
      S(this, t).duration = n;
    }
  );
}
function Zi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Ki : Wi)(n, t))
    : I(this.node(), n).duration;
}
function Qi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    S(this, t).ease = n;
  };
}
function Ji(t) {
  var n = this._id;
  return arguments.length ? this.each(Qi(n, t)) : I(this.node(), n).ease;
}
function ji(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    S(this, t).ease = e;
  };
}
function to(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ji(this._id, t));
}
function no(t) {
  typeof t != "function" && (t = Mn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new R(r, this._parents, this._name, this._id);
}
function eo(t) {
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
function ro(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function io(t, n, e) {
  var r,
    i,
    o = ro(n) ? Zt : S;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function oo(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? I(this.node(), e).on.on(t)
    : this.each(io(e, t, n));
}
function so(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function co() {
  return this.on("end.remove", so(this._id));
}
function ao(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = zt(t));
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
function lo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Sn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            _ = I(u, e),
            m = 0,
            $ = f.length;
          m < $;
          ++m
        )
          (p = f[m]) && Pt(p, n, e, m, f, _);
        o.push(f), s.push(u);
      }
  return new R(o, s, n, e);
}
var uo = ct.prototype.constructor;
function fo() {
  return new uo(this._groups, this._parents);
}
function ho(t, n) {
  var e, r, i;
  return function () {
    var o = Z(this, t),
      s = (this.style.removeProperty(t), Z(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function te(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function po(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = Z(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function go(t, n, e) {
  var r, i, o;
  return function () {
    var s = Z(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), Z(this, t))),
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
      u = a.value[o] == null ? c || (c = te(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function mo(t, n, e) {
  var r = (t += "") == "transform" ? wi : jn;
  return n == null
    ? this.styleTween(t, ho(t, r)).on("end.style." + t, te(t))
    : typeof n == "function"
    ? this.styleTween(t, go(t, r, Qt(this, "style." + t, n))).each(
        _o(this._id, t)
      )
    : this.styleTween(t, po(t, r, n), e).on("end.style." + t, null);
}
function yo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function wo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && yo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function vo(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, wo(t, n, e ?? ""));
}
function xo(t) {
  return function () {
    this.textContent = t;
  };
}
function bo(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Eo(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? bo(Qt(this, "text", t))
      : xo(t == null ? "" : t + "")
  );
}
function $o(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function No(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && $o(i)), n;
  }
  return (r._value = t), r;
}
function Io(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, No(t));
}
function Co() {
  for (
    var t = this._name,
      n = this._id,
      e = ne(),
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
function ne() {
  return ++Ao;
}
var M = ct.prototype;
R.prototype = {
  constructor: R,
  select: ao,
  selectAll: lo,
  selectChild: M.selectChild,
  selectChildren: M.selectChildren,
  filter: no,
  merge: eo,
  selection: fo,
  transition: Co,
  call: M.call,
  nodes: M.nodes,
  node: M.node,
  size: M.size,
  empty: M.empty,
  each: M.each,
  on: oo,
  attr: Bi,
  attrTween: Yi,
  style: mo,
  styleTween: vo,
  text: Eo,
  textTween: Io,
  remove: co,
  tween: Si,
  delay: Ui,
  duration: Zi,
  ease: Ji,
  easeVarying: to,
  end: Po,
  [Symbol.iterator]: M[Symbol.iterator],
};
function ko(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var To = { time: null, delay: 0, duration: 250, ease: ko };
function So(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Mo(t) {
  var n, e;
  t instanceof R
    ? ((n = t._id), (t = t._name))
    : ((n = ne()), ((e = To).time = Wt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Pt(a, t, n, l, s, e || So(a, n));
  return new R(r, this._parents, t, n);
}
ct.prototype.interrupt = Ai;
ct.prototype.transition = Mo;
const Ft = Math.PI,
  Yt = 2 * Ft,
  H = 1e-6,
  Lo = Yt - H;
function ee(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Ro(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return ee;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Do {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? ee : Ro(n));
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
          _ = i - c,
          m = a * a + l * l,
          $ = p * p + _ * _,
          z = Math.sqrt(m),
          C = Math.sqrt(f),
          P = o * Math.tan((Ft - Math.acos((m + f - $) / (2 * z * C))) / 2),
          d = P / C,
          g = P / z;
        Math.abs(d - 1) > H && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * _)},${(this._x1 =
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
        (f < 0 && (f = (f % Yt) + Yt),
        f > Lo
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > H &&
            this._append`A${r},${r},0,${+(f >= Ft)},${h},${(this._x1 =
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
function Oo(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Go(t, n) {
  return fetch(t, n).then(Oo);
}
function Bo(t) {
  return (n, e) => Go(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Xo = Bo("application/xml");
function nt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
nt.prototype = {
  constructor: nt,
  scale: function (t) {
    return t === 1 ? this : new nt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new nt(this.k, this.x + this.k * t, this.y + this.k * n);
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
nt.prototype;
class Jt {
  constructor(n, e, r, i, o, s, c) {
    un(this, "dragged", (n) => {
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
    const n = await Xo(this.url);
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
          Jr()
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
const jt = [
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
  re = ["path26583", "path26585"],
  pt = { path26583: "+ve terminal of LED", path26585: "-ve terminal of LED" },
  Ho = ["res_1", "res_2"],
  gt = { res_1: "Resistor", res_2: "Resistor" };
class qo {
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
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : pt[this.connections[this.connections.length - 2].connector]
          ? pt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = G[this.connections[this.connections.length - 1].connector]
          ? `${
              G[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
          : pt[this.connections[this.connections.length - 1].connector]
          ? pt[this.connections[this.connections.length - 1].connector]
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
class Fo {
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
const Yo = (t) => {
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
  Vo = new Jt("raspberry", T, "images/pi3dirk.svg", 1, !1),
  zo = new Jt(
    "resistorComponent",
    T,
    "images/resistor.svg",
    0.1,
    !1,
    300,
    250
  ),
  Pn = new Jt("led", T, "images/led.svg", 0.3, !1, 400, 25),
  tn = T.append("g").attr("id", "pathsGroup"),
  nn = {
    rasberryPi:
      "Raspberry Pi: Acts as the power source and controller. A GPIO pin is connected to the LED anode (positive leg) to supply voltage and control the LED’s on/off state programmatically. A GND pin is connected to the resistor’s other end to complete the circuit.",
    ledlight:
      "LED: Emits light when current flows through it. The anode (longer leg) is connected to a Raspberry Pi GPIO pin, while the cathode (shorter leg) is connected to a resistor to limit current.",
    resistor:
      "Resistor: Protects the LED by limiting current flow. One end is connected to the LED cathode, and the other end is connected to a Raspberry Pi GND pin.",
  },
  en = document.getElementById("rasberryPi"),
  rn = document.getElementById("ledlight"),
  on = document.getElementById("resistor"),
  X = document.getElementById("componentDescription"),
  ie = document.getElementById("displayInfo"),
  Uo = document.getElementById("codeSubmit"),
  Ko = document.getElementById("undoButton");
en.addEventListener("click", async () => await Vo.load());
on.addEventListener("click", () => zo.load());
rn.addEventListener("click", () => {
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
en.addEventListener("mouseover", () => {
  (X.textContent = nn.rasberryPi), (X.style.display = "block");
});
rn.addEventListener("mouseover", () => {
  (X.textContent = nn.ledlight), (X.style.display = "block");
});
on.addEventListener("mouseover", () => {
  (X.textContent = nn.resistor), (X.style.display = "block");
});
[en, rn, on].forEach((t) => {
  t.addEventListener("mouseout", () => {
    (X.textContent = "Hover over a component to see its description."),
      (X.style.display = "none");
  });
});
const Lt = (t) =>
    jt.includes(t.srcElement.id) ||
    re.includes(t.srcElement.id) ||
    Ho.includes(t.srcElement.id),
  An = (t, n) => {
    tn.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  };
let E;
const B = new qo("connectionLog"),
  _t = new Fo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let q = 0;
const Wo = (t) => {
    tn.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  Zo = () => {
    if (E) {
      tn
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
      Wo(n),
        B.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
Ko.addEventListener("click", () => {
  B.undoLastConnection(), Zo();
});
T.on("dblclick", (t) => {
  if (Lt(t) && !E) {
    (E = new Do()),
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
  if (t.srcElement.id === "svgContainer" && !Lt(t)) {
    E &&
      (E.lineTo(t.offsetX, t.offsetY),
      An(E.toString(), `path${q}`),
      console.log("Path segment added"));
    return;
  }
  if (Lt(t) && E) {
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
  jt.includes(t.srcElement.id) && (ie.innerHTML = G[t.srcElement.id]);
});
T.on("mouseout", (t) => {
  (jt.includes(t.srcElement.id) || re.includes(t.srcElement.id)) &&
    (ie.innerHTML = "CONNECTOR INFO");
});
const kn = (t) => new Promise((n) => setTimeout(() => n(), t)),
  Qo = async (t, n, e, r) => {
    const i = document.querySelector(t),
      o = i.getAttribute("fill");
    for (;;)
      i.setAttribute("fill", r),
        await kn(n),
        i.setAttribute("fill", o),
        await kn(e);
  };
Uo.addEventListener("click", () => {
  const t = Yo(B.getConnectionLog()),
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
    Qo("#ledLight", s, c, r), document.querySelector("#my-drawer-4").click();
  } else
    t.error
      ? _t.throw("Error", t.error)
      : _t.throw("Error", "Please connect the components properly.");
});
