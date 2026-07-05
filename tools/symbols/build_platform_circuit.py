exec(open('/tmp/gen_symbols.py').read())
INKc='#1B3A55'; TEALc='#0E7E8C'; AMBc='#DD841A'; MUT='#8AA0AE'
def build(dcv_shift=0, dcv_spool_id=None):
    comp=[]; grp={'supply':[],'return':[],'cap':[],'rod':[],'pilot':[]}
    def C(s): comp.append(s)
    def wire(g,x1,y1,x2,y2,dash=False,lw=2.2):
        col=TEALc if dash else INKc; d=' stroke-dasharray="5 3"' if dash else ''
        grp[g].append((x1,y1,x2,y2)); return None
    # CYLINDER (vertical, rod up) — both ports LEFT side, cap-end low, rod-end high, clear of piston
    cx0,cyt,cw,ch=440,110,34,120; pistonY=cyt+80
    C(f'<rect x="{cx0-cw/2}" y="{cyt}" width="{cw}" height="{ch}" fill="#fff" stroke="{INKc}" stroke-width="1.9"/>')
    C(f'<rect x="{cx0-cw/2+1}" y="{pistonY-2}" width="{cw-2}" height="5" fill="#fff" stroke="{INKc}" stroke-width="1.6"/>')
    C(f'<line x1="{cx0}" y1="{pistonY}" x2="{cx0}" y2="{cyt-46}" stroke="#5B6B79" stroke-width="6"/>')
    C(f'<rect x="{cx0-24}" y="{cyt-66}" width="48" height="22" rx="3" fill="{AMBc}"/><text x="{cx0}" y="{cyt-51}" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">2 t</text>')
    C(f'<text x="{cx0}" y="{cyt+ch-8}" font-size="9" fill="#0B5A63" text-anchor="middle">cylinder</text>')
    capY=cyt+ch-14; rodY=cyt+14
    C(f'<line x1="{cx0-cw/2}" y1="{capY}" x2="{cx0-cw/2-10}" y2="{capY}" stroke="{INKc}" stroke-width="1.8"/>')
    C(f'<line x1="{cx0-cw/2}" y1="{rodY}" x2="{cx0-cw/2-10}" y2="{rodY}" stroke="{INKc}" stroke-width="1.8"/>')
    CAP=(cx0-cw/2-10, capY); ROD=(cx0-cw/2-10, rodY)
    # COUNTERBALANCE (left of cylinder; check free-flow L->R = DCV->cyl = raise)
    cvx,cvy,cs=300,250,1.1
    C(ref_counterbalance(cvx,cvy,s=cs)); C(f'<text x="{cvx}" y="{cvy+42}" font-size="9" font-weight="700" fill="{INKc}" text-anchor="middle">counterbalance · 130 bar</text>')
    CBV_L=(cvx-36*cs,cvy+10*cs); CBV_R=(cvx+36*cs,cvy+10*cs); CBV_PIL=(cvx,cvy-16*cs)
    # DCV (sliding spool) below
    dcx,dcy=300,450
    C(dcv43(dcx,dcy,s=1.0,shift=dcv_shift,spool_id=dcv_spool_id))
    C(f'<text x="{dcx}" y="{dcy+42}" font-size="9" fill="#0B5A63" text-anchor="middle">4/3 proportional · tandem centre</text>')
    A=(dcx-9,dcy-18); B=(dcx+9,dcy-18); P=(dcx-9,dcy+18); T=(dcx+9,dcy+18)
    # POWER UNIT
    resY=665; RES_L,RES_R=150,560
    C(f'<path d="M{RES_L},{resY-26} L{RES_L},{resY} L{RES_R},{resY} L{RES_R},{resY-26}" fill="none" stroke="{INKc}" stroke-width="2.2"/><text x="{(RES_L+RES_R)/2}" y="{resY-9}" font-size="9" fill="{MUT}" text-anchor="middle">reservoir</text>')
    pcx,pcy=200,590; C(ref_pump(pcx,pcy,s=1.0)); C(f'<text x="{pcx}" y="{pcy+40}" font-size="9" fill="#0B5A63" text-anchor="middle">pump</text>')
    mcx,mcy=140,590; C(ref_emotor(mcx,mcy,s=1.0)); C(f'<text x="{mcx}" y="{mcy+40}" font-size="9" fill="#0B5A63" text-anchor="middle">motor</text>')
    C(f'<line x1="{mcx+16}" y1="{mcy}" x2="{pcx-16}" y2="{mcy}" stroke="{INKc}" stroke-width="2"/>')
    PO=(pcx,pcy-28); PS=(pcx,pcy+28)
    # RELIEF — right next to the pump, teed off the delivery line
    rvx,rvy=250,560; C(ref_relief(rvx,rvy,s=1.0)); C(f'<text x="{rvx}" y="{rvy-30}" font-size="8.5" font-weight="700" fill="{INKc}" text-anchor="middle">115 bar</text>')
    RV_IN=(rvx+26,rvy+10); RV_OUT=(rvx-26,rvy+10)
    fxc,fyc=505,610; C(ref_filter(fxc,fyc,s=1.0)); C(f'<text x="{fxc+30}" y="{fyc+3}" font-size="8.5" fill="{MUT}">filter</text>')
    FTOP=(fxc,fyc-26); FBOT=(fxc,fyc+26)
    # WIRES
    wire('cap',CAP[0],CAP[1],CBV_R[0],CAP[1]); wire('cap',CBV_R[0],CAP[1],CBV_R[0],CBV_R[1])
    wire('cap',CBV_L[0],CBV_L[1],CBV_L[0],400); wire('cap',CBV_L[0],400,A[0],400); wire('cap',A[0],400,A[0],A[1])
    wire('rod',ROD[0],ROD[1],395,ROD[1]); wire('rod',395,ROD[1],395,415); wire('rod',395,415,B[0],415); wire('rod',B[0],415,B[0],B[1])
    wire('pilot',395,300,CBV_PIL[0],300,dash=True); wire('pilot',CBV_PIL[0],300,CBV_PIL[0],CBV_PIL[1],dash=True,lw=1.8)
    # supply: pump up -> P line horizontal to DCV P ; relief teed near the pump ; drains
    wire('supply',PO[0],PO[1],PO[0],510)                 # pump delivery up
    wire('supply',PO[0],510,P[0],510)                    # P line horizontal (pump -> DCV P); relief tees at RV_IN x
    wire('supply',P[0],510,P[0],P[1])                    # DCV P branch down
    wire('supply',RV_IN[0],510,RV_IN[0],RV_IN[1])        # relief INLET branch (tee on the horizontal, near pump)
    wire('supply',RV_OUT[0],RV_OUT[1],RV_OUT[0],resY)    # relief OUTLET -> tank
    wire('supply',PS[0],PS[1],PS[0],resY)                # suction -> tank
    # return: T -> filter -> reservoir
    wire('return',T[0],T[1],T[0],545); wire('return',T[0],545,FTOP[0],545); wire('return',FTOP[0],545,FTOP[0],FTOP[1]); wire('return',FBOT[0],FBOT[1],FBOT[0],resY)
    tees=f'<circle cx="{RV_IN[0]}" cy="510" r="2.4" fill="{INKc}"/><circle cx="395" cy="300" r="2.4" fill="{TEALc}"/><text x="405" y="296" font-size="8.5" font-weight="700" fill="#0B5A63">pilot</text>'
    ports={'CAP':CAP,'ROD':ROD,'CBV_L':CBV_L,'CBV_R':CBV_R,'CBV_PIL':CBV_PIL,'A':A,'B':B,'P':P,'T':T,'RV_IN':RV_IN,'RV_OUT':RV_OUT,'PO':PO,'PS':PS,'FTOP':FTOP,'FBOT':FBOT}
    return comp, grp, tees, ports, resY, (RES_L,RES_R)
