var he = Object.defineProperty;
var de = (t, n, e) =>
  n in t
    ? he(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var un = (t, n, e) => (de(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var pe = { value: () => {} };
function Kt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new wt(e);
}
function wt(t) {
  this._ = t;
}
function ge(t, n) {
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
wt.prototype = Kt.prototype = {
  constructor: wt,
  on: function (t, n) {
    var e = this._,
      r = ge(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = me(e[i], t.name))) return i;
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
    return new wt(t);
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
function me(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function fn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = pe), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Gt = "http://www.w3.org/1999/xhtml";
const hn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Gt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Pt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    hn.hasOwnProperty(n) ? { space: hn[n], local: t } : t
  );
}
function ye(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Gt && n.documentElement.namespaceURI === Gt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function _e(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Sn(t) {
  var n = Pt(t);
  return (n.local ? _e : ye)(n);
}
function xe() {}
function Wt(t) {
  return t == null
    ? xe
    : function () {
        return this.querySelector(t);
      };
}
function we(t) {
  typeof t != "function" && (t = Wt(t));
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
function ve(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function be() {
  return [];
}
function Ln(t) {
  return t == null
    ? be
    : function () {
        return this.querySelectorAll(t);
      };
}
function Ee(t) {
  return function () {
    return ve(t.apply(this, arguments));
  };
}
function $e(t) {
  typeof t == "function" ? (t = Ee(t)) : (t = Ln(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new E(r, i);
}
function Rn(t) {
  return function () {
    return this.matches(t);
  };
}
function Dn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Ne = Array.prototype.find;
function ke(t) {
  return function () {
    return Ne.call(this.children, t);
  };
}
function Ie() {
  return this.firstElementChild;
}
function Ce(t) {
  return this.select(t == null ? Ie : ke(typeof t == "function" ? t : Dn(t)));
}
var Pe = Array.prototype.filter;
function Ae() {
  return Array.from(this.children);
}
function Te(t) {
  return function () {
    return Pe.call(this.children, t);
  };
}
function Me(t) {
  return this.selectAll(
    t == null ? Ae : Te(typeof t == "function" ? t : Dn(t))
  );
}
function Se(t) {
  typeof t != "function" && (t = Rn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new E(r, this._parents);
}
function On(t) {
  return new Array(t.length);
}
function Le() {
  return new E(this._enter || this._groups.map(On), this._parents);
}
function Et(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
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
function Re(t) {
  return function () {
    return t;
  };
}
function De(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new Et(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Oe(t, n, e, r, i, o, s) {
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
        : (e[c] = new Et(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Ge(t) {
  return t.__data__;
}
function Be(t, n) {
  if (!arguments.length) return Array.from(this, Ge);
  var e = n ? Oe : De,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Re(t));
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
  return (s = new E(s, r)), (s._enter = c), (s._exit = a), s;
}
function Xe(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function He() {
  return new E(this._exit || this._groups.map(On), this._parents);
}
function qe(t, n, e) {
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
function Fe(t) {
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
function Ye() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Ve(t) {
  t || (t = ze);
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
function ze(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Ue() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Ke() {
  return Array.from(this);
}
function We() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ze() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Qe() {
  return !this.node();
}
function Je(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function je(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function tr(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function nr(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function er(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function rr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function ir(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function or(t, n) {
  var e = Pt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? tr
        : je
      : typeof n == "function"
      ? e.local
        ? ir
        : rr
      : e.local
      ? er
      : nr)(e, n)
  );
}
function Gn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function sr(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function cr(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function ar(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function lr(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? sr : typeof n == "function" ? ar : cr)(t, n, e ?? "")
      )
    : J(this.node(), t);
}
function J(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Gn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function ur(t) {
  return function () {
    delete this[t];
  };
}
function fr(t, n) {
  return function () {
    this[t] = n;
  };
}
function hr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function dr(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? ur : typeof n == "function" ? hr : fr)(t, n))
    : this.node()[t];
}
function Bn(t) {
  return t.trim().split(/^|\s+/);
}
function Zt(t) {
  return t.classList || new Xn(t);
}
function Xn(t) {
  (this._node = t), (this._names = Bn(t.getAttribute("class") || ""));
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
function Hn(t, n) {
  for (var e = Zt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function qn(t, n) {
  for (var e = Zt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function pr(t) {
  return function () {
    Hn(this, t);
  };
}
function gr(t) {
  return function () {
    qn(this, t);
  };
}
function mr(t, n) {
  return function () {
    (n.apply(this, arguments) ? Hn : qn)(this, t);
  };
}
function yr(t, n) {
  var e = Bn(t + "");
  if (arguments.length < 2) {
    for (var r = Zt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? mr : n ? pr : gr)(e, n));
}
function _r() {
  this.textContent = "";
}
function xr(t) {
  return function () {
    this.textContent = t;
  };
}
function wr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function vr(t) {
  return arguments.length
    ? this.each(t == null ? _r : (typeof t == "function" ? wr : xr)(t))
    : this.node().textContent;
}
function br() {
  this.innerHTML = "";
}
function Er(t) {
  return function () {
    this.innerHTML = t;
  };
}
function $r(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Nr(t) {
  return arguments.length
    ? this.each(t == null ? br : (typeof t == "function" ? $r : Er)(t))
    : this.node().innerHTML;
}
function kr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ir() {
  return this.each(kr);
}
function Cr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Pr() {
  return this.each(Cr);
}
function Ar(t) {
  var n = typeof t == "function" ? t : Sn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Tr() {
  return null;
}
function Mr(t, n) {
  var e = typeof t == "function" ? t : Sn(t),
    r = n == null ? Tr : typeof n == "function" ? n : Wt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Sr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Lr() {
  return this.each(Sr);
}
function Rr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Dr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Or(t) {
  return this.select(t ? Dr : Rr);
}
function Gr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Br(t) {
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
function Hr(t) {
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
function qr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Br(n);
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
function Fr(t, n, e) {
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
  for (c = n ? qr : Hr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Fn(t, n, e) {
  var r = Gn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Yr(t, n) {
  return function () {
    return Fn(this, t, n);
  };
}
function Vr(t, n) {
  return function () {
    return Fn(this, t, n.apply(this, arguments));
  };
}
function zr(t, n) {
  return this.each((typeof n == "function" ? Vr : Yr)(t, n));
}
function* Ur() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Yn = [null];
function E(t, n) {
  (this._groups = t), (this._parents = n);
}
function lt() {
  return new E([[document.documentElement]], Yn);
}
function Kr() {
  return this;
}
E.prototype = lt.prototype = {
  constructor: E,
  select: we,
  selectAll: $e,
  selectChild: Ce,
  selectChildren: Me,
  filter: Se,
  data: Be,
  enter: Le,
  exit: He,
  join: qe,
  merge: Fe,
  selection: Kr,
  order: Ye,
  sort: Ve,
  call: Ue,
  nodes: Ke,
  node: We,
  size: Ze,
  empty: Qe,
  each: Je,
  attr: or,
  style: lr,
  property: dr,
  classed: yr,
  text: vr,
  html: Nr,
  raise: Ir,
  lower: Pr,
  append: Ar,
  insert: Mr,
  remove: Lr,
  clone: Or,
  datum: Gr,
  on: Fr,
  dispatch: zr,
  [Symbol.iterator]: Ur,
};
function b(t) {
  return typeof t == "string"
    ? new E([[document.querySelector(t)]], [document.documentElement])
    : new E([[t]], Yn);
}
function Wr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function dn(t, n) {
  if (((t = Wr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Zr = { passive: !1 },
  it = { capture: !0, passive: !1 };
function Lt(t) {
  t.stopImmediatePropagation();
}
function Z(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Qr(t) {
  var n = t.document.documentElement,
    e = b(t).on("dragstart.drag", Z, it);
  "onselectstart" in n
    ? e.on("selectstart.drag", Z, it)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Jr(t, n) {
  var e = t.document.documentElement,
    r = b(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", Z, it),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ht = (t) => () => t;
function Bt(
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
Bt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function jr(t) {
  return !t.ctrlKey && !t.button;
}
function ti() {
  return this.parentNode;
}
function ni(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function ei() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ri() {
  var t = jr,
    n = ti,
    e = ni,
    r = ei,
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
      .on("touchmove.drag", U, Zr)
      .on("touchend.drag touchcancel.drag", A)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var _ = T(this, n.call(this, d, g), d, g, "mouse");
      _ &&
        (b(d.view).on("mousemove.drag", m, it).on("mouseup.drag", y, it),
        Qr(d.view),
        Lt(d),
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
    b(d.view).on("mousemove.drag mouseup.drag", null),
      Jr(d.view, l),
      Z(d),
      i.mouse("end", d);
  }
  function I(d, g) {
    if (t.call(this, d, g)) {
      var _ = d.changedTouches,
        x = n.call(this, d, g),
        $ = _.length,
        B,
        K;
      for (B = 0; B < $; ++B)
        (K = T(this, x, d, g, _[B].identifier, _[B])) &&
          (Lt(d), K("start", d, _[B]));
    }
  }
  function U(d) {
    var g = d.changedTouches,
      _ = g.length,
      x,
      $;
    for (x = 0; x < _; ++x)
      ($ = i[g[x].identifier]) && (Z(d), $("drag", d, g[x]));
  }
  function A(d) {
    var g = d.changedTouches,
      _ = g.length,
      x,
      $;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        x = 0;
      x < _;
      ++x
    )
      ($ = i[g[x].identifier]) && (Lt(d), $("end", d, g[x]));
  }
  function T(d, g, _, x, $, B) {
    var K = o.copy(),
      M = dn(B || _, g),
      sn,
      cn,
      ft;
    if (
      (ft = e.call(
        d,
        new Bt("beforestart", {
          sourceEvent: _,
          target: f,
          identifier: $,
          active: s,
          x: M[0],
          y: M[1],
          dx: 0,
          dy: 0,
          dispatch: K,
        }),
        x
      )) != null
    )
      return (
        (sn = ft.x - M[0] || 0),
        (cn = ft.y - M[1] || 0),
        function ue(Mt, an, fe) {
          var ln = M,
            St;
          switch (Mt) {
            case "start":
              (i[$] = ue), (St = s++);
              break;
            case "end":
              delete i[$], --s;
            case "drag":
              (M = dn(fe || an, g)), (St = s);
              break;
          }
          K.call(
            Mt,
            d,
            new Bt(Mt, {
              sourceEvent: an,
              subject: ft,
              target: f,
              identifier: $,
              active: St,
              x: M[0] + sn,
              y: M[1] + cn,
              dx: M[0] - ln[0],
              dy: M[1] - ln[1],
              dispatch: K,
            }),
            x
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
function Qt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function Vn(t, n) {
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
  ii = /^#([0-9a-f]{3,8})$/,
  oi = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`),
  si = new RegExp(`^rgb\\(${S},${S},${S}\\)$`),
  ci = new RegExp(`^rgba\\(${Q},${Q},${Q},${st}\\)$`),
  ai = new RegExp(`^rgba\\(${S},${S},${S},${st}\\)$`),
  li = new RegExp(`^hsl\\(${st},${S},${S}\\)$`),
  ui = new RegExp(`^hsla\\(${st},${S},${S},${st}\\)$`),
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
Qt(ut, ct, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: gn,
  formatHex: gn,
  formatHex8: fi,
  formatHsl: hi,
  formatRgb: mn,
  toString: mn,
});
function gn() {
  return this.rgb().formatHex();
}
function fi() {
  return this.rgb().formatHex8();
}
function hi() {
  return zn(this).formatHsl();
}
function mn() {
  return this.rgb().formatRgb();
}
function ct(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = ii.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? yn(n)
          : e === 3
          ? new w(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? dt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? dt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = oi.exec(t))
      ? new w(n[1], n[2], n[3], 1)
      : (n = si.exec(t))
      ? new w((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = ci.exec(t))
      ? dt(n[1], n[2], n[3], n[4])
      : (n = ai.exec(t))
      ? dt((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = li.exec(t))
      ? wn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = ui.exec(t))
      ? wn(n[1], n[2] / 100, n[3] / 100, n[4])
      : pn.hasOwnProperty(t)
      ? yn(pn[t])
      : t === "transparent"
      ? new w(NaN, NaN, NaN, 0)
      : null
  );
}
function yn(t) {
  return new w((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function dt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new w(t, n, e, r);
}
function di(t) {
  return (
    t instanceof ut || (t = ct(t)),
    t ? ((t = t.rgb()), new w(t.r, t.g, t.b, t.opacity)) : new w()
  );
}
function Xt(t, n, e, r) {
  return arguments.length === 1 ? di(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Qt(
  w,
  Xt,
  Vn(ut, {
    brighter(t) {
      return (
        (t = t == null ? $t : Math.pow($t, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? ot : Math.pow(ot, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new w(Y(this.r), Y(this.g), Y(this.b), Nt(this.opacity));
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
    hex: _n,
    formatHex: _n,
    formatHex8: pi,
    formatRgb: xn,
    toString: xn,
  })
);
function _n() {
  return `#${F(this.r)}${F(this.g)}${F(this.b)}`;
}
function pi() {
  return `#${F(this.r)}${F(this.g)}${F(this.b)}${F(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function xn() {
  const t = Nt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Y(this.r)}, ${Y(this.g)}, ${Y(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function Nt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Y(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function F(t) {
  return (t = Y(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function wn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new C(t, n, e, r)
  );
}
function zn(t) {
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
function gi(t, n, e, r) {
  return arguments.length === 1 ? zn(t) : new C(t, n, e, r ?? 1);
}
function C(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Qt(
  C,
  gi,
  Vn(ut, {
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
      return new w(
        Rt(t >= 240 ? t - 240 : t + 120, i, r),
        Rt(t, i, r),
        Rt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new C(vn(this.h), pt(this.s), pt(this.l), Nt(this.opacity));
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
      const t = Nt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${vn(this.h)}, ${
        pt(this.s) * 100
      }%, ${pt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function vn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function pt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Rt(t, n, e) {
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
const Un = (t) => () => t;
function mi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function yi(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function _i(t) {
  return (t = +t) == 1
    ? Kn
    : function (n, e) {
        return e - n ? yi(n, e, t) : Un(isNaN(n) ? e : n);
      };
}
function Kn(t, n) {
  var e = n - t;
  return e ? mi(t, e) : Un(isNaN(t) ? n : t);
}
const bn = (function t(n) {
  var e = _i(n);
  function r(i, o) {
    var s = e((i = Xt(i)).r, (o = Xt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Kn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function X(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Ht = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Dt = new RegExp(Ht.source, "g");
function xi(t) {
  return function () {
    return t;
  };
}
function wi(t) {
  return function (n) {
    return t(n) + "";
  };
}
function vi(t, n) {
  var e = (Ht.lastIndex = Dt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Ht.exec(t)) && (i = Dt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: X(r, i) })),
      (e = Dt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? wi(a[0].x)
        : xi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var En = 180 / Math.PI,
  qt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Wn(t, n, e, r, i, o) {
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
var gt;
function bi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? qt : Wn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Ei(t) {
  return t == null ||
    (gt || (gt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    gt.setAttribute("transform", t),
    !(t = gt.transform.baseVal.consolidate()))
    ? qt
    : ((t = t.matrix), Wn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Zn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var y = p.push("translate(", null, n, null, e);
      m.push({ i: y - 4, x: X(l, h) }, { i: y - 2, x: X(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: X(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: X(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var y = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: y - 4, x: X(l, h) }, { i: y - 2, x: X(u, f) });
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
var $i = Zn(bi, "px, ", "px)", "deg)"),
  Ni = Zn(Ei, ", ", ")", ")"),
  j = 0,
  nt = 0,
  tt = 0,
  Qn = 1e3,
  kt,
  et,
  It = 0,
  V = 0,
  At = 0,
  at = typeof performance == "object" && performance.now ? performance : Date,
  Jn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Jt() {
  return V || (Jn(ki), (V = at.now() + At));
}
function ki() {
  V = 0;
}
function Ct() {
  this._call = this._time = this._next = null;
}
Ct.prototype = jn.prototype = {
  constructor: Ct,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Jt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        et !== this &&
        (et ? (et._next = this) : (kt = this), (et = this)),
      (this._call = t),
      (this._time = e),
      Ft();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Ft());
  },
};
function jn(t, n, e) {
  var r = new Ct();
  return r.restart(t, n, e), r;
}
function Ii() {
  Jt(), ++j;
  for (var t = kt, n; t; )
    (n = V - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --j;
}
function $n() {
  (V = (It = at.now()) + At), (j = nt = 0);
  try {
    Ii();
  } finally {
    (j = 0), Pi(), (V = 0);
  }
}
function Ci() {
  var t = at.now(),
    n = t - It;
  n > Qn && ((At -= n), (It = t));
}
function Pi() {
  for (var t, n = kt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (kt = e)));
  (et = t), Ft(r);
}
function Ft(t) {
  if (!j) {
    nt && (nt = clearTimeout(nt));
    var n = t - V;
    n > 24
      ? (t < 1 / 0 && (nt = setTimeout($n, t - at.now() - At)),
        tt && (tt = clearInterval(tt)))
      : (tt || ((It = at.now()), (tt = setInterval(Ci, Qn))), (j = 1), Jn($n));
  }
}
function Nn(t, n, e) {
  var r = new Ct();
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
var Ai = Kt("start", "end", "cancel", "interrupt"),
  Ti = [],
  te = 0,
  kn = 1,
  Yt = 2,
  vt = 3,
  In = 4,
  Vt = 5,
  bt = 6;
function Tt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Mi(t, e, {
    name: n,
    index: r,
    group: i,
    on: Ai,
    tween: Ti,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: te,
  });
}
function jt(t, n) {
  var e = P(t, n);
  if (e.state > te) throw new Error("too late; already scheduled");
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
function Mi(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = jn(o, 0, e.time));
  function o(l) {
    (e.state = kn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== kn) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === vt) return Nn(s);
        p.state === In
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
          ((e.state = In), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Yt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Yt)
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
            : (e.timer.restart(a), (e.state = Vt), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Vt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = bt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Si(t, n) {
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
      (i = r.state > Yt && r.state < Vt),
        (r.state = bt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Li(t) {
  return this.each(function () {
    Si(this, t);
  });
}
function Ri(t, n) {
  var e, r;
  return function () {
    var i = L(this, t),
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
function Di(t, n, e) {
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
function Oi(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = P(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Ri : Di)(e, t, n));
}
function tn(t, n, e) {
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
function ne(t, n) {
  var e;
  return (
    typeof n == "number"
      ? X
      : n instanceof ct
      ? bn
      : (e = ct(n))
      ? ((n = e), bn)
      : vi
  )(t, n);
}
function Gi(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Bi(t) {
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
function Hi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function qi(t, n, e) {
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
function Fi(t, n, e) {
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
function Yi(t, n) {
  var e = Pt(t),
    r = e === "transform" ? Ni : ne;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Fi : qi)(e, r, tn(this, "attr." + t, n))
      : n == null
      ? (e.local ? Bi : Gi)(e)
      : (e.local ? Hi : Xi)(e, r, n)
  );
}
function Vi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function zi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Ui(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && zi(t, o)), e;
  }
  return (i._value = n), i;
}
function Ki(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Vi(t, o)), e;
  }
  return (i._value = n), i;
}
function Wi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Pt(t);
  return this.tween(e, (r.local ? Ui : Ki)(r, n));
}
function Zi(t, n) {
  return function () {
    jt(this, t).delay = +n.apply(this, arguments);
  };
}
function Qi(t, n) {
  return (
    (n = +n),
    function () {
      jt(this, t).delay = n;
    }
  );
}
function Ji(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Zi : Qi)(n, t))
    : P(this.node(), n).delay;
}
function ji(t, n) {
  return function () {
    L(this, t).duration = +n.apply(this, arguments);
  };
}
function to(t, n) {
  return (
    (n = +n),
    function () {
      L(this, t).duration = n;
    }
  );
}
function no(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ji : to)(n, t))
    : P(this.node(), n).duration;
}
function eo(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    L(this, t).ease = n;
  };
}
function ro(t) {
  var n = this._id;
  return arguments.length ? this.each(eo(n, t)) : P(this.node(), n).ease;
}
function io(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    L(this, t).ease = e;
  };
}
function oo(t) {
  if (typeof t != "function") throw new Error();
  return this.each(io(this._id, t));
}
function so(t) {
  typeof t != "function" && (t = Rn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new G(r, this._parents, this._name, this._id);
}
function co(t) {
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
function ao(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function lo(t, n, e) {
  var r,
    i,
    o = ao(n) ? jt : L;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function uo(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? P(this.node(), e).on.on(t)
    : this.each(lo(e, t, n));
}
function fo(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function ho() {
  return this.on("end.remove", fo(this._id));
}
function po(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Wt(t));
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
        Tt(l[f], n, e, f, l, P(u, e)));
  return new G(o, this._parents, n, e);
}
function go(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Ln(t));
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
          (p = f[y]) && Tt(p, n, e, y, f, m);
        o.push(f), s.push(u);
      }
  return new G(o, s, n, e);
}
var mo = lt.prototype.constructor;
function yo() {
  return new mo(this._groups, this._parents);
}
function _o(t, n) {
  var e, r, i;
  return function () {
    var o = J(this, t),
      s = (this.style.removeProperty(t), J(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function ee(t) {
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
function wo(t, n, e) {
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
function vo(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = L(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = ee(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function bo(t, n, e) {
  var r = (t += "") == "transform" ? $i : ne;
  return n == null
    ? this.styleTween(t, _o(t, r)).on("end.style." + t, ee(t))
    : typeof n == "function"
    ? this.styleTween(t, wo(t, r, tn(this, "style." + t, n))).each(
        vo(this._id, t)
      )
    : this.styleTween(t, xo(t, r, n), e).on("end.style." + t, null);
}
function Eo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function $o(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Eo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function No(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, $o(t, n, e ?? ""));
}
function ko(t) {
  return function () {
    this.textContent = t;
  };
}
function Io(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Co(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Io(tn(this, "text", t))
      : ko(t == null ? "" : t + "")
  );
}
function Po(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Ao(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Po(i)), n;
  }
  return (r._value = t), r;
}
function To(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Ao(t));
}
function Mo() {
  for (
    var t = this._name,
      n = this._id,
      e = re(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = P(a, n);
        Tt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new G(r, this._parents, t, e);
}
function So() {
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
      var l = L(this, r),
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
var Lo = 0;
function G(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function re() {
  return ++Lo;
}
var R = lt.prototype;
G.prototype = {
  constructor: G,
  select: po,
  selectAll: go,
  selectChild: R.selectChild,
  selectChildren: R.selectChildren,
  filter: so,
  merge: co,
  selection: yo,
  transition: Mo,
  call: R.call,
  nodes: R.nodes,
  node: R.node,
  size: R.size,
  empty: R.empty,
  each: R.each,
  on: uo,
  attr: Yi,
  attrTween: Wi,
  style: bo,
  styleTween: No,
  text: Co,
  textTween: To,
  remove: ho,
  tween: Oi,
  delay: Ji,
  duration: no,
  ease: ro,
  easeVarying: oo,
  end: So,
  [Symbol.iterator]: R[Symbol.iterator],
};
function Ro(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Do = { time: null, delay: 0, duration: 250, ease: Ro };
function Oo(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Go(t) {
  var n, e;
  t instanceof G
    ? ((n = t._id), (t = t._name))
    : ((n = re()), ((e = Do).time = Jt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Tt(a, t, n, l, s, e || Oo(a, n));
  return new G(r, this._parents, t, n);
}
lt.prototype.interrupt = Li;
lt.prototype.transition = Go;
const zt = Math.PI,
  Ut = 2 * zt,
  q = 1e-6,
  Bo = Ut - q;
function ie(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Xo(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return ie;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Ho {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? ie : Xo(n));
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
          T = o * Math.tan((zt - Math.acos((y + f - I) / (2 * U * A))) / 2),
          d = T / A,
          g = T / U;
        Math.abs(d - 1) > q && this._append`L${n + d * u},${e + d * h}`,
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
      : (Math.abs(this._x1 - l) > q || Math.abs(this._y1 - u) > q) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Ut) + Ut),
        f > Bo
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > q &&
            this._append`A${r},${r},0,${+(f >= zt)},${h},${(this._x1 =
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
function qo(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Fo(t, n) {
  return fetch(t, n).then(qo);
}
function Yo(t) {
  return (n, e) => Fo(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Vo = Yo("application/xml");
function rt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
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
class nn {
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
    if (b("#" + this.id).node() != null) return;
    const n = await Vo(this.url);
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
      this.sensor.node().append(b(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          ri()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
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
  H = {
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
  oe = ["path26583", "path26585"],
  mt = { path26583: "+ve terminal of LED", path26585: "-ve terminal of LED" },
  zo = ["res_1", "res_2"],
  yt = { res_1: "Resistor", res_2: "Resistor" };
class Uo {
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
      const e = H[this.connections[this.connections.length - 2].connector]
          ? `${
              H[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : yt[this.connections[this.connections.length - 2].connector]
          ? yt[this.connections[this.connections.length - 2].connector]
          : mt[this.connections[this.connections.length - 2].connector]
          ? mt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = H[this.connections[this.connections.length - 1].connector]
          ? `${
              H[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : yt[this.connections[this.connections.length - 1].connector]
          ? yt[this.connections[this.connections.length - 1].connector]
          : mt[this.connections[this.connections.length - 1].connector]
          ? mt[this.connections[this.connections.length - 1].connector]
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
class Ko {
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
const Wo = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = ["GPIO", "GND", "res_1", "res_2", "path26583", "path26585"];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          e++;
          return;
        }
        if (H[r.connector] == "GND") {
          e++;
          return;
        }
        if (
          H[r.connector].includes("GPIO") &&
          H[r.connector].includes(document.querySelector("#ledPin").value)
        ) {
          e++;
          return;
        }
      }),
      e == 6
    );
  },
  v = b("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Cn = (t, n, e) => {
    v.append("circle")
      .attr("cx", t)
      .attr("cy", n)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("id", e);
  },
  Pn = (t, n) => {
    en.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  Zo = window.innerWidth < 850,
  An = {
    desktop: {
      raspberry: { scale: 1, x: 0, y: 0 },
      led: { scale: 0.3, x: 400, y: 25 },
      resistor: { scale: 0.1, x: 300, y: 250 },
    },
    mobile: {
      raspberry: { scale: 0.5, x: 10, y: 10 },
      led: { scale: 0.15, x: 200, y: 50 },
      resistor: { scale: 0.05, x: 150, y: 200 },
    },
  },
  k = Zo ? An.mobile : An.desktop,
  Qo = new nn(
    "raspberry",
    v,
    "images/pi3dirk.svg",
    k.raspberry.scale,
    !1,
    k.raspberry.x,
    k.raspberry.y
  ),
  Jo = new nn(
    "resistorComponent",
    v,
    "images/resistor.svg",
    k.resistor.scale,
    !1,
    k.resistor.x,
    k.resistor.y
  ),
  Tn = new nn("led", v, "images/led.svg", k.led.scale, !1, k.led.x, k.led.y),
  en = v.append("g").attr("id", "pathsGroup"),
  rn = {
    rasberryPi:
      "Raspberry Pi: Acts as the power source and controller. A GPIO pin is connected to the LED anode (positive leg) to supply voltage and control the LED’s on/off state programmatically. A GND pin is connected to the resistor’s other end to complete the circuit.",
    ledlight:
      "LED: Emits light when current flows through it. The anode (longer leg) is connected to a Raspberry Pi GPIO pin, while the cathode (shorter leg) is connected to a resistor to limit current.",
    resistor:
      "Resistor: Protects the LED by limiting current flow. One end is connected to the LED cathode, and the other end is connected to a Raspberry Pi GND pin",
  },
  se = document.getElementById("rasberryPi"),
  ce = document.getElementById("ledlight"),
  ae = document.getElementById("resistor"),
  _t = document.getElementById("componentDescription"),
  le = document.getElementById("displayInfo"),
  jo = document.getElementById("codeSubmit"),
  ts = document.getElementById("undoButton"),
  W = document.getElementById("successMessage");
se.addEventListener("click", async () => await Qo.load());
ae.addEventListener("click", () => Jo.load());
ce.addEventListener("click", () => {
  Tn.load().then(() => {
    const t = v.select(`#${Tn.id}`);
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
const on = (t, n) => {
  t.addEventListener("mouseover", () => {
    (_t.innerHTML = n), (_t.style.display = "block");
  }),
    t.addEventListener("mouseout", () => {
      (_t.innerHTML = "Hover over a component to see its description."),
        (_t.style.display = "none");
    });
};
on(se, rn.rasberryPi);
on(ce, rn.ledlight);
on(ae, rn.resistor);
const Ot = (t) =>
  z.includes(t.srcElement.id) ||
  oe.includes(t.srcElement.id) ||
  zo.includes(t.srcElement.id);
let N;
const O = new Uo("connectionLog"),
  xt = new Ko("errorBox", "errorHeading", "errorText", "closeErrorBox");
let D = 0;
const Mn = (t) => new Promise((n) => setTimeout(() => n(), t)),
  ns = async (t, n, e, r) => {
    const i = document.querySelector(t),
      o = i.getAttribute("fill") || "white";
    for (;;)
      i.setAttribute("fill", r),
        await Mn(n),
        i.setAttribute("fill", o),
        await Mn(e);
  },
  es = () => {
    const t = k.resistor.y,
      e = 100 * k.resistor.scale,
      r = t + e + 80,
      i = k.resistor.x + 100;
    (W.style.transform = `translate(${i}px, ${r}px)`),
      (W.textContent = "LED is blinking successfully!"),
      (W.style.display = "block"),
      W.classList.add("fade-in-scale"),
      setTimeout(() => {
        (W.style.display = "none"), W.classList.remove("fade-in-scale");
      }, 1e4);
  },
  rs = (t) => {
    en.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((i) => i.remove());
    const e = v.select(`#marker-start-${t.replace("path", "")}`);
    e.empty() || e.remove();
    const r = v.select(`#marker-end-${t.replace("path", "")}`);
    r.empty() || r.remove();
  },
  is = () => {
    if (N) {
      en.selectAll(`path[id^="path${D}"]`)
        .nodes()
        .forEach((r) => r.remove());
      const n = v.select(`#marker-start-${D}`);
      n.empty() || n.remove();
      const e = O.connections[O.connections.length - 1];
      z.includes(e.connector) && b(`#${e.connector}`).style("fill", "#9a916c"),
        (N = null),
        console.log("Removed all incomplete paths");
      return;
    }
    if (O.connections.length > 0) {
      const t = O.connections[O.connections.length - 1],
        n = t.lineID;
      parseInt(n.replace("path", "")),
        rs(n),
        z.includes(t.connector) &&
          b(`#${t.connector}`).style("fill", "#9a916c"),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
ts.addEventListener("click", () => {
  O.undoLastConnection(), is();
});
v.on("dblclick", (t) => {
  if (Ot(t) && !N) {
    (N = new Ho()),
      N.moveTo(t.offsetX, t.offsetY),
      z.includes(t.srcElement.id)
        ? b(`#${t.srcElement.id}`).style("fill", "black")
        : Cn(t.offsetX, t.offsetY, `marker-start-${D}`),
      O.addConnection({
        lineID: `path${D}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      v.style("cursor", "crosshair"),
      console.log("Path started");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !Ot(t)) {
    N &&
      (N.lineTo(t.offsetX, t.offsetY),
      Pn(N.toString(), `path${D}`),
      console.log("Path segment added"));
    return;
  }
  if (Ot(t) && N) {
    N.lineTo(t.offsetX, t.offsetY),
      Pn(N.toString(), `path${D}`),
      z.includes(t.srcElement.id)
        ? b(`#${t.srcElement.id}`).style("fill", "black")
        : Cn(t.offsetX, t.offsetY, `marker-end-${D}`),
      O.addConnection({
        lineID: `path${D}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      D++,
      v.style("cursor", "default"),
      (N = null),
      console.log("Path completed");
    return;
  }
});
v.on("mouseover", (t) => {
  z.includes(t.srcElement.id) && (le.innerHTML = H[t.srcElement.id]);
});
v.on("mouseout", (t) => {
  (z.includes(t.srcElement.id) || oe.includes(t.srcElement.id)) &&
    (le.innerHTML = "CONNECTOR INFO");
});
jo.addEventListener("click", () => {
  const t = Wo(O.getConnectionLog()),
    n = document.querySelector("#blinkTime").value,
    e = document.querySelector("#waitTime").value,
    r = document.querySelector("#ledColor").value;
  if (n === "" || e === "") {
    xt.throw("Error", "Please enter the blink time and wait time");
    return;
  }
  const i = parseInt(n),
    o = parseInt(e);
  if (isNaN(i) || isNaN(o) || i <= 0 || o <= 0) {
    xt.throw("Error", "Blink time and wait time must be positive numbers");
    return;
  }
  if (t === !0) {
    const s = i * 1e3,
      c = o * 1e3;
    ns("#ledLight", s, c, r),
      es(),
      document.querySelector("#my-drawer-4").click();
  } else
    t.error
      ? xt.throw("Error", t.error)
      : xt.throw("Error", "Please connect the components properly.");
});
