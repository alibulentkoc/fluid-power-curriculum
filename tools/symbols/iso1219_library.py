INK='#1B3A55'; TEAL='#0E7E8C'; AMB='#DD841A'
# ---- reference emitters (matplotlib y-up -> SVG y-down), with scale ----
def L(cx,cy,dx1,dy1,dx2,dy2,dash=False,lw=1.5,s=1.0):
    d=' stroke-dasharray="4 2"' if dash else ''
    return f'<line x1="{cx+s*dx1:.1f}" y1="{cy-s*dy1:.1f}" x2="{cx+s*dx2:.1f}" y2="{cy-s*dy2:.1f}" stroke="{INK}" stroke-width="{lw}"{d}/>'
def PL(cx,cy,offs,dash=False,lw=1.2,s=1.0):
    pts=' '.join(f'{cx+s*dx:.1f},{cy-s*dy:.1f}' for dx,dy in offs); d=' stroke-dasharray="4 2"' if dash else ''
    return f'<polyline points="{pts}" fill="none" stroke="{INK}" stroke-width="{lw}"{d}/>'
def PG(cx,cy,offs,s=1.0,fill=INK):
    pts=' '.join(f'{cx+s*dx:.1f},{cy-s*dy:.1f}' for dx,dy in offs)
    return f'<polygon points="{pts}" fill="{fill}" stroke="{INK}" stroke-width="1"/>'
def PO(cx,cy,offs,lw=1.3,s=1.0):
    pts=' '.join(f'{cx+s*dx:.1f},{cy-s*dy:.1f}' for dx,dy in offs)
    return f'<polyline points="{pts}" fill="none" stroke="{INK}" stroke-width="{lw}"/>'
def CI(cx,cy,dx,dy,r,fill='none',lw=1.3,s=1.0):
    return f'<circle cx="{cx+s*dx:.1f}" cy="{cy-s*dy:.1f}" r="{r*s:.1f}" fill="{fill}" stroke="{INK}" stroke-width="{lw}"/>'
def RE(cx,cy,dx,dy,w,h,lw=1.6,s=1.0):
    return f'<rect x="{cx+s*(dx-w/2):.1f}" y="{cy-s*(dy+h/2):.1f}" width="{w*s:.1f}" height="{h*s:.1f}" fill="none" stroke="{INK}" stroke-width="{lw}"/>'
def _spool_left(cx,cy,s,bs=32):
    yp=-bs/2+6; xs=bs/2-4; xe=-bs/2+4
    return [L(cx,cy,xs,yp,xe,yp,lw=1.6,s=s), PG(cx,cy,[(xe+4,yp+2.5),(xe,yp),(xe+4,yp-2.5)],s=s)]
def _spring(cx,cy,s,bs=32):
    sb=bs/2; xs=[0,5,-5,5,-5,0]; ys=[sb,sb+4,sb+9,sb+14,sb+19,sb+23]
    return [PL(cx,cy,list(zip(xs,ys)),lw=1.4,s=s), L(cx,cy,-8,sb+2,8,sb+25,lw=1.4,s=s), PG(cx,cy,[(8,sb+25),(5,sb+22),(7,sb+21)],s=s)]
def ref_relief(cx,cy,s=1.0):
    g=[RE(cx,cy,0,0,32,32,s=s)]+_spool_left(cx,cy,s)+_spring(cx,cy,s)
    g+=[L(cx,cy,-16,-10,-26,-10,lw=1.6,s=s), L(cx,cy,16,-10,26,-10,lw=1.6,s=s),
        PL(cx,cy,[(20,-10),(20,-22),(0,-22),(0,-16)],dash=True,s=s)]
    return "\n".join(g)
def ref_counterbalance(cx,cy,s=1.0):
    g=[RE(cx,cy,0,0,32,32,s=s)]+_spool_left(cx,cy,s)+_spring(cx,cy,s)
    g+=[L(cx,cy,-36,-10,-16,-10,lw=1.6,s=s), L(cx,cy,16,-10,36,-10,lw=1.6,s=s),
        CI(cx,cy,-28,-10,1.8,fill=INK,s=s), CI(cx,cy,28,-10,1.8,fill=INK,s=s),
        L(cx,cy,-28,-10,-28,-26,lw=1.4,s=s), L(cx,cy,28,-26,28,-10,lw=1.4,s=s),
        L(cx,cy,-28,-26,-9,-26,lw=1.4,s=s), L(cx,cy,4,-26,28,-26,lw=1.4,s=s),
        PO(cx,cy,[(-5,-21),(-9,-26),(-5,-31)],s=s), CI(cx,cy,0,-26,4,fill='#FFFFFF',s=s),
        PL(cx,cy,[(20,-10),(20,-18),(0,-18),(0,-16)],dash=True,s=s)]
    return "\n".join(g)
def ref_poc(cx,cy,s=1.0):
    g=[RE(cx,cy,0,0,36,32,s=s), L(cx,cy,-45,0,-18,0,lw=1.6,s=s), L(cx,cy,18,0,45,0,lw=1.6,s=s),
       L(cx,cy,-18,0,-6,0,lw=1.6,s=s), L(cx,cy,11,0,18,0,lw=1.6,s=s),
       PO(cx,cy,[(5,7),(11,0),(5,-7)],s=s), CI(cx,cy,0,0,6,fill='#FFFFFF',s=s),
       PL(cx,cy,[(10,16),(30,16),(30,28)],dash=True,s=s)]
    return "\n".join(g)
# ---- my six SVG-native symbols ----
def d_res(x,y):
    return (f'<path d="M{x-22},{y-12} L{x-22},{y+16} L{x+22},{y+16} L{x+22},{y-12}" fill="none" stroke="{INK}" stroke-width="2.5"/>'
            f'<line x1="{x-9}" y1="{y-26}" x2="{x-9}" y2="{y+4}" stroke="{INK}" stroke-width="1.6"/><line x1="{x+9}" y1="{y-26}" x2="{x+9}" y2="{y+13}" stroke="{INK}" stroke-width="1.6"/>')
def d_pump(x,y):
    return (f'<circle cx="{x}" cy="{y}" r="20" fill="none" stroke="{INK}" stroke-width="2.5"/><path d="M{x-2},{y-11} L{x-2},{y+11} L{x+18},{y} Z" fill="{TEAL}"/>'
            f'<line x1="{x+20}" y1="{y}" x2="{x+34}" y2="{y}" stroke="{INK}" stroke-width="1.8"/><line x1="{x-20}" y1="{y}" x2="{x-34}" y2="{y}" stroke="{INK}" stroke-width="1.8"/><line x1="{x-34}" y1="{y-5}" x2="{x-34}" y2="{y+5}" stroke="{INK}" stroke-width="1.8"/>')
def d_motor(x,y):
    return (f'<circle cx="{x}" cy="{y}" r="20" fill="none" stroke="{INK}" stroke-width="2.5"/><text x="{x}" y="{y+6}" font-size="18" font-weight="700" fill="{INK}" text-anchor="middle" font-family="sans-serif">M</text>'
            f'<line x1="{x+20}" y1="{y}" x2="{x+34}" y2="{y}" stroke="{INK}" stroke-width="1.8"/><line x1="{x+34}" y1="{y-5}" x2="{x+34}" y2="{y+5}" stroke="{INK}" stroke-width="1.8"/>')
def d_filter(x,y):
    return (f'<path d="M{x-18},{y} L{x},{y-18} L{x+18},{y} L{x},{y+18} Z" fill="none" stroke="{INK}" stroke-width="2.2"/>'
            f'<line x1="{x}" y1="{y-16}" x2="{x}" y2="{y+16}" stroke="{INK}" stroke-width="1.5" stroke-dasharray="3 2"/>'
            f'<line x1="{x-34}" y1="{y}" x2="{x-18}" y2="{y}" stroke="{INK}" stroke-width="1.8"/><line x1="{x+18}" y1="{y}" x2="{x+34}" y2="{y}" stroke="{INK}" stroke-width="1.8"/>')
def d_dcv(x,y):
    g=[]; bw,bh=26,30; Lx=x-3*bw/2; C=x-bw/2; Rt=x+bw/2
    for bxx in (Lx,C,Rt): g.append(f'<rect x="{bxx}" y="{y-bh/2}" width="{bw}" height="{bh}" fill="none" stroke="{INK}" stroke-width="1.8"/>')
    ax,bxp=C+7,C+bw-7
    for lx,lab in ((ax,'A'),(bxp,'B')): g.append(f'<line x1="{lx}" y1="{y-bh/2}" x2="{lx}" y2="{y-bh/2-14}" stroke="{INK}" stroke-width="1.6"/><text x="{lx}" y="{y-bh/2-18}" font-size="8" font-weight="700" fill="{TEAL}" text-anchor="middle">{lab}</text>')
    for lx,lab in ((ax,'P'),(bxp,'T')): g.append(f'<line x1="{lx}" y1="{y+bh/2}" x2="{lx}" y2="{y+bh/2+14}" stroke="{INK}" stroke-width="1.6"/><text x="{lx}" y="{y+bh/2+24}" font-size="8" font-weight="700" fill="{TEAL}" text-anchor="middle">{lab}</text>')
    g.append(f'<line x1="{ax}" y1="{y+bh/2-3}" x2="{bxp}" y2="{y+bh/2-3}" stroke="{TEAL}" stroke-width="1.6"/>')
    g.append(f'<line x1="{ax}" y1="{y-bh/2+3}" x2="{ax}" y2="{y-3}" stroke="{TEAL}" stroke-width="1.4"/><line x1="{ax-3}" y1="{y-3}" x2="{ax+3}" y2="{y-3}" stroke="{TEAL}" stroke-width="1.4"/>')
    g.append(f'<line x1="{bxp}" y1="{y-bh/2+3}" x2="{bxp}" y2="{y-3}" stroke="{TEAL}" stroke-width="1.4"/><line x1="{bxp-3}" y1="{y-3}" x2="{bxp+3}" y2="{y-3}" stroke="{TEAL}" stroke-width="1.4"/>')
    g.append(f'<line x1="{Lx+6}" y1="{y+8}" x2="{Lx+6}" y2="{y-8}" stroke="{TEAL}" stroke-width="1.4" marker-end="url(#ah)"/><line x1="{Lx+bw-6}" y1="{y-8}" x2="{Lx+bw-6}" y2="{y+8}" stroke="{TEAL}" stroke-width="1.4" marker-end="url(#ah)"/>')
    g.append(f'<line x1="{Rt+6}" y1="{y+8}" x2="{Rt+bw-6}" y2="{y-8}" stroke="{TEAL}" stroke-width="1.4" marker-end="url(#ah)"/><line x1="{Rt+bw-6}" y1="{y+8}" x2="{Rt+6}" y2="{y-8}" stroke="{TEAL}" stroke-width="1.4" marker-end="url(#ah)"/>')
    g.append(f'<rect x="{Lx-16}" y="{y-8}" width="14" height="16" fill="none" stroke="{INK}" stroke-width="1.4"/><line x1="{Lx-16}" y1="{y+8}" x2="{Lx-2}" y2="{y-8}" stroke="{INK}" stroke-width="1.2"/>')
    g.append(f'<rect x="{Rt+bw+2}" y="{y-8}" width="14" height="16" fill="none" stroke="{INK}" stroke-width="1.4"/><line x1="{Rt+bw+2}" y1="{y+8}" x2="{Rt+bw+16}" y2="{y-8}" stroke="{INK}" stroke-width="1.2"/>')
    return "\n".join(g)
def d_cyl(x,y):
    bx,by,w,h=x-34,y-14,58,28
    return (f'<rect x="{bx}" y="{by}" width="{w}" height="{h}" fill="none" stroke="{INK}" stroke-width="2.2"/><line x1="{bx+18}" y1="{by}" x2="{bx+18}" y2="{by+h}" stroke="{INK}" stroke-width="4"/>'
            f'<line x1="{bx+18}" y1="{y}" x2="{bx+w+14}" y2="{y}" stroke="#5B6B79" stroke-width="4.5"/><rect x="{bx+w+14}" y="{y-6}" width="10" height="12" rx="2" fill="{AMB}"/>'
            f'<line x1="{bx+8}" y1="{by+h}" x2="{bx+8}" y2="{by+h+14}" stroke="{INK}" stroke-width="1.6"/><line x1="{bx+w-10}" y1="{by+h}" x2="{bx+w-10}" y2="{by+h+14}" stroke="{INK}" stroke-width="1.6"/>')

# ===== FAITHFUL PORTS of the remaining reference symbols (matplotlib y-up -> SVG y-down) =====
def ref_pump(cx,cy,s=1.0):        # doc3 draw_pump_fixed: circle + solid up-triangle
    g=[CI(cx,cy,0,0,16,s=s), PG(cx,cy,[(-4,9),(0,16),(4,9)],s=s)]
    g+=[L(cx,cy,0,16,0,28,lw=1.6,s=s), L(cx,cy,0,-16,0,-28,lw=1.6,s=s)]   # delivery up / suction down (legend stubs)
    return "\n".join(g)
def ref_hmotor(cx,cy,s=1.0):      # doc3 draw_hydraulic_motor: circle + inward triangle
    return "\n".join([CI(cx,cy,0,0,16,s=s), PG(cx,cy,[(-5,16),(0,9),(5,16)],s=s),
                      L(cx,cy,0,16,0,28,lw=1.6,s=s), L(cx,cy,0,-16,0,-28,lw=1.6,s=s)])
def ref_emotor(cx,cy,s=1.0):      # electric motor: circle + M (standard; reference uses a rotation arc — flag for choice)
    return "\n".join([CI(cx,cy,0,0,16,s=s),
                      f'<text x="{cx}" y="{cy+5.5*s}" font-size="{16*s:.0f}" font-weight="700" fill="{INK}" text-anchor="middle" font-family="sans-serif">M</text>',
                      L(cx,cy,0,16,0,28,lw=1.6,s=s), L(cx,cy,0,-16,0,-28,lw=1.6,s=s)])
def ref_reservoir(cx,cy,s=1.0):   # doc3 draw_open_reservoir: open-top box (w40 h18)
    return "\n".join([L(cx,cy,-20,18,-20,0,lw=1.8,s=s), L(cx,cy,-20,0,20,0,lw=1.8,s=s), L(cx,cy,20,0,20,18,lw=1.8,s=s)])
def ref_cyl(cx,cy,s=1.0):         # doc3 draw_double_acting_cylinder: barrel, 2 top ports, piston plate, rod right
    g=[RE(cx,cy,0,0,50,20,lw=1.8,s=s),
       L(cx,cy,-19,10,-19,15,lw=1.4,s=s), L(cx,cy,19,10,19,15,lw=1.4,s=s),          # ports on top
       RE(cx,cy,-10.5,0,5,18,lw=1.5,s=s),                                            # piston plate (centre at x-w/2+12=-13 -> plate spans -13..-8, centre -10.5)
       L(cx,cy,-8,0,50,0,lw=1.8,s=s)]                                                # rod extends right past barrel
    return "\n".join(g)
def ref_filter(cx,cy,s=1.0):      # doc3 draw_filter_element: diamond + HORIZONTAL dashed (perp) + vertical stubs
    g=[PL(cx,cy,[(0,18),(18,0),(0,-18),(-18,0),(0,18)],lw=1.6,s=s),
       f'<line x1="{cx-18*s:.1f}" y1="{cy:.1f}" x2="{cx+18*s:.1f}" y2="{cy:.1f}" stroke="{INK}" stroke-width="1.2" stroke-dasharray="3 2"/>',
       L(cx,cy,0,18,0,26,lw=1.6,s=s), L(cx,cy,0,-18,0,-26,lw=1.6,s=s)]
    return "\n".join(g)
def ref_check(cx,cy,s=1.0):       # doc1 draw_pure_check_valve: flow lines + hollow ball + right-facing V-seat
    return "\n".join([L(cx,cy,-40,0,-6,0,lw=1.6,s=s), L(cx,cy,11,0,40,0,lw=1.6,s=s),
                      PO(cx,cy,[(5,7),(11,0),(5,-7)],s=s), CI(cx,cy,0,0,6,fill='#FFFFFF',s=s)])
def ref_flow_control(cx,cy,s=1.0):# doc1 draw_adjustable_flow_control: line + restriction arcs + adjustability arrow
    g=[L(cx,cy,-40,0,40,0,lw=1.6,s=s)]
    g.append(f'<path d="M{cx-8*s:.1f},{cy-5.3*s:.1f} Q{cx:.1f},{cy+4*s:.1f} {cx+8*s:.1f},{cy-5.3*s:.1f}" fill="none" stroke="{INK}" stroke-width="1.5"/>')  # top arc
    g.append(f'<path d="M{cx-8*s:.1f},{cy+5.3*s:.1f} Q{cx:.1f},{cy-4*s:.1f} {cx+8*s:.1f},{cy+5.3*s:.1f}" fill="none" stroke="{INK}" stroke-width="1.5"/>')  # bottom arc
    g.append(L(cx,cy,-10,-10,10,10,lw=1.4,s=s)); g.append(PG(cx,cy,[(10,10),(5,9),(9,5)],s=s))   # adjustability
    return "\n".join(g)
def ref_accumulator(cx,cy,s=1.0): # doc3 draw_gas_accumulator: capsule + bladder line + stub
    w,h=22,30
    g=[RE(cx,cy,0,0,w,h*0.5,lw=1.5,s=s)]
    g.append(f'<path d="M{cx-w/2*s:.1f},{cy-h/4*s:.1f} A{w/2*s:.1f},{h/4*s:.1f} 0 0 1 {cx+w/2*s:.1f},{cy-h/4*s:.1f}" fill="none" stroke="{INK}" stroke-width="1.5"/>')  # top cap
    g.append(f'<path d="M{cx-w/2*s:.1f},{cy+h/4*s:.1f} A{w/2*s:.1f},{h/4*s:.1f} 0 0 0 {cx+w/2*s:.1f},{cy+h/4*s:.1f}" fill="none" stroke="{INK}" stroke-width="1.5"/>')  # bottom cap
    g.append(L(cx,cy,-w/2,0,w/2,0,lw=1.4,s=s))                       # bladder line
    g.append(L(cx,cy,0,-h/2,0,-h/2-8,lw=1.6,s=s))                    # stub
    return "\n".join(g)
def ref_dcv43(cx,cy,s=1.0):       # CORRECT 4/3 tandem: all four ports on CENTRE envelope; flanks parallel/crossed
    bw,bh=32,36
    xL=cx-bw*1.5; xC=cx-bw*0.5; xR=cx+bw*0.5
    g=[RE0(xL,cy-bh/2,bw,bh),RE0(xC,cy-bh/2,bw,bh),RE0(xR,cy-bh/2,bw,bh)]
    Ax=cx-9; Bx=cx+9; top=cy-bh/2; bot=cy+bh/2
    g.append(f'<polyline points="{Ax},{bot-3} {Ax},{cy+8} {Bx},{cy+8} {Bx},{bot-3}" fill="none" stroke="{TEAL}" stroke-width="1.5"/>')  # tandem P-T
    for px in (Ax,Bx): g.append(f'<line x1="{px}" y1="{top+3}" x2="{px}" y2="{cy-9}" stroke="{TEAL}" stroke-width="1.4"/><line x1="{px-3.5}" y1="{cy-9}" x2="{px+3.5}" y2="{cy-9}" stroke="{TEAL}" stroke-width="1.4"/>')  # A,B blocked
    g.append(f'<line x1="{xL+9}" y1="{bot-4}" x2="{xL+9}" y2="{top+6}" stroke="{TEAL}" stroke-width="1.3" marker-end="url(#ah)"/><line x1="{xL+bw-9}" y1="{top+4}" x2="{xL+bw-9}" y2="{bot-6}" stroke="{TEAL}" stroke-width="1.3" marker-end="url(#ah)"/>')  # parallel
    g.append(f'<line x1="{xR+9}" y1="{bot-4}" x2="{xR+bw-9}" y2="{top+6}" stroke="{TEAL}" stroke-width="1.3" marker-end="url(#ah)"/><line x1="{xR+bw-9}" y1="{bot-4}" x2="{xR+9}" y2="{top+6}" stroke="{TEAL}" stroke-width="1.3" marker-end="url(#ah)"/>')  # crossed
    g.append(f'<rect x="{xL-16}" y="{cy-8}" width="14" height="16" fill="none" stroke="{INK}" stroke-width="1.3"/><line x1="{xL-16}" y1="{cy+8}" x2="{xL-2}" y2="{cy-8}" stroke="{INK}" stroke-width="1.1"/>')  # solenoid L
    g.append(f'<rect x="{xR+bw+2}" y="{cy-8}" width="14" height="16" fill="none" stroke="{INK}" stroke-width="1.3"/><line x1="{xR+bw+2}" y1="{cy+8}" x2="{xR+bw+16}" y2="{cy-8}" stroke="{INK}" stroke-width="1.1"/>')  # solenoid R
    for px,l in [(Ax,'A'),(Bx,'B')]: g.append(f'<text x="{px}" y="{top-4}" font-size="9" font-weight="700" fill="{INK}" text-anchor="middle">{l}</text>')
    for px,l in [(Ax,'P'),(Bx,'T')]: g.append(f'<text x="{px}" y="{bot+11}" font-size="9" font-weight="700" fill="{INK}" text-anchor="middle">{l}</text>')
    return "\n".join(g)
def RE0(x,y,w,h,lw=1.8):  # absolute rect
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#fff" stroke="{INK}" stroke-width="{lw}"/>'

def dcv43(cx,cy,s=1.0,shift=0,spool_id=None):
    """4/3 tandem DCV. Ports P,T,A,B are FIXED at the centre; the 3-envelope SPOOL is a
    separate group that can slide by +/- one envelope to align raise (parallel) or lower (crossed).
    shift=0 centre(hold), +1 left/parallel envelope aligned (raise), -1 right/crossed (lower)."""
    bw,bh=32.0,36.0
    top=cy-bh/2*s; bot=cy+bh/2*s; Ax=cx-9*s; Bx=cx+9*s
    P=[f'<line x1="{Ax:.1f}" y1="{top:.1f}" x2="{Ax:.1f}" y2="{top-16*s:.1f}" stroke="{INK}" stroke-width="1.6"/>',
       f'<line x1="{Bx:.1f}" y1="{top:.1f}" x2="{Bx:.1f}" y2="{top-16*s:.1f}" stroke="{INK}" stroke-width="1.6"/>',
       f'<line x1="{Ax:.1f}" y1="{bot:.1f}" x2="{Ax:.1f}" y2="{bot+16*s:.1f}" stroke="{INK}" stroke-width="1.6"/>',
       f'<line x1="{Bx:.1f}" y1="{bot:.1f}" x2="{Bx:.1f}" y2="{bot+16*s:.1f}" stroke="{INK}" stroke-width="1.6"/>',
       f'<text x="{Ax:.1f}" y="{top-19*s:.1f}" font-size="{9*s:.1f}" font-weight="700" fill="{INK}" text-anchor="middle">A</text>',
       f'<text x="{Bx:.1f}" y="{top-19*s:.1f}" font-size="{9*s:.1f}" font-weight="700" fill="{INK}" text-anchor="middle">B</text>',
       f'<text x="{Ax:.1f}" y="{bot+27*s:.1f}" font-size="{9*s:.1f}" font-weight="700" fill="{INK}" text-anchor="middle">P</text>',
       f'<text x="{Bx:.1f}" y="{bot+27*s:.1f}" font-size="{9*s:.1f}" font-weight="700" fill="{INK}" text-anchor="middle">T</text>']
    dx=shift*bw*s
    def rect(ec): return f'<rect x="{ec-bw/2*s+dx:.1f}" y="{top:.1f}" width="{bw*s:.1f}" height="{bh*s:.1f}" fill="#fff" stroke="{INK}" stroke-width="1.8"/>'
    def cx_(ec,off): return ec+off*s+dx
    B=[rect(cx-bw*s), rect(cx), rect(cx+bw*s)]
    lc,rc=cx_(cx,-9),cx_(cx,9)
    B.append(f'<polyline points="{lc:.1f},{bot-3*s:.1f} {lc:.1f},{cy+8*s:.1f} {rc:.1f},{cy+8*s:.1f} {rc:.1f},{bot-3*s:.1f}" fill="none" stroke="{TEAL}" stroke-width="1.5"/>')
    for c in (lc,rc): B.append(f'<line x1="{c:.1f}" y1="{top+3*s:.1f}" x2="{c:.1f}" y2="{cy-9*s:.1f}" stroke="{TEAL}" stroke-width="1.4"/><line x1="{c-3.5*s:.1f}" y1="{cy-9*s:.1f}" x2="{c+3.5*s:.1f}" y2="{cy-9*s:.1f}" stroke="{TEAL}" stroke-width="1.4"/>')
    llc,lrc=cx_(cx-bw,-9),cx_(cx-bw,9)
    B.append(f'<line x1="{llc:.1f}" y1="{bot-4*s:.1f}" x2="{llc:.1f}" y2="{top+6*s:.1f}" stroke="{TEAL}" stroke-width="1.4" marker-end="url(#ah)"/>')
    B.append(f'<line x1="{lrc:.1f}" y1="{top+4*s:.1f}" x2="{lrc:.1f}" y2="{bot-6*s:.1f}" stroke="{TEAL}" stroke-width="1.4" marker-end="url(#ah)"/>')
    rlc,rrc=cx_(cx+bw,-9),cx_(cx+bw,9)
    B.append(f'<line x1="{rlc:.1f}" y1="{bot-4*s:.1f}" x2="{rrc:.1f}" y2="{top+6*s:.1f}" stroke="{TEAL}" stroke-width="1.4" marker-end="url(#ah)"/>')
    B.append(f'<line x1="{rrc:.1f}" y1="{bot-4*s:.1f}" x2="{rlc:.1f}" y2="{top+6*s:.1f}" stroke="{TEAL}" stroke-width="1.4" marker-end="url(#ah)"/>')
    lx=cx_(cx-bw,-bw/2); rx=cx_(cx+bw,bw/2)
    B.append(f'<rect x="{lx-16*s:.1f}" y="{cy-8*s:.1f}" width="{14*s:.1f}" height="{16*s:.1f}" fill="none" stroke="{INK}" stroke-width="1.3"/><line x1="{lx-16*s:.1f}" y1="{cy+8*s:.1f}" x2="{lx-2*s:.1f}" y2="{cy-8*s:.1f}" stroke="{INK}" stroke-width="1.1"/>')
    B.append(f'<rect x="{rx+2*s:.1f}" y="{cy-8*s:.1f}" width="{14*s:.1f}" height="{16*s:.1f}" fill="none" stroke="{INK}" stroke-width="1.3"/><line x1="{rx+2*s:.1f}" y1="{cy+8*s:.1f}" x2="{rx+16*s:.1f}" y2="{cy-8*s:.1f}" stroke="{INK}" stroke-width="1.1"/>')
    spool="".join(B)
    if spool_id: spool=f'<g id="{spool_id}" style="transition:transform .3s ease">{spool}</g>'
    return "".join(P)+spool
