const fs = require('fs');
const path = require('path');

const dir = 'e:/nurul-amin-app/components';

function replaceInFile(filename, replacePatt, replaceWith) {
  const filepath = path.join(dir, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  for(let i=0; i<replacePatt.length; i++) {
    content = content.replace(replacePatt[i], replaceWith[i]);
  }
  fs.writeFileSync(filepath, content);
}

// Skills.tsx
replaceInFile('Skills.tsx', 
  [
    'className="px-6 py-20 md:px-16 md:py-32 relative"\n      style={{ background: D.bg1 }}',
    'className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] mb-[2px]"',
    'className="px-6 py-8 md:px-12 md:py-12 flex flex-col transition-all duration-200"\n          style={{\n            border: `1px solid ${D.border}`,\n            borderTop: "none",\n            background: D.panel,\n          }}'
  ],
  [
    'style={{ background: D.bg1, padding: "120px 64px", position: "relative" }}',
    'style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, marginBottom: 2 }}',
    'style={{ border: `1px solid ${D.border}`, borderTop: "none", padding: "46px 48px", background: D.panel, transition: "opacity .2s, transform .2s" }}'
  ]
);

// Experience.tsx
replaceInFile('Experience.tsx',
  [
    'className="px-6 py-20 md:px-16 md:py-32" style={{ background: D.bg2 }}',
    'className="flex flex-col md:grid md:grid-cols-[190px_1fr_52px] gap-4 md:gap-7 py-6 md:py-8 items-start md:items-center cursor-none relative"',
    'className="absolute right-0 top-6 md:relative md:top-0 md:flex md:justify-end"',
    'className="pb-8 md:pb-10 pl-4 md:pl-[218px]"'
  ],
  [
    'style={{ background: D.bg2, padding: "120px 64px" }}',
    'style={{ display: "grid", gridTemplateColumns: "190px 1fr 52px", gap: 28, padding: "32px 0", alignItems: "center", cursor: "none" }}',
    'style={{ display: "flex", justifyContent: "flex-end" }}',
    'style={{ paddingBottom: 36, paddingLeft: 218 }}'
  ]
);

// Education.tsx
replaceInFile('Education.tsx',
  [
    'className="px-6 py-20 md:px-16 md:py-32" style={{ background: D.bg1 }}',
    'className="grid grid-cols-1 md:grid-cols-2 gap-[2px]"',
    'className="p-10 md:p-[72px_60px] relative overflow-hidden transition-all duration-500 cursor-none"\n        style={{\n          background: hov ? D.cardHov : D.card,\n          border: `1px solid ${hov ? card.col + "55" : D.border}`,\n        }}',
    'className="f-display text-[4.5rem] md:text-[6rem]"'
  ],
  [
    'style={{ background: D.bg1, padding: "120px 64px" }}',
    'style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}',
    'style={{ background: hov ? D.cardHov : D.card, border: `1px solid ${hov ? card.col + "55" : D.border}`, padding: "72px 60px", position: "relative", overflow: "hidden", transition: "all .5s cubic-bezier(.16,1,.3,1)", cursor: "none" }}',
    'className="f-display"\n          style={{ fontSize: "6rem" }}'
  ]
);

// Interests.tsx
replaceInFile('Interests.tsx',
  [
    'className="px-6 py-20 md:px-16 md:py-32" style={{ background: D.bg2 }}',
    'className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[2px]"',
    'className="p-8 md:p-[48px_22px_40px] text-center cursor-none transition-all duration-500 relative"\n        style={{\n          border: `1px solid ${hov ? item.col + "55" : D.border}`,\n          background: hov ? D.cardHov : D.card,\n          transform: hov ? "translateY(-6px)" : "none",\n        }}'
  ],
  [
    'style={{ background: D.bg2, padding: "120px 64px" }}',
    'style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3 }}',
    'style={{ padding: "48px 22px 40px", border: `1px solid ${hov ? item.col + "55" : D.border}`, background: hov ? D.cardHov : D.card, textAlign: "center", cursor: "none", transform: hov ? "translateY(-6px)" : "none", transition: "all .45s cubic-bezier(.16,1,.3,1)", position: "relative" }}'
  ]
);

// Contact.tsx
replaceInFile('Contact.tsx',
  [
    'className="px-6 py-20 md:px-16 md:py-[110px] relative overflow-hidden"\n      style={{\n        background: D.bg1,\n        borderTop: `1px solid ${D.border}`,\n      }}',
    'fontSize: "clamp(2.5rem,6vw,5rem)",'
  ],
  [
    'style={{\n        background: D.bg1,\n        padding: "110px 64px",\n        position: "relative",\n        overflow: "hidden",\n        borderTop: `1px solid ${D.border}`,\n      }}',
    'fontSize: "clamp(2.8rem,6vw,5rem)",'
  ]
);

// Footer.tsx
replaceInFile('Footer.tsx',
  [
    'className="px-6 py-8 md:px-16 md:py-6 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 text-center sm:text-left"\n      style={{\n        background: D.bg0,\n        borderTop: `1px solid ${D.border}`,\n      }}'
  ],
  [
    'style={{ background: D.bg0, padding: "26px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, borderTop: `1px solid ${D.border}` }}'
  ]
);

console.log("Revert complete");
