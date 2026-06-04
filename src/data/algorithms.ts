// Step 2 CK clinical algorithms — based on the UWorld algorithm compendium
// and cross-checked against current guidelines (AHA, ACOG, IDSA, ACS, NCCN,
// ATS, KDIGO, JNC-8, IDSA, NICE) where standards have evolved since the PDF.
//
// Design: every option has an EXPLICIT isCorrect flag — no string matching tricks.
// The game advances along the chosen option's path on correct, or retries on wrong.

export type Category =
  | "Cardiology"
  | "Pulmonary"
  | "Gastroenterology"
  | "Endocrine"
  | "Renal"
  | "Hematology"
  | "Oncology"
  | "Neurology"
  | "OB/GYN"
  | "Breast"
  | "Pediatrics"
  | "Emergency"
  | "Infectious Disease"
  | "Trauma"
  | "Dermatology"
  | "Musculoskeletal";

export type Difficulty = "easy" | "medium" | "hard";

export type NodeId = string;

export type Option = {
  label: string;
  isCorrect: boolean;
  next?: NodeId;        // only meaningful when isCorrect
  rationale?: string;   // shown after pick (right or wrong)
};

export type DecisionNode = {
  kind: "decision";
  id: NodeId;
  prompt: string;
  context?: string;
  options: Option[];
};

export type OutcomeNode = {
  kind: "outcome";
  id: NodeId;
  title: string;
  detail?: string;
  pearls?: string[];
};

export type AlgoNode = DecisionNode | OutcomeNode;

export type Algorithm = {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  blurb: string;
  source?: string;      // optional reference
  start: NodeId;
  nodes: Record<NodeId, AlgoNode>;
};

// Tiny helpers to keep the data file readable
const D = (id: string, prompt: string, options: Option[], context?: string): DecisionNode =>
  ({ kind: "decision", id, prompt, context, options });
const O = (id: string, title: string, detail?: string, pearls?: string[]): OutcomeNode =>
  ({ kind: "outcome", id, title, detail, pearls });
const ok = (label: string, next: string, rationale?: string): Option =>
  ({ label, isCorrect: true, next, rationale });
const no = (label: string, rationale: string): Option =>
  ({ label, isCorrect: false, rationale });

const mkNodes = (arr: AlgoNode[]): Record<NodeId, AlgoNode> =>
  Object.fromEntries(arr.map((n) => [n.id, n]));

// ────────────────────────────────────────────────────────────────────────────
// ALGORITHMS — 85 high-yield clinical decision trees for Step 2 CK
// ────────────────────────────────────────────────────────────────────────────

export const ALGORITHMS: Algorithm[] = [
  // ═══ EMERGENCY / CRITICAL CARE ═══
  {
    id: "acetaminophen-tox",
    title: "Acetaminophen Intoxication",
    category: "Emergency",
    difficulty: "easy",
    blurb: "Charcoal early; NAC if level above the Rumack–Matthew line.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Acetaminophen ingestion. First triage question?", [
        ok("Was it a single dose ≥7.5 g (or ≥150 mg/kg in peds)?", "n2"),
        no("Order liver transplant evaluation", "Premature — risk stratify first."),
        no("Give flumazenil", "Flumazenil reverses benzodiazepines, not APAP."),
      ]),
      D("n2", "Single toxic dose confirmed. Is it ≤4 hours since ingestion AND acute?", [
        ok("Yes → activated charcoal", "n3", "Charcoal limits further absorption within the 4-hour window."),
        ok("No / chronic / indeterminate → skip charcoal, draw labs", "n4"),
        no("Discharge — APAP is safe", "Toxic doses cause fulminant hepatic failure."),
      ]),
      D("n3", "After charcoal — next step?", [
        ok("Acetaminophen level + AST/ALT + INR + Cr", "n4"),
        no("Wait 24 hours then recheck", "You'll miss the treatment window."),
      ]),
      D("n4", "Treatment indication?", [
        ok("Level above Rumack–Matthew line, OR any AST/ALT elevation, OR >10 µg/mL with unclear timing → start NAC", "outNAC"),
        ok("All below line, normal LFTs → discharge with follow-up", "outDC"),
      ]),
      O("outNAC", "N-acetylcysteine + monitor LFTs/INR",
        "NAC replenishes glutathione and detoxifies NAPQI. Best efficacy <8 h but still indicated later. 21-h IV protocol most common.",
        ["Use Rumack–Matthew only for acute single ingestions",
         "Any LFT elevation → treat",
         "Transfer for liver transplant if INR >3, pH <7.3, Cr >3.4, encephalopathy (King's College)"]),
      O("outDC", "No NAC needed", "Provide return precautions; reassess if late symptoms appear."),
    ]),
  },

  {
    id: "anaphylaxis",
    title: "Anaphylaxis Diagnosis",
    category: "Emergency",
    difficulty: "easy",
    blurb: "IM epinephrine is the only life-saving intervention — give it now.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Acute-onset illness. Which clinical pattern meets anaphylaxis criteria?",
        [
          ok("Skin/mucosa involvement + either hypotension OR respiratory distress", "outAna"),
          ok("≥2 organ systems involved after exposure to a likely allergen", "outAna"),
          ok("Hypotension after exposure to a known allergen", "outAna"),
          no("Hives only with normal vitals", "Urticaria alone is not anaphylaxis — antihistamines suffice."),
        ],
        "Criteria are met if ANY of these patterns occur with rapid onset."),
      O("outAna", "Give IM epinephrine 0.3–0.5 mg (1:1000) into the anterolateral thigh — NOW",
        "Adjuncts: high-flow O₂, IV fluids 1–2 L bolus, H1 (diphenhydramine) + H2 (famotidine) blockers, glucocorticoids, albuterol for bronchospasm. Observe ≥4–6 hours for biphasic reaction.",
        ["Epinephrine is the only intervention that prevents death — don't wait for IV access",
         "Repeat every 5–15 minutes if symptoms persist",
         "Refractory hypotension: IV epi infusion, glucagon (if on β-blocker)",
         "Discharge with epi auto-injector and allergy referral"]),
    ]),
  },

  {
    id: "cardiac-arrest",
    title: "Adult Cardiac Arrest (ACLS)",
    category: "Emergency",
    difficulty: "hard",
    blurb: "Shockable vs non-shockable → epinephrine cadence + reversible causes.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Adult in cardiac arrest. First actions?", [
        ok("Start high-quality CPR, oxygen, attach monitor/defibrillator", "n2"),
        no("IV epinephrine before chest compressions", "CPR must start immediately."),
        no("Intubate before CPR", "Compressions take precedence over airway."),
      ]),
      D("n2", "Initial rhythm?", [
        ok("VF / pulseless VT (shockable)", "outShock"),
        ok("Asystole / PEA (non-shockable)", "outNonShock"),
      ]),
      O("outShock", "Defibrillate → CPR 2 min → epi q3–5 min; amiodarone or lidocaine after 2nd–3rd shock",
        "Treat reversible causes (5 H's: hypovolemia, hypoxia, H⁺ acidosis, hypo/hyperkalemia, hypothermia; 5 T's: tension PTX, tamponade, toxins, thrombosis pulmonary, thrombosis coronary).",
        ["Biphasic defib at manufacturer dose (typically 120–200 J)",
         "Minimize interruptions to compressions",
         "End-tidal CO₂ <10 mm Hg → CPR quality is poor",
         "Post-ROSC: targeted temperature management 32–36 °C"]),
      O("outNonShock", "Epinephrine 1 mg IV ASAP, CPR, address reversible causes; no defibrillation",
        "Reassess rhythm every 2 minutes. PEA workup: bedside US for tamponade, PTX, RV strain.",
        ["Asystole confirmed in 2 leads",
         "Capnography helps confirm ROSC (sudden ETCO₂ jump)"]),
    ]),
  },

  {
    id: "aortic-dissection",
    title: "Suspected Aortic Dissection",
    category: "Emergency",
    difficulty: "hard",
    blurb: "Tearing pain, pulse deficit, BP differential — image with CTA or TEE.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Tearing chest/back pain + pulse deficit, BP differential >20 mm Hg, or AR murmur. First step?", [
        ok("Chest X-ray + ECG to look for mimics (STEMI, pneumothorax)", "n2"),
        no("Immediate thrombolytics", "Thrombolytics in dissection are catastrophic — image first."),
      ]),
      D("n2", "Mimics excluded. Definitive imaging?", [
        ok("Stable, normal Cr, no allergy → CT angiogram of chest/abdomen/pelvis", "outImg"),
        ok("Unstable / renal failure / contrast allergy → TEE at bedside", "outImg"),
        no("MRI on every patient", "MRI takes too long for the unstable dissection patient."),
      ]),
      O("outImg", "Initial medical therapy then surgical decision by type",
        "Lower HR (target 60) with IV β-blocker (esmolol, labetalol) BEFORE vasodilators to avoid reflex tachycardia. Then SBP 100–120 with nitroprusside or nicardipine. Type A (ascending) → emergent surgery. Type B (descending) → medical management; TEVAR if malperfusion/rupture.",
        ["Goal HR 60, SBP 100–120 mm Hg",
         "Always β-blocker before vasodilator",
         "Type A → OR; Type B uncomplicated → ICU + meds"]),
    ]),
  },

  {
    id: "stroke-initial",
    title: "Initial Management of Stroke",
    category: "Neurology",
    difficulty: "medium",
    blurb: "Non-contrast CT to triage ischemic vs hemorrhagic.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Acute stroke symptoms. First three steps?", [
        ok("ABCs → non-contrast CT head → labs (glucose, coags, CBC, BMP)", "n2"),
        no("MRI brain before anything else", "Too slow in the acute window."),
        no("Immediate IV tPA empirically", "Must rule out hemorrhage first."),
      ]),
      D("n2", "CT result?", [
        ok("No hemorrhage → ischemic pathway", "n3"),
        ok("Hemorrhage seen → hemorrhagic pathway", "outHem"),
      ]),
      D("n3", "Ischemic stroke. Eligibility for reperfusion?", [
        ok("Within 4.5 h of LKW and no contraindications → IV alteplase or tenecteplase", "outLytic"),
        ok("Large-vessel occlusion within 24 h → endovascular thrombectomy (consider in addition to lytics)", "outEVT"),
        ok("Beyond windows → permissive hypertension (treat BP only if >220/120), dual antiplatelet, statin", "outPermissive"),
      ]),
      O("outLytic", "IV thrombolytic; keep BP <185/110 before and <180/105 for 24 h after"),
      O("outEVT", "Endovascular thrombectomy for proximal anterior circulation occlusion",
        "Up to 24 h with favorable imaging (DAWN, DEFUSE-3 criteria)."),
      O("outPermissive", "Permissive HTN + dual antiplatelet (ASA + clopidogrel for 21–90 d in minor stroke), high-intensity statin"),
      O("outHem", "Reverse anticoagulation; BP control to systolic 140–160; maintain normal ICP",
        "Neurosurgery consult; consider hematoma evacuation for cerebellar bleeds >3 cm or rapidly worsening.",
        ["Cushing reflex (HTN, bradycardia, irregular respirations) = ↑ICP",
         "Avoid hyperventilation unless impending herniation"]),
    ]),
  },

  {
    id: "drowning",
    title: "Management of Drowning",
    category: "Emergency",
    difficulty: "easy",
    blurb: "Rescue breaths come FIRST in drowning arrest. Observe asymptomatic patients ≥8 h.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Prehospital care for drowning victim. First priority?", [
        ok("Rescue breaths first, then chest compressions if no pulse", "n2"),
        no("Heimlich maneuver", "Not indicated unless foreign body — wastes time."),
        no("Chest compressions first (standard ACLS C-A-B)", "Drowning is a hypoxic arrest — A-B-C still applies."),
      ]),
      D("n2", "In the ED, what determines disposition?", [
        ok("Symptomatic", "outSymp"),
        ok("Asymptomatic", "outAsymp"),
      ]),
      O("outSymp", "Maintain oxygenation (NIV or intubation), bronchodilators, evaluate with CXR, ECG, ABG, CBC, electrolytes, drug screen"),
      O("outAsymp", "Observe ≥8 hours with continuous pulse oximetry and serial exams; CXR at end of observation",
        "Discharge if no respiratory deterioration in 8 h.",
        ["Salt vs fresh water makes little clinical difference",
         "ARDS, cerebral edema, arrhythmia are major complications"]),
    ]),
  },

  {
    id: "rabies-pep",
    title: "Rabies Postexposure Prophylaxis",
    category: "Infectious Disease",
    difficulty: "medium",
    blurb: "Animal type and availability decide PEP.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Mammalian bite with possible rabies exposure (broken skin/mucous membrane). Type of animal?", [
        ok("Low-risk wild animal (squirrel, chipmunk, mouse, rabbit)", "outNoPEP"),
        ok("High-risk wild animal (bat, raccoon, skunk, fox, coyote)", "n2"),
        ok("Pet (dog, cat, ferret)", "n3"),
        ok("Livestock / unknown wild animal", "outHealth"),
      ]),
      D("n2", "High-risk wild animal — available for testing?", [
        ok("Yes → euthanize, test brain; PEP if positive", "outTest"),
        ok("No → start PEP empirically", "outPEP"),
      ]),
      D("n3", "Pet — available for 10-day quarantine?", [
        ok("Yes → observe; no PEP if animal stays healthy", "outQuar"),
        ok("No → start PEP", "outPEP"),
      ]),
      O("outNoPEP", "No PEP needed", "These species rarely carry rabies."),
      O("outTest", "PEP only if brain test positive"),
      O("outQuar", "10-day quarantine; no PEP unless animal develops signs of rabies"),
      O("outPEP", "PEP: rabies immune globulin (20 IU/kg, infiltrate around wound) + 4-dose rabies vaccine (days 0, 3, 7, 14)",
        "Wash wound thoroughly with soap and water. Immunocompromised: 5 doses + check titer.",
        ["RIG into wound site; vaccine into deltoid (or thigh in kids)",
         "Don't co-administer RIG and vaccine in the same syringe or site"]),
      O("outHealth", "Contact public health for guidance"),
    ]),
  },

  // ═══ CARDIOLOGY ═══
  {
    id: "stemi-initial",
    title: "Initial Stabilization of STEMI",
    category: "Cardiology",
    difficulty: "medium",
    blurb: "MONA-BASH plus PCI in 90 minutes (or thrombolytics in 120).",
    start: "n1",
    nodes: mkNodes([
      D("n1", "STEMI diagnosed. Initial medical bundle?", [
        ok("Aspirin 325 mg chewed + P2Y12 inhibitor + sublingual nitrate + β-blocker + high-dose statin + anticoagulation (± O₂ if SpO₂ <90%)", "n2"),
        no("Heparin alone", "Misses antiplatelets, which reduce mortality."),
        no("Oxygen for everyone regardless of saturation", "Routine O₂ may worsen outcomes if SpO₂ ≥90%."),
      ]),
      D("n2", "Symptom-specific adjuncts — which complication is present?", [
        ok("Persistent pain, HTN, heart failure → IV nitroglycerin (avoid if hypotensive, RV infarct, severe AS)", "outNitro"),
        ok("Persistent severe pain despite nitrates → IV morphine", "outMorph"),
        ok("Unstable sinus bradycardia → IV atropine", "outAtrop"),
        ok("Pulmonary edema → IV furosemide (avoid if hypovolemic)", "outFuro"),
        ok("None — proceed to reperfusion", "outReperf"),
      ]),
      O("outNitro", "IV nitroglycerin",
        "Avoid in inferior MI with RV involvement (preload-dependent) — give fluids instead."),
      O("outMorph", "IV morphine 2–4 mg",
        "Use cautiously — morphine may impair P2Y12 absorption."),
      O("outAtrop", "IV atropine 0.5 mg"),
      O("outFuro", "IV furosemide"),
      O("outReperf", "Reperfusion: PCI within 90 min preferred; thrombolytics if PCI not available in 120 min",
        "Door-to-balloon ≤90 min. Door-to-needle ≤30 min if lytic chosen.",
        ["β-blocker contraindicated if hypotension, bradycardia, AHF, heart block, asthma exacerbation",
         "Avoid nitrates with phosphodiesterase inhibitors in last 24–48 h",
         "DAPT for ≥12 months post-PCI"]),
    ]),
  },

  {
    id: "chest-pain-clinic",
    title: "Outpatient Chest Pain (Pretest Probability)",
    category: "Cardiology",
    difficulty: "medium",
    blurb: "Pretest probability of CAD selects the testing strategy.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Stable chest pain. First step?", [
        ok("Estimate pretest probability of CAD", "n2"),
        no("Coronary angiography for everyone", "Invasive and unnecessary in low risk."),
      ]),
      D("n2", "Pretest probability?", [
        ok("Low → no additional testing", "outNone"),
        ok("Intermediate → exercise/imaging stress test", "n3"),
        ok("High → start CAD pharmacologic therapy + expert evaluation", "outHigh"),
      ]),
      D("n3", "Patient able to exercise with interpretable baseline ECG?", [
        ok("Yes → exercise ECG", "outStress"),
        ok("No → pharmacologic stress imaging (dobutamine echo or vasodilator nuclear)", "outStress"),
      ]),
      O("outNone", "No further testing", "Reassure; lifestyle counseling."),
      O("outStress", "Stress test; if positive → coronary angiography"),
      O("outHigh", "Initiate aspirin + statin + β-blocker (or CCB) + nitrate, expert evaluation"),
    ]),
  },

  {
    id: "chest-pain-ed",
    title: "Chest Pain in the Emergency Department",
    category: "Emergency",
    difficulty: "medium",
    blurb: "ECG + CXR + cardiac markers, with hemodynamics first.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "ED chest pain. First steps?", [
        ok("Focused H&P, vitals, IV access", "n2"),
        no("Stress test", "Not appropriate in acute setting."),
      ]),
      D("n2", "Hemodynamic status?", [
        ok("Stable → ECG + CXR + ASA (if dissection unlikely)", "n3"),
        ok("Unstable → stabilize, search for cause", "outUnstable"),
      ]),
      D("n3", "ECG consistent with ACS?", [
        ok("STEMI → emergent PCI / thrombolytics", "outSTEMI"),
        ok("NSTEMI/UA → anticoagulation + antiplatelet + risk stratification", "outNSTE"),
        ok("Non-ischemic ECG → evaluate other causes (PE, pericarditis, dissection, esoph rupture)", "outOther"),
      ]),
      O("outUnstable", "Stabilize hemodynamics, treat underlying cause (cardiogenic shock, tamponade, tension PTX, massive PE)"),
      O("outSTEMI", "Emergent cath lab activation"),
      O("outNSTE", "DAPT + anticoagulation; risk stratify (TIMI/GRACE); early invasive vs ischemia-guided",
        "Troponin trend over 0/3 or 0/1 h."),
      O("outOther", "PE workup (Wells → D-dimer/CTPA), pericarditis (ECG, echo, NSAIDs + colchicine), aortic dissection (CTA/TEE), Boerhaave"),
    ]),
  },

  {
    id: "wct",
    title: "Wide-Complex Tachycardia",
    category: "Cardiology",
    difficulty: "hard",
    blurb: "AV dissociation/fusion = VT. Then ask stable vs unstable.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Wide-complex tachycardia. Decisive features?", [
        ok("AV dissociation, fusion or capture beats → ventricular tachycardia", "n2"),
        no("Narrow QRS only", "By definition WCT has QRS ≥120 ms."),
      ]),
      D("n2", "Hemodynamic status?", [
        ok("Stable → IV amiodarone (alt: procainamide, lidocaine)", "outAmio"),
        ok("Unstable (hypotension, AMS, distress, ischemia, AHF) → synchronized cardioversion", "outShock"),
        ok("Pulseless → defibrillate + ACLS", "outDefib"),
      ]),
      O("outAmio", "IV amiodarone 150 mg over 10 min, then infusion"),
      O("outShock", "Synchronized cardioversion 100 J biphasic, escalate as needed",
        "Sedate if conscious (etomidate, midazolam)."),
      O("outDefib", "Unsynchronized defibrillation; full ACLS"),
    ]),
  },

  {
    id: "tachy-acls",
    title: "Adult Tachycardia (ACLS)",
    category: "Cardiology",
    difficulty: "medium",
    blurb: "Unstable = cardioversion. Stable narrow = adenosine/vagal. Stable wide = consider VT.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Sustained tachyarrhythmia (HR typically >150). First step?", [
        ok("ID and treat underlying cause; airway, O₂, monitor, BP", "n2"),
        no("Cardiovert everyone immediately", "Reserve for unstable rhythms."),
      ]),
      D("n2", "Are there unstable features (hypotension, AMS, shock, ischemic chest pain, AHF)?", [
        ok("Yes → synchronized cardioversion", "outCard"),
        ok("No → assess QRS width", "n3"),
      ]),
      D("n3", "QRS ≥0.12 s (wide)?", [
        ok("Yes (wide) → IV access, 12-lead, consider adenosine if regular & monomorphic, antiarrhythmic infusion", "outWide"),
        ok("No (narrow) → vagal maneuvers, adenosine if regular, β-blocker or CCB", "outNarrow"),
      ]),
      O("outCard", "Synchronized cardioversion (sedate first); consider adenosine if regular narrow complex"),
      O("outWide", "Treat as VT until proven otherwise — amiodarone, procainamide, or sotalol"),
      O("outNarrow", "Vagal → adenosine 6 mg → 12 mg → rate control (diltiazem/metoprolol) for AF/aflutter"),
    ]),
  },

  {
    id: "sinus-brady",
    title: "Sinus Bradycardia",
    category: "Cardiology",
    difficulty: "easy",
    blurb: "Atropine → pacing/chronotropes if unresponsive.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Pulse <50, symptomatic. Initial actions?", [
        ok("IV access, monitor, treat reversible causes (drugs, electrolytes, ischemia)", "n2"),
        no("Start dopamine drip immediately", "Try atropine first."),
      ]),
      D("n2", "Unstable features (hypotension, AMS, ischemic chest pain, AHF)?", [
        ok("Yes → IV atropine 1 mg q3–5 min (max 3 mg)", "n3"),
        ok("No → monitor and observe", "outObs"),
      ]),
      D("n3", "Response to atropine?", [
        ok("Inadequate → transcutaneous pacing OR dopamine 5–20 µg/kg/min OR epinephrine 2–10 µg/min", "outPace"),
        ok("Adequate → continue monitoring, treat cause", "outObs"),
      ]),
      O("outObs", "Monitor and address underlying cause"),
      O("outPace", "Transcutaneous pacing/dopamine/epinephrine; transvenous pacing if persistent",
        "AHA increased the atropine dose from 0.5 to 1 mg in the 2020 ACLS update.",
        ["Atropine often ineffective in high-grade AV block (Mobitz II, complete) — go straight to pacing",
         "Don't delay pacing while waiting for atropine to fail in a crashing patient"]),
    ]),
  },

  {
    id: "electrical-alternans",
    title: "Electrical Alternans → Pericardial Tamponade",
    category: "Cardiology",
    difficulty: "medium",
    blurb: "Alternating QRS amplitude → think large pericardial effusion.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "ECG shows alternating QRS amplitude (electrical alternans). Suspected diagnosis?", [
        ok("Large pericardial effusion / tamponade", "n2"),
        no("Ventricular bigeminy", "Bigeminy alternates rhythm timing, not QRS amplitude."),
        no("Atrial fibrillation", "AF is irregularly irregular without amplitude variation."),
      ]),
      D("n2", "Next test?", [
        ok("Bedside transthoracic echocardiogram", "outEcho"),
        no("Stress test", "Not appropriate."),
      ]),
      O("outEcho", "Echo confirms effusion ± tamponade physiology (RV diastolic collapse, IVC plethora)",
        "Tamponade with hemodynamic compromise → urgent pericardiocentesis. Beck's triad: hypotension, JVD, muffled heart sounds.",
        ["Pulsus paradoxus >10 mm Hg is a key bedside finding",
         "Pericardiocentesis under echo or fluoroscopy guidance"]),
    ]),
  },

  // ═══ VASCULAR / TRAUMA ═══
  {
    id: "aaa-unstable",
    title: "Unstable Abdominal Aortic Aneurysm",
    category: "Emergency",
    difficulty: "medium",
    blurb: "Stable + AAA on CT vs unstable + bedside US → OR.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Abdominal/flank/groin pain + pulsatile mass. Stable?", [
        ok("Stable → CT abdomen with contrast", "n2"),
        ok("Unstable → bedside abdominal US (do NOT delay for CT)", "n3"),
      ]),
      D("n2", "Stable patient — CT findings?", [
        ok("AAA confirmed → medical optimization, elective/urgent repair", "outRepair"),
        ok("No AAA → explore other diagnoses", "outOther"),
      ]),
      D("n3", "Unstable + bedside US shows AAA?", [
        ok("Yes → emergency repair (EVAR or open)", "outER"),
        ok("No → explore other diagnoses", "outOther"),
      ]),
      O("outRepair", "Repair: open or EVAR depending on anatomy and comorbidities"),
      O("outER", "Emergency surgical repair — call vascular surgery, mass transfusion protocol",
        "Permissive hypotension (SBP 70–90) until aortic control to limit hematoma expansion."),
      O("outOther", "Workup other causes of pain"),
    ]),
  },

  {
    id: "blunt-chest",
    title: "Blunt Chest Trauma",
    category: "Trauma",
    difficulty: "medium",
    blurb: "Unstable → resuscitate + eFAST + CT. Stable + high-risk → CT.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Blunt chest trauma. First triage?", [
        ok("Assess hemodynamic stability", "n2"),
        no("Routine trauma series CT for all", "Stable patients without features may not need CT."),
      ]),
      D("n2", "Hemodynamics?", [
        ok("Unstable → resuscitation, eFAST, CT (when feasible), ECG, stabilizing intervention (chest tube if needed)", "n3"),
        ok("Stable → CXR, ECG, exam; CT if high-risk mechanism or abnormal findings", "n4"),
      ]),
      D("n3", "After resuscitation — stability achieved?", [
        ok("Yes → additional tests (CT chest)", "outAdd"),
        ok("No → OR thoracotomy", "outOR"),
      ]),
      D("n4", "Findings after evaluation?", [
        ok("Abnormal CXR/ECG/exam → CT chest", "outAdd"),
        ok("All normal, low-risk mechanism → discharge or observe", "outDC"),
      ]),
      O("outAdd", "Treat findings; repeat exams, serial troponins if cardiac contusion suspected"),
      O("outOR", "OR thoracotomy if massive hemothorax (>1500 mL initial output) or refractory shock"),
      O("outDC", "Possible discharge or short observation"),
    ]),
  },

  {
    id: "blunt-abd",
    title: "Blunt Abdominal Trauma",
    category: "Trauma",
    difficulty: "medium",
    blurb: "Unstable + free fluid = OR. Stable = CT.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Blunt abdominal trauma. Hemodynamic status?", [
        ok("Unstable", "n2"),
        ok("Stable", "n3"),
      ]),
      D("n2", "Unstable — peritonitis?", [
        ok("Yes → laparotomy", "outLap"),
        ok("No → eFAST", "n4"),
      ]),
      D("n4", "Unstable + eFAST result?", [
        ok("Free fluid → laparotomy", "outLap"),
        ok("Negative or inconclusive → CT abdomen/pelvis after resuscitation, or DPL; look for other bleeding source", "outCTAP"),
      ]),
      D("n3", "Stable — peritonitis?", [
        ok("Yes → laparotomy en route", "outLap"),
        ok("No → eFAST", "n5"),
      ]),
      D("n5", "Stable + eFAST?", [
        ok("Free fluid → CT abdomen/pelvis", "outCTAP"),
        ok("Negative → CT or serial exams based on injury suspicion", "outCTAP"),
      ]),
      O("outLap", "Laparotomy", "Damage control if coagulopathic, hypothermic, acidotic."),
      O("outCTAP", "CT scan of abdomen/pelvis with IV contrast; manage findings non-operatively if stable solid-organ injury",
        "Splenic and liver injuries are often managed non-operatively with serial Hb checks."),
    ]),
  },

  {
    id: "penetrating-abd",
    title: "Penetrating Abdominal Trauma",
    category: "Trauma",
    difficulty: "medium",
    blurb: "Most require laparotomy; some stable stab wounds can be observed.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Penetrating abdominal trauma. Indication for immediate laparotomy?", [
        ok("Hemodynamic instability, peritonitis, evisceration, GI bleeding, impaled object", "outLap"),
        ok("None of the above (stable stab wound, no peritonitis)", "n2"),
      ]),
      D("n2", "Stable stab wound — next assessment?", [
        ok("Local wound exploration; if anterior fascia violated → CT or DPL or laparoscopy", "n3"),
        ok("Gunshot wound → laparotomy (high rate of organ injury)", "outLap"),
      ]),
      D("n3", "Workup result?", [
        ok("Free fluid, organ injury, or peritonitis → laparotomy", "outLap"),
        ok("Negative → admit for serial abdominal exams", "outObserve"),
      ]),
      O("outLap", "Exploratory laparotomy"),
      O("outObserve", "Serial abdominal exams; CT if uncertain"),
    ]),
  },

  {
    id: "supracondylar",
    title: "Supracondylar Fracture Complications",
    category: "Musculoskeletal",
    difficulty: "medium",
    blurb: "Watch for median nerve and brachial artery injury.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Pediatric displaced supracondylar humerus fracture. Most important early concerns?", [
        ok("Neurovascular: median (especially anterior interosseous) nerve + brachial artery", "n2"),
        no("Just immobilize and follow-up in a week", "Risk of compartment syndrome and Volkmann ischemic contracture."),
      ]),
      D("n2", "Vascular exam findings most concerning?", [
        ok("Absent radial pulse, pallor, pain on passive extension of fingers → compartment syndrome risk", "outNV"),
        ok("Intact distal perfusion, good capillary refill → splint and urgent ortho", "outSplint"),
      ]),
      O("outNV", "Emergent closed reduction + pinning; vascular consult if pulse not restored",
        "Volkmann ischemic contracture is the late complication.",
        ["AIN palsy: cannot make 'OK' sign (FPL, FDP to index)",
         "Anterior fat pad alone may be normal; posterior fat pad is always pathologic"]),
      O("outSplint", "Splint with elbow at 60–90° flexion; urgent ortho for reduction and percutaneous pinning"),
    ]),
  },

  // ═══ PULMONARY ═══
  {
    id: "pe-suspected",
    title: "Suspected Pulmonary Embolism (Initial Approach)",
    category: "Pulmonary",
    difficulty: "medium",
    blurb: "Stabilize, check anticoagulation contraindications, then risk-stratify.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected PE. First steps?", [
        ok("Stabilize with O₂ + IV fluids if needed", "n2"),
        no("CTPA before checking for contraindications", "Need to know if anticoagulation is even possible."),
      ]),
      D("n2", "Absolute contraindications to anticoagulation?", [
        ok("Present → IVC filter + obtain diagnostic test", "outIVC"),
        ok("None → use Wells score", "n3"),
      ]),
      D("n3", "Modified Wells score result?", [
        ok("PE unlikely (Wells ≤4)", "n4"),
        ok("PE likely (Wells >4)", "n5"),
      ]),
      D("n4", "PE unlikely — next test?", [
        ok("Age-adjusted D-dimer (×10 if >50 yr) or PERC", "n6"),
        no("CTPA on every patient", "D-dimer is sensitive enough to rule out in low risk."),
      ]),
      D("n5", "PE likely — next step?", [
        ok("Empiric anticoagulation + CTPA (or V/Q if contrast contraindicated)", "n6"),
        no("D-dimer", "Low specificity at high pretest probability."),
      ]),
      D("n6", "Diagnostic test result?", [
        ok("Positive for PE → start/continue anticoagulation; thrombolytics if massive PE", "outAC"),
        ok("Negative → stop anticoagulation; pursue alternative diagnosis", "outNeg"),
      ]),
      O("outIVC", "IVC filter + diagnostic imaging once stable"),
      O("outAC", "Anticoagulation (DOAC preferred unless cancer-related or pregnant); thrombolytics for hemodynamic instability",
        "PESI score guides outpatient vs inpatient management.",
        ["Massive PE (shock) → systemic tPA or catheter-directed thrombolysis",
         "Submassive PE with RV strain → consider catheter-directed therapy",
         "DOAC: apixaban/rivaroxaban can start immediately; dabigatran/edoxaban need parenteral lead-in"]),
      O("outNeg", "Look for other diagnoses (ACS, pneumothorax, pneumonia, pericarditis, MSK)"),
    ]),
  },

  {
    id: "pe-strategy",
    title: "Diagnostic Strategy in Suspected PE",
    category: "Pulmonary",
    difficulty: "easy",
    blurb: "Wells score → D-dimer or CTPA.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected PE — first scoring step?", [
        ok("Apply modified Wells criteria", "n2"),
        no("Get a chest CT for every patient", "Risk-stratify first."),
      ]),
      D("n2", "Wells result?", [
        ok("PE unlikely → D-dimer", "n3"),
        ok("PE likely → CTPA", "n4"),
      ]),
      D("n3", "D-dimer result?", [
        ok("≤500 ng/mL → PE excluded", "outNoPE"),
        ok(">500 ng/mL → CTPA", "n4"),
      ]),
      D("n4", "CTPA result?", [
        ok("Positive → PE confirmed", "outPE"),
        ok("Negative → PE excluded", "outNoPE"),
      ]),
      O("outPE", "Treat PE per anticoagulation algorithm"),
      O("outNoPE", "PE excluded — pursue alternative diagnosis"),
    ]),
  },

  {
    id: "hemoptysis",
    title: "Hemoptysis Evaluation",
    category: "Pulmonary",
    difficulty: "medium",
    blurb: "Massive bleeding = airway, bleeding side down.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Hemoptysis severity?", [
        ok("Massive (>600 mL/24 h or >100 mL/h) → secure airway", "outMassive"),
        ok("Mild/moderate", "n2"),
      ]),
      D("n2", "Mild/moderate — initial labs?", [
        ok("CXR, CBC, coags, BMP, UA (± rheum/vasculitis workup)", "n3"),
        no("Bronchoscopy first", "Reserve for ongoing bleeding or to localize."),
      ]),
      D("n3", "Bleeding stops with conservative care?", [
        ok("Yes → treat underlying cause (bronchitis, pneumonia, malignancy)", "outCause"),
        ok("No → CT + bronchoscopy", "outScope"),
      ]),
      O("outMassive", "Secure airway, breathing, circulation; position bleeding side down; selective intubation; bronchoscopy ± bronchial artery embolization ± surgery"),
      O("outCause", "Treat underlying etiology"),
      O("outScope", "CT chest + bronchoscopy; persistent → embolization or resection"),
    ]),
  },

  {
    id: "vap",
    title: "Ventilator-Associated Pneumonia",
    category: "Infectious Disease",
    difficulty: "medium",
    blurb: "Culture, empiric broad coverage, then narrow to results.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected VAP (intubated >48 h, new infiltrate, fever, leukocytosis). First step?", [
        ok("Endotracheal sample for culture + microscopy", "n2"),
        no("Empiric oral fluconazole", "Wrong category — VAP is usually bacterial."),
      ]),
      D("n2", "After samples obtained — next?", [
        ok("Start empiric antibiotics: anti-pseudomonal β-lactam + second gram-negative agent + MRSA coverage", "n3"),
        no("Wait for cultures before treating", "Delay increases mortality."),
      ]),
      D("n3", "Culture result and clinical course?", [
        ok("Negative cultures → discontinue antibiotics, evaluate other causes", "outNeg"),
        ok("Positive + clinical improvement → narrow antibiotics", "outNarrow"),
        ok("Positive, no improvement → reassess: change abx, evaluate for empyema/abscess, look for other causes", "outReassess"),
      ]),
      O("outNeg", "Stop antibiotics; look for non-infectious causes (PE, atelectasis, ARDS)"),
      O("outNarrow", "De-escalate by culture; 7-day course usually sufficient"),
      O("outReassess", "Change antibiotics; CT for complications; consult ID"),
    ]),
  },

  {
    id: "lung-cancer-screen",
    title: "Lung Cancer Screening",
    category: "Pulmonary",
    difficulty: "easy",
    blurb: "Annual low-dose CT in heavy smokers age 50–80.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Asymptomatic smoker. Screening test of choice?", [
        ok("Low-dose chest CT annually", "n2"),
        no("Chest X-ray annually", "CXR has no mortality benefit for lung cancer screening."),
        no("Sputum cytology", "Not a screening tool."),
      ]),
      D("n2", "Who qualifies (current USPSTF 2021)?", [
        ok("Age 50–80, ≥20 pack-years, currently smoking or quit within 15 years", "outYes"),
        no("Age >80 with active major medical comorbidity", "Lower life expectancy nullifies benefit."),
        no("Age 30, 5 pack-years", "Below criteria."),
      ]),
      O("outYes", "Annual low-dose chest CT until age 80, ≥15 y since quitting, or life-expectancy-limiting illness",
        "USPSTF updated 2021: age lowered to 50 and pack-years to 20 (was 55 and 30 in 2013).",
        ["Lung-RADS classification guides follow-up of nodules",
         "Counsel about smoking cessation at every visit"]),
    ]),
  },

  // ═══ GASTROENTEROLOGY ═══
  {
    id: "neonatal-cholestasis",
    title: "Neonatal Cholestasis",
    category: "Pediatrics",
    difficulty: "medium",
    blurb: "Conjugated hyperbilirubinemia → US splits the workup.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Newborn with dark urine, acholic stools, conjugated hyperbilirubinemia. First test?", [
        ok("Abdominal ultrasound", "n2"),
        no("MRI brain", "Not the right organ."),
        no("Empiric phenobarbital", "Not first-line for cholestasis."),
      ]),
      D("n2", "Ultrasound finding?", [
        ok("Abnormal or absent gallbladder → biliary atresia workup", "outBA"),
        ok("Cystic dilation of biliary tree → choledochal cyst", "outBC"),
        ok("Isolated hepatomegaly or normal → infectious + genetic/metabolic workup", "outWorkup"),
      ]),
      O("outBA", "Biliary atresia → HIDA scan, intraoperative cholangiogram, Kasai portoenterostomy",
        "Outcome is best if Kasai performed before 8 weeks of life.",
        ["Triangular cord sign on ultrasound is classic",
         "Most still require liver transplant eventually"]),
      O("outBC", "Choledochal cyst → surgical excision (risk of cholangiocarcinoma)"),
      O("outWorkup", "Targeted workup for CMV, toxoplasmosis, HSV, sepsis/UTI; AAT, Dubin-Johnson, galactosemia, CF, tyrosinemia"),
    ]),
  },

  {
    id: "straining-infant",
    title: "The Straining Infant",
    category: "Pediatrics",
    difficulty: "easy",
    blurb: "Red flags vs functional constipation vs infant dyschezia.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Infant straining with stools. First triage?", [
        ok("Ill-appearing or red flags (distention, abnormal rectal tone, delayed meconium, FTT)", "outOrganic"),
        ok("Well-appearing", "n2"),
      ]),
      D("n2", "Stool characteristics?", [
        ok("Loose stools, mucus, blood → food protein-induced proctocolitis", "outFPIAP"),
        ok("Normal stool consistency → infant dyschezia", "outDys"),
        ok("Hard or pellet-like stools → functional constipation", "outConstip"),
      ]),
      O("outOrganic", "Serious organic cause workup: Hirschsprung, cystic fibrosis, spinal dysraphism, hypothyroidism"),
      O("outFPIAP", "Eliminate cow milk protein (and soy if breastfeeding) or switch to hypoallergenic formula"),
      O("outDys", "Normal infant dyschezia; reassurance — resolves spontaneously"),
      O("outConstip", "Functional constipation; consider anal fissure if blood streaked",
        "Increase fluid; for ≥6 months, may add prune juice or PEG.",
        ["Anal fissures from hard stool can produce small-volume bright red blood without serious illness"]),
    ]),
  },

  {
    id: "appendicitis",
    title: "Suspected Appendicitis",
    category: "Gastroenterology",
    difficulty: "easy",
    blurb: "Imaging tailored to age and pregnancy.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Modified Alvarado ≥4. Imaging choice?", [
        ok("Child or pregnant → ultrasound first; if non-diagnostic, MRI (avoid CT radiation)", "n2"),
        ok("Adult, non-pregnant → abdominopelvic CT with contrast", "n2"),
        no("Skip imaging, go straight to OR", "Imaging reduces negative appendectomy rate."),
      ]),
      D("n2", "Imaging result?", [
        ok("Normal appendix → other diagnosis", "outOther"),
        ok("Non-visualized appendix → manage by score, repeat imaging, or surgical evaluation", "outScore"),
        ok("Non-perforated appendicitis → antibiotics + appendectomy <12 h", "outAppy"),
        ok("Perforated → antibiotics + bowel rest; PCD (contained abscess) vs I&D + appendectomy (diffuse contamination)", "outPerf"),
      ]),
      O("outOther", "Look for alternative cause (mesenteric adenitis, ovarian pathology, diverticulitis)"),
      O("outScore", "Management depends on Alvarado score and clinical picture"),
      O("outAppy", "Laparoscopic appendectomy + perioperative antibiotics"),
      O("outPerf", "IV antibiotics, bowel rest, possible drainage; interval appendectomy in 6–8 weeks if managed non-op"),
    ]),
  },

  {
    id: "gastric-ca-staging",
    title: "Staging of Gastric Adenocarcinoma",
    category: "Oncology",
    difficulty: "medium",
    blurb: "CT first, then EUS + PET + laparoscopy for full staging.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Biopsy-positive gastric adenocarcinoma. First staging study?", [
        ok("CT abdomen and pelvis", "n2"),
        no("Bone scan", "Bone mets in gastric ca are uncommon early."),
      ]),
      D("n2", "After CT — next steps?", [
        ok("PET/CT, endoscopic ultrasound, CT chest, laparoscopy (± peritoneal lavage)", "n3"),
        no("Start chemo without staging", "Stage drives treatment."),
      ]),
      D("n3", "Stage assessment?", [
        ok("Limited (resectable) → surgical resection ± perioperative chemo", "outLimited"),
        ok("Advanced → systemic chemotherapy ± palliative measures", "outAdvanced"),
      ]),
      O("outLimited", "Surgical resection (subtotal/total gastrectomy + D2 lymphadenectomy); perioperative chemo (FLOT)"),
      O("outAdvanced", "Systemic chemo ± immunotherapy (HER2, PD-L1 targeted) + palliative surgery for obstruction/bleeding"),
    ]),
  },

  {
    id: "gastrinoma",
    title: "Suspected Gastrinoma (Zollinger–Ellison)",
    category: "Gastroenterology",
    difficulty: "hard",
    blurb: "Multiple ulcers + thick gastric folds → check gastrin off PPI.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Endoscopy shows multiple ulcers + thick gastric folds. Next step?", [
        ok("Stop PPI for 1 week, then check serum gastrin", "n2"),
        no("Check gastrin on PPI", "PPI artificially elevates gastrin."),
      ]),
      D("n2", "Off-PPI gastrin?", [
        ok("<110 pg/mL → not gastrinoma", "outNo"),
        ok("110–1000 pg/mL → secretin stimulation test", "n3"),
        ok(">1000 pg/mL → check gastric pH off PPI", "n4"),
      ]),
      D("n3", "Secretin stimulation test?", [
        ok("Paradoxical gastrin rise >120 → gastrinoma", "outGastrinoma"),
        ok("Negative → not gastrinoma", "outNo"),
      ]),
      D("n4", "Gastric pH off PPI?", [
        ok("≤4 → gastrinoma (further testing to localize)", "outGastrinoma"),
        ok(">4 → not gastrinoma", "outNo"),
      ]),
      O("outGastrinoma", "Confirmed ZES — somatostatin receptor scintigraphy or EUS to localize; surgical resection if possible",
        "ZES is in the 'gastrinoma triangle' (junction of CBD, neck of pancreas, 2nd/3rd duodenum). Associated with MEN-1.",
        ["Screen for hyperparathyroidism and pituitary tumors (MEN-1)",
         "PPI is first-line medical management of acid hypersecretion"]),
      O("outNo", "Not gastrinoma — pursue alternative cause of refractory ulcers"),
    ]),
  },

  {
    id: "gerd",
    title: "GERD Management",
    category: "Gastroenterology",
    difficulty: "easy",
    blurb: "PPI trial vs endoscopy depending on alarm features.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "GERD-typical symptoms. Alarm features or men >50 with >5 y symptoms?",
        [
          ok("No → empiric once-daily PPI for 2 months + lifestyle measures", "n2"),
          ok("Yes → endoscopy", "n3"),
        ],
        "Alarms: dysphagia/odynophagia, weight loss, anemia, GI bleeding, persistent vomiting."),
      D("n2", "After 2 months — refractory?", [
        ok("No → continue therapy at lowest effective dose", "outCont"),
        ok("Yes → switch PPI or increase to BID dosing", "n4"),
      ]),
      D("n3", "Endoscopy result?", [
        ok("Esophagitis → treat per finding", "outEsoph"),
        ok("No esophagitis → consider pH monitoring, manometry, or alternative diagnoses", "outFurther"),
      ]),
      D("n4", "After PPI escalation — controlled?", [
        ok("Yes → continue at the effective dose", "outCont"),
        ok("No → endoscopy + pH monitoring", "outFurther"),
      ]),
      O("outCont", "Continue PPI at the lowest effective dose; address weight loss, head-of-bed elevation, evening eating"),
      O("outEsoph", "Treat: pill esophagitis, eosinophilic, Barrett, autoimmune, ZES, scleroderma per finding"),
      O("outFurther", "Test for achalasia, gastroparesis, non-acid reflux, nocturnal acid breakthrough"),
    ]),
  },

  {
    id: "alk-phos",
    title: "Elevated Alkaline Phosphatase",
    category: "Gastroenterology",
    difficulty: "medium",
    blurb: "GGT distinguishes hepatobiliary from bone origin.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Elevated serum alk phos. First test?", [
        ok("Check GGT", "n2"),
        no("Liver biopsy", "Premature — fractionate first."),
      ]),
      D("n2", "GGT?", [
        ok("Elevated → likely biliary origin", "n3"),
        ok("Normal → likely bone origin", "outBone"),
      ]),
      D("n3", "RUQ ultrasound + AMA?", [
        ok("AMA positive or abnormal parenchyma → liver biopsy", "outLBx"),
        ok("Dilated bile ducts → ERCP/MRCP", "outERCP"),
        ok("Both normal → reassess; consider MRCP for PSC", "outMRCP"),
      ]),
      O("outBone", "Bone source: Paget, bone metastases, fracture, osteomalacia, hyperparathyroidism, growth (children)"),
      O("outLBx", "Liver biopsy — likely PBC (AMA-positive)"),
      O("outERCP", "ERCP for choledocholithiasis, stricture, malignancy"),
      O("outMRCP", "MRCP for primary sclerosing cholangitis"),
    ]),
  },

  {
    id: "hyperbili-adult",
    title: "Hyperbilirubinemia in Adults",
    category: "Gastroenterology",
    difficulty: "medium",
    blurb: "Conjugated vs unconjugated, then enzyme pattern.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Hyperbilirubinemia — initial branch?", [
        ok("Conjugated vs unconjugated", "n2"),
        no("Total bilirubin only", "Need fractionation."),
      ]),
      D("n2", "Predominant fraction?", [
        ok("Unconjugated", "outUnconj"),
        ok("Conjugated", "n3"),
      ]),
      D("n3", "Conjugated — enzyme pattern?", [
        ok("AST/ALT predominant → hepatocellular", "outHepatoCell"),
        ok("Alk phos predominant → cholestatic", "outCholestatic"),
        ok("Normal enzymes → Dubin–Johnson, Rotor", "outNormal"),
      ]),
      O("outUnconj", "Hemolysis, drug reduced uptake, Gilbert, Crigler–Najjar"),
      O("outHepatoCell", "Viral, autoimmune, toxic/drug, ischemic, alcoholic hepatitis, hemochromatosis, Wilson"),
      O("outCholestatic", "PBC, PSC, malignancy (pancreas/ampullary/cholangio), choledocholithiasis, pregnancy cholestasis",
        "Abdominal imaging + AMA; ERCP/MRCP as warranted."),
      O("outNormal", "Dubin–Johnson or Rotor syndrome"),
    ]),
  },

  {
    id: "brbpr-minimal",
    title: "Minimal Bright Red Blood Per Rectum",
    category: "Gastroenterology",
    difficulty: "easy",
    blurb: "Age + red flags decide anoscopy vs colonoscopy.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Minimal BRBPR — age/red flags?",
        [
          ok("<40 without red flags → anoscopy", "n2"),
          ok("40–49 without red flags → anoscopy, then sigmoidoscopy/colonoscopy if no source", "n2"),
          ok("≥50 OR red flags (weight loss, change in bowel habits, anemia, FH colon ca) → colonoscopy", "outScope"),
        ],
        "Red flags: change in bowel habits, abdominal pain, weight loss, IDA, FH colorectal cancer."),
      D("n2", "Anoscopy result?", [
        ok("Hemorrhoids identified → no further evaluation needed", "outHemorrhoid"),
        ok("No source found → sigmoidoscopy or colonoscopy", "outScope"),
      ]),
      O("outHemorrhoid", "Sitz baths, fiber, topical care; banding if persistent"),
      O("outScope", "Colonoscopy — identify and treat source"),
    ]),
  },

  {
    id: "dysphagia",
    title: "Dysphagia Evaluation",
    category: "Gastroenterology",
    difficulty: "medium",
    blurb: "Oropharyngeal vs esophageal; mechanical vs motility.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Difficulty swallowing with cough, choking, or nasal regurg?", [
        ok("Yes → oropharyngeal", "outVideoFluoro"),
        ok("No → esophageal", "n2"),
      ]),
      D("n2", "Esophageal: pattern of dysphagia?", [
        ok("Solids AND liquids at onset → motility disorder", "outMotility"),
        ok("Solids progressing to liquids → mechanical obstruction", "n3"),
      ]),
      D("n3", "Prior radiation, caustic injury, complex stricture, or head/neck cancer surgery?", [
        ok("Yes → barium swallow first (avoid scope perforation)", "outBarium"),
        ok("No → upper endoscopy", "outEGD"),
      ]),
      O("outVideoFluoro", "Video fluoroscopic modified barium swallow + SLP evaluation"),
      O("outMotility", "Barium swallow then manometry — achalasia, DES, scleroderma"),
      O("outBarium", "Barium swallow, then targeted endoscopy"),
      O("outEGD", "Upper endoscopy with biopsy"),
    ]),
  },

  {
    id: "variceal",
    title: "Variceal Hemorrhage",
    category: "Gastroenterology",
    difficulty: "hard",
    blurb: "Octreotide + abx + urgent endoscopic ligation.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected variceal hemorrhage. Initial management?", [
        ok("2 large-bore IVs + volume resuscitation + IV octreotide + IV antibiotics (ceftriaxone) + endoscopy within 12 h", "n2"),
        no("Wait and observe", "Variceal bleed has 20–30% mortality."),
        no("Heparin", "Bleeding patient — anticoagulation contraindicated."),
      ]),
      D("n2", "After urgent endoscopic band ligation — course?", [
        ok("No further bleeding → secondary prophylaxis: non-selective β-blocker + EVL 1–2 weeks later", "outProphylaxis"),
        ok("Continued bleeding → balloon tamponade (Sengstaken–Blakemore), then TIPS or shunt surgery", "outTIPS"),
        ok("Early rebleeding → repeat endoscopic therapy", "outRepeat"),
      ]),
      O("outProphylaxis", "Nadolol/propranolol + serial EVL until obliteration"),
      O("outTIPS", "TIPS for refractory bleeding"),
      O("outRepeat", "Repeat endoscopic therapy; if recurrent, TIPS"),
    ]),
  },

  {
    id: "cirrhosis-mgmt",
    title: "Cirrhosis Management",
    category: "Gastroenterology",
    difficulty: "medium",
    blurb: "Surveillance for HCC and varices; treat each decompensation.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Compensated cirrhosis. Surveillance?", [
        ok("Ultrasound + AFP every 6 months for HCC, EGD for varices", "n2"),
        no("MRI every month", "Excessive."),
      ]),
      D("n2", "Decompensation type?", [
        ok("Variceal hemorrhage → non-selective β-blocker + repeat EGD yearly", "outVar"),
        ok("Ascites → sodium restriction + diuretics (spironolactone + furosemide) + paracentesis", "outAscites"),
        ok("Hepatic encephalopathy → ID precipitant, lactulose, rifaximin", "outHE"),
      ]),
      O("outVar", "β-blocker + endoscopic ligation surveillance"),
      O("outAscites", "Diet, diuretics, paracentesis; SBP prophylaxis if prior SBP or low ascites protein",
        "SBP if ascitic PMN >250; ceftriaxone empirically."),
      O("outHE", "Identify infection, GI bleeding, electrolyte imbalance; lactulose 3–4 BMs/day; rifaximin to prevent recurrence"),
    ]),
  },

  {
    id: "hiv-dysphagia",
    title: "HIV Odynophagia / Esophagitis",
    category: "Infectious Disease",
    difficulty: "medium",
    blurb: "Empirical fluconazole for mild; endoscopy for severe.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "HIV+ with dysphagia/odynophagia. Initial step?", [
        ok("Mild symptoms with oral thrush → empiric fluconazole, observe for response", "outCandida"),
        ok("Severe symptoms or no thrush → endoscopy with biopsy", "n2"),
      ]),
      D("n2", "Endoscopy finding?", [
        ok("White plaques → Candida", "outCandida"),
        ok("Large linear ulcers → CMV", "outCMV"),
        ok("Vesicles or small round/ovoid ulcers → HSV", "outHSV"),
        ok("Aphthous ulcers → idiopathic / HIV", "outAph"),
      ]),
      O("outCandida", "Fluconazole 100–200 mg/day; check if no improvement, scope"),
      O("outCMV", "IV ganciclovir; reduce HIV viral load"),
      O("outHSV", "Acyclovir"),
      O("outAph", "Symptomatic; consider thalidomide if severe"),
    ]),
  },

  {
    id: "vertebral-osteo",
    title: "Vertebral Osteomyelitis",
    category: "Infectious Disease",
    difficulty: "medium",
    blurb: "Suspect with fever + back pain + focal spinal tenderness.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Fever + back pain + focal spinal tenderness. Initial workup?", [
        ok("Blood cultures + ESR/CRP + plain spinal X-rays", "n2"),
        no("Empiric vancomycin without cultures", "Pre-treatment cultures matter for tailoring abx."),
      ]),
      D("n2", "Result?", [
        ok("Elevated ESR/CRP but normal X-rays → MRI", "n3"),
        ok("X-rays show changes → MRI for extent + organism workup", "n3"),
      ]),
      D("n3", "MRI confirms vertebral osteomyelitis ± epidural abscess. Next?", [
        ok("CT-guided needle aspiration/biopsy for organism", "outBx"),
        no("Empiric antibiotics for 6 weeks without culture", "Tissue dx needed unless blood cultures grow."),
      ]),
      O("outBx", "Targeted antibiotics 6 weeks based on culture; surgery for abscess, instability, or neuro deficit",
        "Most common organism: Staph aureus. IV drug users may have Pseudomonas.",
        ["Get an MRI of the entire spine to look for multi-level disease",
         "Surgical drainage required for any epidural abscess with neurologic compromise"]),
    ]),
  },

  // ═══ HEMATOLOGY ═══
  {
    id: "dvt-tx",
    title: "Treatment of Deep Vein Thrombosis",
    category: "Hematology",
    difficulty: "medium",
    blurb: "Proximal DVT → anticoag; check for thrombolysis/IVC filter triggers.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Proximal lower-extremity DVT — first decision?", [
        ok("PE with hemodynamic instability OR massive iliofemoral DVT with limb-threatening ischemia?", "n2"),
        ok("Standard proximal DVT → check contraindications to anticoagulation", "n3"),
      ]),
      D("n2", "Indication for thrombolysis present — contraindications?", [
        ok("Yes → consider mechanical thrombectomy", "outMech"),
        ok("No → systemic or catheter-directed thrombolysis", "outLysis"),
      ]),
      D("n3", "Contraindications to anticoagulation?", [
        ok("Yes → IVC filter", "outIVC"),
        ok("No → anticoagulation (DOAC preferred)", "outAC"),
      ]),
      O("outMech", "Mechanical/surgical thrombectomy"),
      O("outLysis", "Catheter-directed thrombolysis"),
      O("outIVC", "IVC filter; reassess anticoagulation in 1–2 weeks"),
      O("outAC", "Anticoagulation: provoked → 3 mo, unprovoked or cancer → ≥3 mo, often indefinite",
        "DOACs (apixaban, rivaroxaban) preferred unless cancer-associated, severe renal failure, or pregnancy (LMWH).",
        ["Cancer-associated VTE: DOAC or LMWH",
         "Recurrent VTE on anticoagulation → switch agent or escalate dose"]),
    ]),
  },

  {
    id: "anemia",
    title: "Anemia Evaluation",
    category: "Hematology",
    difficulty: "medium",
    blurb: "MCV splits the workup; reticulocyte count clarifies normocytic anemia.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Anemia confirmed — first stratifier?", [
        ok("MCV", "n2"),
        no("Reticulocyte count first", "Reticulocyte useful within MCV bins, not before."),
      ]),
      D("n2", "MCV category?", [
        ok("Microcytic (<80)", "outMicro"),
        ok("Normocytic (80–100)", "n3"),
        ok("Macrocytic (>100)", "outMacro"),
      ]),
      D("n3", "Normocytic — reticulocyte count?", [
        ok("Low → marrow failure (aplastic, CKD), anemia of chronic disease, leukemia", "outNormLow"),
        ok("High → hemolysis or hemorrhage", "outNormHigh"),
      ]),
      O("outMicro", "Microcytic: iron deficiency, thalassemia, lead, sideroblastic, ACD (sometimes)",
        "Ferritin: ↓ in IDA, ↑ or normal in ACD/thalassemia. RDW: ↑ in IDA, normal in thalassemia."),
      O("outNormLow", "Workup: BMP, B12/folate, reticulocyte response after iron replacement; bone marrow if uncertain"),
      O("outNormHigh", "Hemolysis workup: LDH, haptoglobin, indirect bili, peripheral smear, Coombs",
        "Causes: G6PD, hereditary spherocytosis, autoimmune, microangiopathic, sickle cell."),
      O("outMacro", "Megaloblastic: B12, folate; non-megaloblastic: alcohol, liver, hypothyroid, MDS, drugs",
        "B12 deficiency: subacute combined degeneration. Folate doesn't cause neuro symptoms."),
    ]),
  },

  {
    id: "cancer-pain",
    title: "Cancer Pain Management (WHO Ladder)",
    category: "Oncology",
    difficulty: "easy",
    blurb: "WHO ladder: non-opioid → weak opioid → strong opioid.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Cancer pain severity?", [
        ok("Mild → non-opioid (acetaminophen, NSAID)", "outMild"),
        ok("Moderate → weak opioid (codeine, hydrocodone, tramadol) + non-opioid", "outMod"),
        ok("Severe → strong short-acting opioid (morphine, hydromorphone) + non-opioid", "n2"),
      ]),
      D("n2", "After titration with short-acting opioids — next step?", [
        ok("Calculate total daily dose, convert to long-acting (fentanyl patch, oxycodone CR) + breakthrough short-acting", "outLong"),
      ]),
      O("outMild", "Non-opioid analgesics + adjuvants (anticonvulsants, antidepressants for neuropathic)"),
      O("outMod", "Step 2 of WHO ladder"),
      O("outLong", "Long-acting opioid for baseline + short-acting for breakthrough; bowel regimen mandatory",
        "Adjuvants for bone pain (bisphosphonates, RT), neuropathic (gabapentin, TCAs).",
        ["Start senna + docusate with every opioid prescription",
         "Methadone equianalgesic ratios are dose-dependent — consult expert"]),
    ]),
  },

  // ═══ ENDOCRINE ═══
  {
    id: "hypercalcemia",
    title: "Hypercalcemia Workup",
    category: "Endocrine",
    difficulty: "medium",
    blurb: "PTH splits PTH-dependent vs PTH-independent.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Elevated Ca. First step?", [
        ok("Confirm with repeat + correct for albumin (or ionized Ca)", "n2"),
        no("Start IV bisphosphonate immediately", "Confirm before treating."),
      ]),
      D("n2", "Confirmed — branching test?", [
        ok("PTH", "n3"),
        no("Vitamin D first", "PTH narrows the differential faster."),
      ]),
      D("n3", "PTH result?", [
        ok("High-normal / elevated → PTH-dependent", "outPTHdep"),
        ok("Suppressed → PTH-independent", "n4"),
      ]),
      D("n4", "PTH-independent — next labs?", [
        ok("PTHrP, 25-OH vit D, 1,25-(OH)₂ vit D", "outPTHind"),
      ]),
      O("outPTHdep", "Primary or tertiary hyperparathyroidism, FHH, lithium",
        "FHH: urine Ca/Cr clearance ratio <0.01.",
        ["Surgery for primary hyperparathyroidism if symptomatic or meets criteria (Ca >1 above ULN, GFR <60, age <50, T-score <-2.5)"]),
      O("outPTHind", "Malignancy (↑PTHrP), vit D toxicity, granulomatous disease, thiazides, milk-alkali, hyperthyroidism, vit A, immobilization",
        "Severe symptomatic hypercalcemia (Ca >14 or symptoms): IV fluids → calcitonin (rapid) → bisphosphonate or denosumab (durable)."),
    ]),
  },

  {
    id: "hypocalcemia",
    title: "Hypocalcemia Workup",
    category: "Endocrine",
    difficulty: "medium",
    blurb: "Always check magnesium before chasing PTH.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Low Ca confirmed (corrected for albumin or ionized). First questions?", [
        ok("Low magnesium, drugs (bisphosphonates, foscarnet), recent transfusion (citrate)?", "n2"),
        no("Order PTH immediately", "Low Mg blunts PTH release — fix Mg first."),
      ]),
      D("n2", "Mg / drug / transfusion etiology?", [
        ok("Yes → treat underlying + replete Mg; IV Ca if severe symptoms", "outMg"),
        ok("No → check PTH", "n3"),
      ]),
      D("n3", "PTH level?", [
        ok("Low or normal → hypoparathyroidism", "outHypo"),
        ok("High → vit D deficiency, CKD, pancreatitis, sepsis, tumor lysis, pseudohypoparathyroidism", "outHigh"),
      ]),
      O("outMg", "Replete magnesium; IV calcium gluconate for tetany/seizure/QT prolongation"),
      O("outHypo", "Hypoparathyroidism: post-surgical (most common), autoimmune (APS-1), genetic (DiGeorge, CaSR), infiltrative"),
      O("outHigh", "Replace vitamin D (if deficient); treat underlying disease",
        "Pseudohypoparathyroidism: high PTH, low Ca, no response to PTH (end-organ resistance)."),
    ]),
  },

  {
    id: "thyroid-nodule",
    title: "Thyroid Nodule Evaluation",
    category: "Endocrine",
    difficulty: "easy",
    blurb: "TSH + ultrasound; iodine scan only if TSH is low.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Palpable thyroid nodule. Initial tests?", [
        ok("TSH + thyroid ultrasound", "n2"),
        no("FNA first without checking TSH", "If TSH is low, FNA is not the first step."),
      ]),
      D("n2", "TSH result?", [
        ok("Normal or elevated → assess US features", "outFNA"),
        ok("Low (suppressed) → radioactive iodine scintigraphy", "n3"),
      ]),
      D("n3", "Scintigraphy pattern?", [
        ok("Hyperfunctional ('hot') nodule", "outHot"),
        ok("Hypofunctional ('cold') or indeterminate → assess US/size for FNA", "outFNA"),
      ]),
      O("outFNA", "FNA based on size + US features (TI-RADS or ATA criteria)",
        "TI-RADS or ATA risk categories guide FNA threshold sizes."),
      O("outHot", "Treat hyperthyroidism — hot nodules are essentially never malignant",
        "Options: radioactive iodine, antithyroid drugs, surgery."),
    ]),
  },

  {
    id: "hyperthyroid",
    title: "Hyperthyroidism Evaluation",
    category: "Endocrine",
    difficulty: "medium",
    blurb: "TSH + free T3/T4 → RAIU pattern.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected hyperthyroidism. Initial labs?", [
        ok("TSH + free T3 + free T4", "n2"),
      ]),
      D("n2", "Pattern?", [
        ok("TSH low + T3/T4 high → primary", "n3"),
        ok("TSH high + T3/T4 high → secondary (TSH-secreting adenoma)", "outMRI"),
      ]),
      D("n3", "Graves features (diffuse goiter + ophthalmopathy)?", [
        ok("Yes → Graves disease", "outGraves"),
        ok("No → RAIU + scan", "n4"),
      ]),
      D("n4", "RAIU result?", [
        ok("High, diffuse → Graves", "outGraves"),
        ok("High, nodular → toxic adenoma or multinodular goiter", "outNodular"),
        ok("Low uptake → check serum thyroglobulin", "n5"),
      ]),
      D("n5", "Thyroglobulin?", [
        ok("High → thyroiditis or iodine exposure", "outThyroiditis"),
        ok("Low → exogenous thyroid hormone", "outExo"),
      ]),
      O("outMRI", "MRI pituitary"),
      O("outGraves", "Graves: TSI/TRAb-positive; methimazole, RAI ablation, or thyroidectomy",
        "PTU first trimester pregnancy and for thyroid storm; methimazole otherwise."),
      O("outNodular", "Toxic adenoma or toxic MNG"),
      O("outThyroiditis", "Subacute or postpartum thyroiditis, or iodine exposure"),
      O("outExo", "Factitious or excess levothyroxine"),
    ]),
  },

  {
    id: "water-deprivation",
    title: "Water Deprivation Test",
    category: "Endocrine",
    difficulty: "hard",
    blurb: "Distinguish primary polydipsia, central DI, nephrogenic DI.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Water deprivation test setup?", [
        ok("No water 2–3 h prior; measure urine volume/osm hourly, serum Na/osm q2h", "n2"),
      ]),
      D("n2", "Urine osmolality after deprivation?", [
        ok(">600 mOsm/kg → primary polydipsia", "outPP"),
        ok("Stable on 2–3 hourly measurements with plasma osm >295 or Na >145 → administer desmopressin", "n3"),
      ]),
      D("n3", "Urine osmolality response to desmopressin?", [
        ok("↑ 50–100% → central DI", "outCDI"),
        ok("Small or no increase → nephrogenic DI", "outNDI"),
      ]),
      O("outPP", "Primary polydipsia — behavioral, fluid restriction"),
      O("outCDI", "Central DI — desmopressin; MRI for sellar lesion"),
      O("outNDI", "Nephrogenic DI — stop lithium if responsible; low-Na diet, thiazide, amiloride"),
    ]),
  },

  {
    id: "polyuria",
    title: "Suspected Polyuria",
    category: "Endocrine",
    difficulty: "medium",
    blurb: "Confirm volume, then classify diuresis.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected polyuria. First test?", [
        ok("Complete 24-hour urine collection", "n2"),
      ]),
      D("n2", "24-hour urine output?", [
        ok(">3 L → polyuria", "n3"),
        ok("<3 L → not true polyuria; work up urinary frequency", "outFreq"),
      ]),
      D("n3", "Urine concentration?", [
        ok("Dilute → water diuresis (primary polydipsia or DI)", "outWater"),
        ok("Concentrated → osmotic diuresis (glucose, urea, saline)", "outOsm"),
      ]),
      O("outFreq", "Workup for urinary frequency (UTI, OAB, BPH)"),
      O("outWater", "Water deprivation test to distinguish primary polydipsia, central DI, nephrogenic DI"),
      O("outOsm", "Investigate solute: glucose (DM), urea (high-protein/renal), saline diuresis (post-AKI)"),
    ]),
  },

  {
    id: "hypertriglycerides",
    title: "Hypertriglyceridemia",
    category: "Endocrine",
    difficulty: "easy",
    blurb: "Secondary causes → lifestyle; >500 → fibrate/fish oil.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Hypertriglyceridemia. First step?", [
        ok("Evaluate secondary causes (diabetes, alcohol, hypothyroid, drugs, nephrotic, OCPs)", "n2"),
        no("Start fibrate immediately", "Treat secondary cause first when possible."),
      ]),
      D("n2", "Triglyceride level?", [
        ok("150–500 mg/dL → lifestyle; statin if ASCVD risk", "out150"),
        ok(">500 mg/dL → fibrate + omega-3 + abstinence from alcohol", "out500"),
      ]),
      O("out150", "Lifestyle (weight, exercise, moderate alcohol), statin for CV risk"),
      O("out500", "Pancreatitis prevention is priority — fibrate, fish oil; statin once TG ≤500"),
    ]),
  },

  // ═══ RENAL ═══
  {
    id: "hyponatremia",
    title: "Hyponatremia Evaluation",
    category: "Renal",
    difficulty: "hard",
    blurb: "Serum osm → urine osm → volume status.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Hyponatremia — first test?", [
        ok("Serum osmolality", "n2"),
        no("Fluid restrict immediately", "First confirm true hypotonic hyponatremia."),
      ]),
      D("n2", "Serum osmolality?", [
        ok(">290 → consider hyperglycemia or renal failure (translocational/pseudo)", "outPseudo"),
        ok("Normal/low (<275) → check urine osmolality", "n3"),
      ]),
      D("n3", "Urine osm <100?", [
        ok("Yes → primary polydipsia or low solute (beer potomania, tea-and-toast)", "outDilute"),
        ok("No → urine sodium <25?", "n4"),
      ]),
      D("n4", "Urine Na?", [
        ok("<25 → volume depletion (or 3rd-spacing: CHF, cirrhosis)", "outLowNa"),
        ok(">25 → SIADH, adrenal insufficiency, hypothyroidism, salt-wasting", "outHighNa"),
      ]),
      O("outPseudo", "Translocational (hyperglycemia, mannitol) or pseudohyponatremia (paraproteins, hyperlipidemia)"),
      O("outDilute", "Restrict water; address low solute intake"),
      O("outLowNa", "Isotonic saline (true volume deplete) or treat underlying CHF/cirrhosis with diuresis + restriction"),
      O("outHighNa", "SIADH → fluid restriction ± salt tabs ± vaptans; check cortisol, TSH",
        "Correct chronic hyponatremia <8 mEq/L/24 h to avoid osmotic demyelination."),
    ]),
  },

  {
    id: "proteinuria-dx",
    title: "Proteinuria Diagnosis",
    category: "Renal",
    difficulty: "easy",
    blurb: "First-morning urine to confirm; orthostatic is benign.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Asymptomatic isolated proteinuria. First step?", [
        ok("First-morning urine protein/creatinine ratio", "n2"),
      ]),
      D("n2", "First-morning Pr/Cr?", [
        ok("Elevated → workup for glomerular/parenchymal disease", "outGlom"),
        ok("Normal → recheck UA later", "n3"),
      ]),
      D("n3", "Subsequent UA?", [
        ok("Positive protein → orthostatic proteinuria (benign)", "outOrtho"),
        ok("Negative → transient proteinuria", "outTrans"),
      ]),
      O("outGlom", "Glomerular workup: spot Pr/Cr, complement, ANA, hepatitis serologies; renal biopsy if persistent + significant"),
      O("outOrtho", "Orthostatic proteinuria — common in adolescents; reassure"),
      O("outTrans", "Transient proteinuria from fever, exercise, dehydration; reassure"),
    ]),
  },

  {
    id: "hematuria-peds",
    title: "Hematuria in Children",
    category: "Pediatrics",
    difficulty: "medium",
    blurb: "Glomerular vs nonglomerular splits the workup.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Pediatric hematuria. Source?", [
        ok("Glomerular (brown urine, edema, HTN, proteinuria, RBC casts)", "outGlom"),
        ok("Nonglomerular", "n2"),
      ]),
      D("n2", "Symptomatic or asymptomatic?", [
        ok("Symptomatic: trauma → CT; UTI → culture + abx; perineal irritation → reassure; stone (flank pain, crystals) → renal US", "outSymp"),
        ok("Asymptomatic → renal US + urine culture + spot Ca:Cr ratio", "outAsymp"),
      ]),
      O("outGlom", "Workup: creatinine, CBC, complement, throat cultures (post-strep GN), kidney biopsy if needed"),
      O("outSymp", "Targeted workup per symptom; treat underlying"),
      O("outAsymp", "Evaluate hypercalciuria, idiopathic, hereditary nephritis (Alport)"),
    ]),
  },

  // ═══ NEUROLOGY ═══
  {
    id: "bell-palsy",
    title: "Unilateral Facial Weakness",
    category: "Neurology",
    difficulty: "easy",
    blurb: "Bell palsy vs red-flag mimics.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Unilateral facial weakness. First step?", [
        ok("Screen for red flags", "n2"),
        no("Start prednisone empirically", "Rule out stroke and other causes first."),
      ]),
      D("n2", "Red flags present?",
        [
          ok("None present → Bell palsy management", "outBell"),
          ok("Focal neurologic deficits → MRI brain to evaluate stroke", "outStroke"),
          ok("Lyme exposure / endemic area → Lyme serology", "outLyme"),
          ok("Hearing loss + imbalance/vertigo → MRI skull base for CPA tumor", "outCPA"),
          ok("Lower limb weakness, ↓DTRs → LP for GBS", "outGBS"),
        ],
        "Bell palsy is a diagnosis of exclusion."),
      O("outBell", "Eye protection (lubrication, taped closed at night) + high-dose glucocorticoids ± antivirals (acyclovir/valacyclovir within 72 h)",
        "Worsening over 3 weeks or no improvement at 4 months → imaging."),
      O("outStroke", "Stroke workup — MRI, then per stroke protocol"),
      O("outLyme", "Lyme serology; if positive, doxycycline 100 mg BID × 14–21 d (or amoxicillin if pregnant/peds)"),
      O("outCPA", "MRI internal auditory canal — vestibular schwannoma or other CPA tumor"),
      O("outGBS", "LP shows albuminocytologic dissociation; IVIG or plasmapheresis"),
    ]),
  },

  {
    id: "carpal-tunnel-tests",
    title: "Carpal Tunnel Tests",
    category: "Musculoskeletal",
    difficulty: "easy",
    blurb: "Phalen + Tinel; diagnosis confirmed with nerve conduction.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected carpal tunnel syndrome. Provocative tests?", [
        ok("Phalen test (wrist flexion 60 s reproduces symptoms) and Tinel sign (light tap over median n. produces tingling)", "n2"),
        no("Spurling maneuver", "That's for cervical radiculopathy."),
      ]),
      D("n2", "If equivocal, next test?", [
        ok("Nerve conduction studies + EMG", "outNCS"),
      ]),
      O("outNCS", "EMG/NCS confirms; first-line: wrist splinting at night + activity modification; injections; surgical release if persistent",
        "Pregnancy CTS often resolves postpartum.",
        ["Symptoms in median n. distribution: thumb, index, middle, half of ring",
         "Thenar atrophy is a late sign"]),
    ]),
  },

  // ═══ DERMATOLOGY ═══
  {
    id: "melanoma-visual",
    title: "Visual Assessment of Melanoma",
    category: "Dermatology",
    difficulty: "easy",
    blurb: "ABCDE, 7-point checklist, ugly duckling sign.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Pigmented skin lesion. Which features are suspicious?",
        [
          ok("ABCDE: Asymmetry, Border irregularity, Color variation, Diameter ≥6 mm, Evolution", "outABCDE"),
          ok("Ugly duckling sign — one lesion stands out from others", "outUgly"),
          ok("7-point checklist: ≥1 major (change in size/shape/color) or ≥3 minor", "out7pt"),
          no("Soft, mobile, not changing — automatically benign", "Always evaluate clinical features."),
        ],
        "Any single positive system warrants biopsy."),
      O("outABCDE", "Excisional biopsy with narrow margins (1–3 mm) for histology",
        "Definitive treatment by Breslow depth + sentinel lymph node biopsy."),
      O("outUgly", "Same — excisional biopsy"),
      O("out7pt", "Same — excisional biopsy"),
    ]),
  },

  // ═══ OB/GYN ═══
  {
    id: "primary-amenorrhea",
    title: "Primary Amenorrhea",
    category: "OB/GYN",
    difficulty: "hard",
    blurb: "Uterus presence + FSH/karyotype guide the workup.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Primary amenorrhea. First step?", [
        ok("Pelvic exam or ultrasound + FSH + TSH + prolactin + karyotype (if uterus absent)", "n2"),
        no("Empiric estrogen", "Need to know etiology first."),
      ]),
      D("n2", "Uterus present?", [
        ok("Yes — check FSH", "n3"),
        ok("No — karyotype + serum testosterone", "n4"),
      ]),
      D("n3", "Uterus present + FSH?", [
        ok("Elevated FSH → primary ovarian insufficiency / Turner syndrome", "outPOI"),
        ok("Low FSH → hypothalamic/pituitary cause", "n5"),
        ok("Normal FSH → imperforate hymen or transverse vaginal septum", "outImp"),
      ]),
      D("n5", "Hypothalamic/pituitary — TSH and prolactin?", [
        ok("High TSH → hypothyroidism", "outHypoT"),
        ok("High prolactin → prolactinoma; MRI", "outProlac"),
        ok("Normal TSH/prolactin → functional hypothalamic amenorrhea (stress, exercise, eating disorder)", "outFHA"),
      ]),
      D("n4", "No uterus — karyotype + testosterone?", [
        ok("46,XX, normal female T → Müllerian agenesis (MRKH)", "outMRKH"),
        ok("46,XY, male T → androgen insensitivity syndrome", "outAIS"),
      ]),
      O("outPOI", "POI (45,XO Turner most classic) — counsel about cardiac, renal, hearing screening"),
      O("outImp", "Imperforate hymen → surgical incision; transverse vaginal septum → resection"),
      O("outHypoT", "Levothyroxine"),
      O("outProlac", "Dopamine agonist (cabergoline); MRI for adenoma"),
      O("outFHA", "Address underlying stress, nutrition, exercise; estrogen replacement if persistent"),
      O("outMRKH", "Müllerian agenesis; vaginal dilation or surgical reconstruction"),
      O("outAIS", "Complete AIS (46,XY) — gonadectomy after puberty; estrogen replacement; psychosocial support"),
    ]),
  },

  {
    id: "secondary-amenorrhea",
    title: "Secondary Amenorrhea",
    category: "OB/GYN",
    difficulty: "medium",
    blurb: "β-hCG → prolactin/TSH/FSH/testosterone.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Secondary amenorrhea (no menses ≥3 months with prior regular). First test?", [
        ok("β-hCG", "n2"),
      ]),
      D("n2", "β-hCG result?", [
        ok("Positive → pregnant", "outPreg"),
        ok("Negative → check TSH, prolactin, FSH, testosterone", "n3"),
      ]),
      D("n3", "Pattern?", [
        ok("↑ Prolactin (normal TSH) → pituitary adenoma; MRI", "outProl"),
        ok("↑ FSH → primary ovarian insufficiency", "outPOI"),
        ok("↑ Testosterone → PCOS or androgen-secreting tumor", "outPCOS"),
        ok("↑ TSH → hypothyroidism", "outHypoT"),
        ok("All normal + prior uterine procedure → Asherman syndrome", "outAsh"),
      ]),
      O("outPreg", "Pregnancy — obstetric care"),
      O("outProl", "Prolactinoma — dopamine agonist"),
      O("outPOI", "Estrogen replacement; counsel about fertility"),
      O("outPCOS", "PCOS — weight loss, OCPs, metformin, spironolactone; fertility: clomiphene or letrozole",
        "Rotterdam criteria: ≥2 of oligo/anovulation, hyperandrogenism, polycystic ovaries on US."),
      O("outHypoT", "Levothyroxine"),
      O("outAsh", "Hysteroscopic adhesiolysis"),
    ]),
  },

  {
    id: "aub-secondary-amen",
    title: "AUB / Secondary Amenorrhea — Age-Based",
    category: "OB/GYN",
    difficulty: "easy",
    blurb: "<45 vs ≥45 changes the workup tier.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "AUB or secondary amenorrhea — age?", [
        ok("<45 → β-hCG, FSH, TSH, prolactin", "n2"),
        ok("≥45 → β-hCG; if not pregnant, TSH and prolactin only in select cases; endometrial biopsy if abnormal bleeding", "n3"),
      ]),
      D("n2", "β-hCG?", [
        ok("Positive → pregnancy", "outPreg"),
        ok("Negative → routine evaluation with FSH/TSH/prolactin", "outRoutine"),
      ]),
      D("n3", "Age ≥45 result?", [
        ok("Perimenopausal — endometrial biopsy if abnormal bleeding pattern", "outEB"),
      ]),
      O("outPreg", "Pregnant — obstetric care"),
      O("outRoutine", "Treat hormonal cause per labs"),
      O("outEB", "Rule out endometrial hyperplasia/cancer; treat per finding"),
    ]),
  },

  {
    id: "hydatidiform-mole",
    title: "Hydatidiform Mole Management",
    category: "OB/GYN",
    difficulty: "medium",
    blurb: "Suction curettage + β-hCG surveillance until undetectable.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Hydatidiform mole diagnosed. First step?", [
        ok("Suction curettage", "n2"),
        no("Methotrexate", "Methotrexate is for choriocarcinoma/persistent GTN."),
      ]),
      D("n2", "After curettage — surveillance?", [
        ok("Weekly β-hCG until undetectable, then monthly for 6 months; contraception during surveillance", "n3"),
      ]),
      D("n3", "β-hCG trend?", [
        ok("Decreasing to undetectable → continue monthly surveillance × 6 mo", "outSurv"),
        ok("Increasing or plateauing → gestational trophoblastic neoplasia", "outGTN"),
      ]),
      O("outSurv", "Surveillance complete; safe to attempt pregnancy after 6 months undetectable"),
      O("outGTN", "Refer to gynecologic oncology — methotrexate (low risk) or multi-agent chemotherapy (high risk)",
        "Complete mole: 46,XX (paternal). Partial mole: 69,XXY triploid."),
    ]),
  },

  {
    id: "ectopic",
    title: "Suspected Ectopic Pregnancy",
    category: "OB/GYN",
    difficulty: "medium",
    blurb: "TVUS + quantitative β-hCG drive decisions.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Positive β-hCG + lower abd pain ± bleeding. Stability?", [
        ok("Stable → TVUS + quantitative β-hCG", "n2"),
        ok("Unstable → immediate surgical consultation", "outSurg"),
      ]),
      D("n2", "TVUS?", [
        ok("Adnexal mass → treat as ectopic", "n3"),
        ok("IUP → confirmed intrauterine pregnancy", "outIUP"),
        ok("Non-diagnostic → use β-hCG threshold", "n4"),
      ]),
      D("n3", "Choice of management?", [
        ok("MTX criteria met (stable, β-hCG <5000, no fetal cardiac activity, ≤3.5 cm, can follow up) → methotrexate", "outMTX"),
        ok("Criteria not met → salpingostomy or salpingectomy", "outSurg"),
      ]),
      D("n4", "β-hCG level (non-diagnostic US)?", [
        ok(">1500 IU/L (discriminatory zone) + no IUP → likely ectopic", "n3"),
        ok("<1500 IU/L → repeat β-hCG in 48 h and US", "outFU"),
      ]),
      O("outSurg", "Surgical management — salpingectomy if rupture/large/recurrent; salpingostomy preserves tube"),
      O("outMTX", "Methotrexate + weekly β-hCG until undetectable",
        "Avoid folic acid, NSAIDs, ETOH during MTX. Repeat dose if β-hCG fails to drop ≥15% on day 4 to 7."),
      O("outIUP", "Confirmed IUP — investigate other causes of bleeding"),
      O("outFU", "Repeat β-hCG in 48 h: normal IUP doubles ~q48h"),
    ]),
  },

  {
    id: "gdm-2step",
    title: "Gestational Diabetes 2-Step Screening",
    category: "OB/GYN",
    difficulty: "easy",
    blurb: "1-h 50 g, then 3-h 100 g if abnormal.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "24–28 weeks gestation. First screen?", [
        ok("1-hour 50 g oral glucose challenge", "n2"),
      ]),
      D("n2", "1-hour glucose?", [
        ok("<140 mg/dL → normal", "outNorm"),
        ok("≥140 mg/dL → 3-hour 100 g OGTT", "n3"),
      ]),
      D("n3", "3-hour OGTT — ≥2 abnormal Carpenter–Coustan values?", [
        ok("Yes → GDM", "outGDM"),
        ok("No → no GDM", "outNorm"),
      ]),
      O("outGDM", "Diet + exercise first; insulin (preferred), or metformin/glyburide if uncontrolled",
        "Targets: fasting <95, 1-h postprandial <140 (or 2-h <120).",
        ["Carpenter–Coustan: fasting ≥95, 1h ≥180, 2h ≥155, 3h ≥140",
         "Postpartum 75 g OGTT at 6–12 weeks to screen for persistent diabetes"]),
      O("outNorm", "No GDM"),
    ]),
  },

  {
    id: "hsv-pregnancy",
    title: "HSV in Pregnancy",
    category: "OB/GYN",
    difficulty: "easy",
    blurb: "Suppression at 36 weeks; C-section if active lesions in labor.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Pregnant patient with prior HSV — management?", [
        ok("Antiviral suppression (acyclovir/valacyclovir) starting at 36 weeks", "n2"),
        ok("No prior HSV → routine prenatal care", "outRoutine"),
      ]),
      D("n2", "Lesion or prodrome at labor?", [
        ok("Yes → cesarean delivery", "outCS"),
        ok("No → vaginal delivery", "outVag"),
      ]),
      O("outRoutine", "Routine care; counsel partners to avoid transmission, especially in 3rd trimester"),
      O("outCS", "Cesarean to prevent neonatal HSV"),
      O("outVag", "Vaginal delivery is safe"),
    ]),
  },

  {
    id: "cin3",
    title: "CIN 3 Management",
    category: "OB/GYN",
    difficulty: "easy",
    blurb: "Excisional treatment then surveillance.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "CIN 3 in non-pregnant patient — first-line treatment?", [
        ok("Excisional procedure: LEEP or cold-knife conization (alt: cryoablation)", "n2"),
        no("Hysterectomy", "Excessive for CIN 3."),
      ]),
      D("n2", "After treatment — surveillance?", [
        ok("Pap with HPV co-testing 1 and 2 years post-procedure", "outFU"),
      ]),
      O("outFU", "If co-testing positive, repeat colposcopy",
        "Cold-knife conization preferred if invasive cancer suspected or fertility-preserving with adequate margin.",
        ["Prior conization increases preterm birth risk — counsel about future pregnancies",
         "HPV vaccination is recommended even after treatment"]),
    ]),
  },

  {
    id: "pph-atony",
    title: "Postpartum Hemorrhage (Atony)",
    category: "OB/GYN",
    difficulty: "hard",
    blurb: "Step-wise: massage, TXA, uterotonics, balloon, surgery.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "PPH + soft boggy uterus. Step 1?", [
        ok("Uterine massage + high-dose oxytocin", "n2"),
        no("Hysterectomy first", "Reserve for refractory cases."),
      ]),
      D("n2", "Step 2 (if bleeding continues)?", [
        ok("Tranexamic acid 1 g IV", "n3"),
      ]),
      D("n3", "Step 3 — second-line uterotonics?",
        [
          ok("Methylergonovine (CI: hypertension)", "n4"),
          ok("Carboprost tromethamine (CI: asthma)", "n4"),
          ok("Misoprostol", "n4"),
        ],
        "Avoid methylergonovine in hypertension; avoid carboprost in asthma."),
      D("n4", "Still bleeding — Step 4?", [
        ok("Intrauterine balloon tamponade (Bakri)", "n5"),
      ]),
      D("n5", "Persistent bleeding — Step 5?", [
        ok("Laparotomy (uterine artery ligation, B-Lynch suture, uterine artery embolization, hysterectomy)", "outLap"),
      ]),
      O("outLap", "Surgical control — embolization or hysterectomy is final option",
        "PPH = estimated blood loss ≥1000 mL or bleeding with hypovolemia.",
        ["Other causes of PPH (4 Ts): Tone (atony), Trauma (laceration), Tissue (retained placenta), Thrombin (coagulopathy)"]),
    ]),
  },

  {
    id: "migraines-pregnancy",
    title: "Migraines in Pregnancy",
    category: "OB/GYN",
    difficulty: "easy",
    blurb: "Step-wise: lifestyle → acetaminophen → antiemetics/butalbital → NSAIDs (2nd trimester) → opioids.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Pregnant patient with migraine. First-line?", [
        ok("Non-pharmacologic: rest, hydration, heat", "n2"),
        no("Triptan", "Avoid in pregnancy unless severe and refractory."),
        no("Ergot", "Contraindicated."),
      ]),
      D("n2", "Next?", [
        ok("Acetaminophen", "n3"),
      ]),
      D("n3", "Still refractory?", [
        ok("Antiemetic (promethazine) ± codeine ± caffeine/butalbital", "n4"),
      ]),
      D("n4", "Still refractory?", [
        ok("NSAIDs (2nd trimester only)", "n5"),
      ]),
      D("n5", "Refractory severe?", [
        ok("Opioid (oxycodone) sparingly", "outOp"),
      ]),
      O("outOp", "Reserve opioids for severe refractory; consider preventive therapy if frequent",
        "Preventives: β-blockers (labetalol/propranolol), magnesium, cyproheptadine; avoid valproate.",
        ["NSAIDs contraindicated in 3rd trimester (ductus closure)",
         "Avoid ergots and triptans"]),
    ]),
  },

  {
    id: "menopause",
    title: "Menopause Treatment",
    category: "OB/GYN",
    difficulty: "easy",
    blurb: "Hormones if no contraindication; intact uterus needs progestin.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Vasomotor symptoms severity?", [
        ok("Mild → behavioral modifications", "outMild"),
        ok("Moderate/severe → assess contraindications to estrogen", "n2"),
      ]),
      D("n2", "Estrogen contraindications? (Breast ca, CHD, endometrial ca, liver disease, thromboembolism)", [
        ok("Yes → non-hormonal therapy (SSRI, SNRI, gabapentin, clonidine)", "outNonHorm"),
        ok("No → assess uterus", "n3"),
      ]),
      D("n3", "Intact uterus?", [
        ok("Yes → estrogen + progestin", "outEP"),
        ok("No (s/p hysterectomy) → estrogen only", "outE"),
      ]),
      O("outMild", "Lifestyle: dress in layers, avoid triggers, vaginal moisturizers"),
      O("outNonHorm", "Paroxetine (only FDA-approved non-hormonal), gabapentin, clonidine, oxybutynin"),
      O("outEP", "Combined HRT — progestin protects endometrium",
        "Use lowest effective dose for shortest duration that achieves symptom control."),
      O("outE", "Estrogen alone — fine without uterus",
        "Consider transdermal route to lower VTE risk."),
    ]),
  },

  {
    id: "pprom",
    title: "Preterm Prelabor ROM",
    category: "OB/GYN",
    difficulty: "hard",
    blurb: "Gestational age + presence of infection guide management.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Confirmed ROM. Gestational age?", [
        ok("<24 weeks → counsel about viability vs termination", "outPrev"),
        ok("24 to <34 weeks", "n2"),
        ok("34 to <37 weeks", "n3"),
      ]),
      D("n2", "24–<34 weeks — complicated?", [
        ok("Infection or fetal/maternal compromise → delivery + intra-amniotic infection treatment (ampicillin + gentamicin) + corticosteroids + GBS prophylaxis", "outDeliver"),
        ok("Uncomplicated → expectant: latency abx (ampicillin + azithromycin → amoxicillin), antenatal corticosteroids, magnesium <32 wk for neuroprotection, fetal surveillance", "outExpect"),
      ]),
      D("n3", "34 to <37 weeks?", [
        ok("Delivery + GBS prophylaxis (penicillin G) + corticosteroids if <34 wk", "outDel34"),
      ]),
      O("outPrev", "Counsel about expectant vs termination given high morbidity/mortality"),
      O("outExpect", "Expectant management with latency antibiotics, steroids, magnesium <32 wk",
        "No tocolytics — risk of infection."),
      O("outDel34", "Delivery — shared decision; GBS prophylaxis"),
      O("outDeliver", "Delivery — typically vaginal unless obstetric indication for C-section"),
    ]),
  },

  {
    id: "endometriosis",
    title: "Endometriosis Management",
    category: "OB/GYN",
    difficulty: "easy",
    blurb: "NSAIDs + OCPs vs laparoscopy for definitive diagnosis.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Chronic pelvic pain, dysmenorrhea, deep dyspareunia, dyschezia. First step?", [
        ok("Assess for need for definitive diagnosis (infertility, medical-therapy contraindication, malignancy/adnexal mass concern)", "n2"),
      ]),
      D("n2", "Any of those concerns?", [
        ok("Yes → laparoscopy for diagnosis ± excision/ablation", "outLap"),
        ok("No → empirically treat with NSAIDs + oral contraceptives", "outMed"),
      ]),
      O("outLap", "Laparoscopy is gold standard; ablation/excision improves pain"),
      O("outMed", "NSAIDs + combined OCPs (or progestin-only); GnRH agonists/antagonists second-line",
        "Add-back therapy (low-dose hormones) with GnRH agonists to limit menopausal symptoms."),
    ]),
  },

  {
    id: "preterm-prev",
    title: "Preterm Birth Prevention",
    category: "OB/GYN",
    difficulty: "medium",
    blurb: "Prior preterm vs cervical length.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Pregnant patient — prior preterm delivery?", [
        ok("No → 2nd-trimester TVUS for cervical length", "n2"),
        ok("Yes → assess prior PTB context", "n3"),
      ]),
      D("n2", "Cervical length?", [
        ok("Normal → routine care", "outRoutine"),
        ok("Short (≤2.5 cm at <24 wk) → vaginal progesterone", "outProg"),
      ]),
      D("n3", "Prior PTB with painful contractions?", [
        ok("No (cervical insufficiency) → prophylactic cerclage at 12–14 wk", "outCerc"),
        ok("Yes (prior preterm labor) → IM 17-hydroxyprogesterone caproate weekly from 16–36 wk", "outProgIM"),
      ]),
      O("outRoutine", "Routine prenatal care"),
      O("outProg", "Vaginal progesterone"),
      O("outCerc", "Prophylactic cerclage"),
      O("outProgIM", "Weekly IM 17-OHPC",
        "17-OHPC effectiveness recently disputed; SMFM continues to support per shared decision-making."),
    ]),
  },

  {
    id: "lochia",
    title: "Normal Postpartum Lochia",
    category: "OB/GYN",
    difficulty: "easy",
    blurb: "Three stages: rubra → serosa → alba.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Postpartum lochia type — which stage corresponds to which appearance?",
        [
          ok("Lochia rubra: birth to 3–4 d, dark/bright red; menstrual-like odor; clots decreasing", "outRubra"),
          ok("Lochia serosa: day 4 to 10–14, serosanguineous/pink, gradually decreasing", "outSerosa"),
          ok("Lochia alba: day 11 to 6 weeks, white/yellow, creamy, light", "outAlba"),
          no("Lochia rubra should last 6 weeks", "Rubra phase is only the first few days."),
        ]),
      O("outRubra", "Lochia rubra — normal early postpartum bleeding"),
      O("outSerosa", "Lochia serosa — normal transitional stage"),
      O("outAlba", "Lochia alba — normal late postpartum discharge"),
    ]),
  },

  // ═══ BREAST ═══
  {
    id: "palpable-breast-mass",
    title: "Palpable Breast Mass",
    category: "Breast",
    difficulty: "easy",
    blurb: "Age decides imaging modality.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Palpable breast mass — age?", [
        ok("<30 → ultrasound (± mammogram)", "n2"),
        ok("≥30 → mammogram + ultrasound", "n2"),
      ]),
      D("n2", "Imaging finding?", [
        ok("Simple cyst", "outCyst"),
        ok("Complex cyst or solid mass → image-guided core biopsy", "outBx"),
        ok("Suspicious for malignancy → core biopsy", "outBx"),
      ]),
      O("outCyst", "Simple cyst — needle aspiration only if symptomatic"),
      O("outBx", "Core needle biopsy under image guidance; manage by histology",
        "If discordant imaging and biopsy, repeat biopsy or excisional biopsy."),
    ]),
  },

  {
    id: "breast-pain",
    title: "Breast Pain Management",
    category: "Breast",
    difficulty: "easy",
    blurb: "Cyclic/bilateral usually benign; noncyclic/focal warrants imaging.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Breast pain pattern?", [
        ok("Cyclic, bilateral, diffuse", "n2"),
        ok("Noncyclic, unilateral, focal", "n3"),
      ]),
      D("n2", "Mass on exam?", [
        ok("Yes → imaging", "n4"),
        ok("No → observe (reassurance, supportive bra, NSAIDs)", "outObs"),
      ]),
      D("n3", "Mass on exam?", [
        ok("Yes → biopsy and referral to breast surgeon", "outBx"),
        ok("No → imaging", "n4"),
      ]),
      D("n4", "Imaging?", [
        ok("Abnormal → biopsy", "outBx"),
        ok("Normal → observe", "outObs"),
      ]),
      O("outObs", "Reassurance, supportive bra, NSAIDs; reassess if change"),
      O("outBx", "Image-guided biopsy; manage by histology"),
    ]),
  },

  {
    id: "nipple-discharge",
    title: "Nipple Discharge",
    category: "Breast",
    difficulty: "easy",
    blurb: "Bloody/serous = pathologic. Milky = endocrine workup.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Unilateral breast nipple discharge — color?", [
        ok("Bloody or serous → pathologic", "n2"),
        ok("Milky, non-bloody → endocrine workup", "n3"),
      ]),
      D("n2", "Pathologic discharge — imaging?", [
        ok("Mammogram (age ≥30) + ultrasound; ductography in some cases", "outImg"),
      ]),
      D("n3", "Palpable lump or skin changes?", [
        ok("No → likely physiologic; pregnancy test, serum prolactin, TSH; consider MRI pituitary", "outEndo"),
        ok("Yes → image-guided workup", "outImg"),
      ]),
      O("outImg", "Image-guided biopsy of any abnormality; treat per histology"),
      O("outEndo", "Galactorrhea workup: prolactin, TSH, pregnancy test; MRI pituitary if elevated prolactin"),
    ]),
  },

  {
    id: "breast-discharge",
    title: "Breast Discharge Evaluation",
    category: "Breast",
    difficulty: "easy",
    blurb: "Bilateral vs unilateral; age-based imaging for unilateral.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Nipple discharge — bilateral or unilateral?",
        [
          ok("Bilateral → pregnancy test, galactorrhea workup", "outGal"),
          ok("Unilateral, age <30 → US + mammogram", "outImg"),
          ok("Unilateral, age ≥30 → mammogram + US", "outImg"),
        ],
        "Concerning features: nonbloody discharge with normal breast exam."),
      O("outGal", "Galactorrhea workup: prolactin, TSH, β-hCG"),
      O("outImg", "Age-appropriate imaging; biopsy if abnormality"),
    ]),
  },

  {
    id: "breast-cyst",
    title: "Breast Cyst Management",
    category: "Breast",
    difficulty: "easy",
    blurb: "Simple cyst: observe if asymptomatic. Complex: biopsy.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Breast cyst — type?", [
        ok("Simple, asymptomatic → observe", "outObs"),
        ok("Simple, tender → FNA", "n2"),
        ok("Complex → biopsy", "outBx"),
      ]),
      D("n2", "FNA aspirate?", [
        ok("Non-bloody + cyst resolves → no additional management", "outResolved"),
        ok("Bloody, persistent, or recurrent → biopsy + additional imaging", "outBx"),
      ]),
      O("outObs", "Observe; routine follow-up imaging"),
      O("outResolved", "No further management"),
      O("outBx", "Image-guided biopsy; manage by pathology"),
    ]),
  },

  // ═══ PEDIATRICS ═══
  {
    id: "ped-pharyngitis",
    title: "Acute Pharyngitis in Children",
    category: "Pediatrics",
    difficulty: "easy",
    blurb: "Viral features → supportive. Otherwise rapid strep.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Pediatric pharyngitis. Viral features (cough, conjunctivitis, oral ulcers)?", [
        ok("Yes → supportive care", "outViral"),
        ok("No → rapid streptococcal antigen test", "n2"),
      ]),
      D("n2", "RADT result?", [
        ok("Positive → oral penicillin or amoxicillin", "outStrep"),
        ok("Negative → throat culture (always backup in peds)", "n3"),
      ]),
      D("n3", "Culture result?", [
        ok("Positive → treat as strep", "outStrep"),
        ok("Negative → viral pharyngitis", "outViral"),
      ]),
      O("outViral", "Supportive care; hydration, analgesics"),
      O("outStrep", "Penicillin V or amoxicillin × 10 days (azithromycin or clindamycin if penicillin allergic)",
        "Treatment prevents rheumatic fever and reduces transmission.",
        ["Throat culture backup is essential in peds — RADT specificity is high but sensitivity ~85%",
         "Don't test/treat in patients with viral features"]),
    ]),
  },

  {
    id: "adult-pharyngitis",
    title: "Pharyngitis in Adults (Centor)",
    category: "Infectious Disease",
    difficulty: "easy",
    blurb: "Centor criteria: 0–1 none, 2–3 RADT, 4 empiric.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Adult pharyngitis — Centor criteria total (fever, tender anterior cervical LAN, tonsillar exudates, no cough)?", [
        ok("0–1 → no testing or antibiotics", "outNone"),
        ok("2–3 → rapid strep antigen test", "n2"),
        ok("4 → empiric penicillin/amoxicillin OR RADT", "outEmp"),
      ]),
      D("n2", "RADT result?", [
        ok("Positive → penicillin or amoxicillin", "outAbx"),
        ok("Negative → no antibiotics", "outNone"),
      ]),
      O("outNone", "No antibiotics needed; supportive care"),
      O("outEmp", "Empiric penicillin or amoxicillin × 10 days"),
      O("outAbx", "Penicillin V or amoxicillin × 10 d (clindamycin/macrolide if allergic)"),
    ]),
  },

  {
    id: "fpiap",
    title: "Food Protein-Induced Allergic Proctocolitis (FPIAP)",
    category: "Pediatrics",
    difficulty: "easy",
    blurb: "Eliminate triggers, reintroduce around 1 year.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Well-appearing infant <6 mo with blood-streaked stools and nonfocal exam. Feeding type?", [
        ok("Breastfeeding → eliminate common triggers from maternal diet (dairy, soy)", "n2"),
        ok("Formula → switch to hypoallergenic (extensively hydrolyzed) formula", "n2"),
      ]),
      D("n2", "Symptom response?", [
        ok("Resolution → FPIAP confirmed; reintroduce around age 1", "outConfirm"),
        ok("Persistent → consider alternative dx (flex sig)", "outAlt"),
      ]),
      O("outConfirm", "Reintroduce offending protein around 1 year; most tolerate by 1–3 y"),
      O("outAlt", "Consider infectious colitis, IBD, intussusception — flex sigmoidoscopy if indicated"),
    ]),
  },

  {
    id: "fb-ingestion",
    title: "Suspected Foreign Body Ingestion",
    category: "Pediatrics",
    difficulty: "medium",
    blurb: "X-rays first; endoscopy for high-risk objects.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected foreign body ingestion. First imaging?", [
        ok("PA + lateral X-rays (CT if not visible on X-ray)", "n2"),
      ]),
      D("n2", "High-risk features (respiratory/obstructive symptoms, button battery, magnet, sharp item)?", [
        ok("Yes → endoscopic removal", "outEndo"),
        ok("No → serial X-rays", "n3"),
      ]),
      D("n3", "Object transit?", [
        ok("Moving distally → no intervention", "outObs"),
        ok("No transit → endoscopic removal", "outEndo"),
      ]),
      O("outEndo", "Endoscopic removal — button battery in esophagus is emergency (caustic injury within hours)",
        "Button battery in stomach: remove if symptomatic or >2 cm (or coingestion with magnet)."),
      O("outObs", "Observe with serial imaging; expect passage within days to a week"),
    ]),
  },

  {
    id: "magnet-ingestion",
    title: "Ingestion of Multiple Magnets",
    category: "Pediatrics",
    difficulty: "medium",
    blurb: "Multiple magnets = surgical emergency risk.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Ingestion of multiple magnets — most concerning complication?", [
        ok("Bowel necrosis, fistula, perforation from magnets attracting across bowel walls", "n2"),
        no("Stomach acid neutralization", "Not a magnet complication."),
      ]),
      D("n2", "Management?", [
        ok("Endoscopic removal if reachable; surgery if past pylorus or symptoms", "outMgmt"),
      ]),
      O("outMgmt", "Endoscopy or surgery; do NOT observe multiple magnets",
        "Single small magnet may be observed; multiple magnets are emergent."),
    ]),
  },

  {
    id: "bilious-emesis",
    title: "Bilious Emesis in the Neonate",
    category: "Pediatrics",
    difficulty: "hard",
    blurb: "Always abnormal — rule out malrotation with volvulus.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Newborn with bilious emesis. Stability?", [
        ok("Stable → abdominal X-ray", "n2"),
        ok("Unstable → emergency laparotomy", "outLap"),
      ]),
      D("n2", "X-ray finding?", [
        ok("Free air → emergency laparotomy", "outLap"),
        ok("Dilated bowel loops, increased rectal tone or delayed meconium → contrast enema", "n3"),
        ok("Double bubble sign → duodenal atresia", "outDA"),
        ok("Normal → upper GI series to rule out malrotation", "n4"),
      ]),
      D("n3", "Contrast enema finding?", [
        ok("Microcolon → meconium ileus", "outMI"),
        ok("Rectosigmoid transition zone → Hirschsprung disease", "outHD"),
      ]),
      D("n4", "Upper GI?", [
        ok("Right-sided ligament of Treitz / corkscrew → malrotation ± volvulus", "outMal"),
        ok("Normal → continue evaluation for other causes", "outOther"),
      ]),
      O("outLap", "Emergent laparotomy"),
      O("outDA", "Duodenal atresia → surgical repair; check for trisomy 21"),
      O("outMI", "Meconium ileus → CF workup; gastrografin enema may relieve; surgery if perforation"),
      O("outHD", "Hirschsprung → rectal biopsy confirms (absent ganglion cells); surgical pull-through"),
      O("outMal", "Ladd procedure emergently — volvulus can cause necrosis within hours"),
      O("outOther", "Further workup — sepsis, NEC, intussusception"),
    ]),
  },

  // ═══ ADDITIONAL HIGH-YIELD ALGORITHMS ═══

  {
    id: "stable-tachy",
    title: "Stable Narrow-Complex Tachycardia",
    category: "Cardiology",
    difficulty: "medium",
    blurb: "Vagal → adenosine → rate control.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Stable narrow-complex tachycardia. First maneuver?", [
        ok("Vagal maneuvers (carotid sinus massage, Valsalva, modified Valsalva)", "n2"),
        no("Cardioversion", "Reserve for unstable patients."),
      ]),
      D("n2", "Rhythm regular?", [
        ok("Regular → adenosine 6 mg → 12 mg if no response", "n3"),
        ok("Irregular → rate control (diltiazem, β-blocker) for AF/aflutter", "outRate"),
      ]),
      D("n3", "Response to adenosine?", [
        ok("Sinus rhythm restored → likely AVNRT/AVRT", "outAVNRT"),
        ok("Atrial activity unmasked → atrial flutter or AT", "outFlutter"),
        ok("No response → consider expert consultation, β-blocker, CCB", "outExpert"),
      ]),
      O("outRate", "Rate control + anticoagulation if AF with CHA₂DS₂-VASc ≥2 (men) or ≥3 (women)"),
      O("outAVNRT", "Long-term: catheter ablation; β-blocker or CCB for maintenance"),
      O("outFlutter", "Anticoagulation per CHA₂DS₂-VASc; ablation often curative"),
      O("outExpert", "Cardiology consult"),
    ]),
  },

  {
    id: "thyroid-storm",
    title: "Thyroid Storm",
    category: "Endocrine",
    difficulty: "hard",
    blurb: "Block synthesis, release, and conversion all at once.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Thyroid storm — order of medications?", [
        ok("β-blocker (propranolol) → PTU/methimazole → iodine (1 h after thionamide) → glucocorticoid", "outMgmt"),
        no("Iodine first", "Iodine before thionamide can worsen storm by feeding new hormone synthesis."),
      ]),
      O("outMgmt", "Burch–Wartofsky score guides diagnosis. Cooling, IV fluids, treat precipitant",
        "PTU preferred over methimazole in storm (blocks peripheral T4→T3 conversion).",
        ["Iodine 1 h AFTER thionamide to avoid stimulating new hormone synthesis (Wolff–Chaikoff)",
         "Glucocorticoids reduce T4→T3 conversion and treat possible adrenal insufficiency"]),
    ]),
  },

  {
    id: "dka",
    title: "Diabetic Ketoacidosis",
    category: "Endocrine",
    difficulty: "hard",
    blurb: "Fluids → insulin → potassium replacement.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "DKA confirmed (glucose >250, anion gap, ketones, pH <7.3). First action?", [
        ok("IV fluids: isotonic saline 1–1.5 L bolus, then maintain", "n2"),
        no("IV insulin bolus before fluids", "Volume first; insulin without fluids worsens hypotension."),
      ]),
      D("n2", "Next — when to start insulin and what about potassium?", [
        ok("Check K+: if <3.3 hold insulin, replete K first. If 3.3–5.3 start insulin + replete K. If >5.3 start insulin no K", "n3"),
      ]),
      D("n3", "Glucose drops to ~200 — switch to?", [
        ok("Add D5 to fluids; continue insulin until anion gap closes", "outClose"),
        no("Stop insulin once glucose <200", "Insulin must continue until anion gap closes."),
      ]),
      O("outClose", "Transition to subcutaneous insulin only after anion gap closed and overlapping IV insulin for 1–2 h",
        "Bicarbonate only if pH <6.9. Address precipitant (infection, MI, missed insulin).",
        ["Cerebral edema is the dreaded complication in pediatric DKA",
         "Don't transition off IV insulin until anion gap closes — glucose normalization is not enough"]),
    ]),
  },

  {
    id: "hypertensive-emerg",
    title: "Hypertensive Emergency",
    category: "Emergency",
    difficulty: "medium",
    blurb: "Lower MAP by 10–25% in first hour; choice depends on end-organ.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Severe HTN — emergency vs urgency?", [
        ok("End-organ damage present → emergency (lower BP IV)", "n2"),
        ok("No end-organ damage despite high BP → urgency (oral agents, slow lowering)", "outUrg"),
      ]),
      D("n2", "Type of end-organ damage?", [
        ok("Aortic dissection → labetalol or esmolol (HR <60) FIRST, then nitroprusside/nicardipine", "outDiss"),
        ok("Ischemic stroke → permissive HTN; treat only if >220/120 (or >185/110 for tPA candidates)", "outStroke"),
        ok("ICH → systolic 140–160", "outICH"),
        ok("Pulmonary edema → IV nitroglycerin + furosemide", "outPE"),
        ok("Eclampsia → IV magnesium + labetalol/hydralazine", "outEcl"),
      ]),
      O("outUrg", "Oral agents over 24–48 h (captopril, clonidine, labetalol)"),
      O("outDiss", "β-blocker first to prevent reflex tachy, then vasodilator. Target SBP 100–120, HR 60"),
      O("outStroke", "Permissive HTN; treat per stroke window"),
      O("outICH", "Target systolic 140–160 with nicardipine"),
      O("outPE", "IV nitroglycerin + diuretic; BiPAP if respiratory distress"),
      O("outEcl", "Magnesium for seizure prophylaxis; antihypertensive; deliver fetus"),
    ]),
  },

  {
    id: "aki",
    title: "Acute Kidney Injury",
    category: "Renal",
    difficulty: "medium",
    blurb: "Pre-renal vs intrinsic vs post-renal; FENa and UA help.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "AKI — categorize first?", [
        ok("Pre-renal vs intrinsic vs post-renal", "n2"),
      ]),
      D("n2", "Initial workup?", [
        ok("Urine output, BUN/Cr ratio, FENa or FEUrea, urinalysis with sediment, renal US", "n3"),
        no("Renal biopsy first", "Biopsy is rarely first-line."),
      ]),
      D("n3", "Pattern?", [
        ok("BUN/Cr >20, FENa <1%, bland sediment, responds to fluids → pre-renal", "outPre"),
        ok("Hydronephrosis on US → post-renal (obstruction)", "outPost"),
        ok("Muddy brown casts → ATN", "outATN"),
        ok("RBC casts + proteinuria → glomerulonephritis", "outGN"),
        ok("WBC casts + eos → interstitial nephritis (drug)", "outAIN"),
      ]),
      O("outPre", "Volume resuscitation; address heart failure if cardiorenal"),
      O("outPost", "Relieve obstruction (catheter, stent, nephrostomy)"),
      O("outATN", "Supportive; avoid further nephrotoxins; dialysis if AEIOU criteria",
        "AEIOU: Acidosis, Electrolytes (hyperK), Ingestion (toxins), Overload, Uremia."),
      O("outGN", "Nephrology referral; biopsy; treat underlying (steroids, immunosuppressants)"),
      O("outAIN", "Stop offending drug (PPI, NSAID, β-lactam, sulfa); steroids if persistent"),
    ]),
  },

  {
    id: "sepsis",
    title: "Sepsis / Septic Shock",
    category: "Emergency",
    difficulty: "medium",
    blurb: "Hour-1 bundle: lactate, cultures, abx, fluids, vasopressors.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected sepsis (qSOFA ≥2 or organ dysfunction). Initial bundle within 1 hour?", [
        ok("Lactate + blood cultures + broad-spectrum antibiotics + 30 mL/kg crystalloid for hypotension or lactate ≥4", "n2"),
        no("Wait for cultures before antibiotics", "Every hour of delay increases mortality."),
      ]),
      D("n2", "Persistent hypotension despite fluids?", [
        ok("Start norepinephrine (1st-line vasopressor) to keep MAP ≥65", "outShock"),
        ok("Adequate perfusion → continue source control + tailored antibiotics", "outResp"),
      ]),
      O("outShock", "Norepinephrine first; add vasopressin if escalating; epinephrine if refractory; consider hydrocortisone in vasopressor-refractory shock",
        "ScvO₂ <70% may guide additional measures (transfusion, inotropes).",
        ["Source control: drain abscess, remove infected hardware, change central lines",
         "Steroids only for vasopressor-refractory shock or known adrenal insufficiency"]),
      O("outResp", "Continue antibiotic course, de-escalate per cultures"),
    ]),
  },

  {
    id: "ich-mgmt",
    title: "Intracranial Hemorrhage Management",
    category: "Neurology",
    difficulty: "hard",
    blurb: "Reverse anticoagulation + BP control + ICP management.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Intracranial hemorrhage on CT. First steps?", [
        ok("Reverse anticoagulation (per agent), BP control to systolic 140, neurosurgery consult", "n2"),
        no("IV tPA", "Catastrophic in hemorrhagic stroke."),
      ]),
      D("n2", "Specific reversal — which agent?", [
        ok("Warfarin → 4-factor PCC + vitamin K", "outRev"),
        ok("Dabigatran → idarucizumab", "outRev"),
        ok("Apixaban/rivaroxaban → andexanet alfa or 4F-PCC", "outRev"),
        ok("Heparin → protamine sulfate", "outRev"),
      ]),
      O("outRev", "Manage ICP (HOB ↑30°, mannitol/hypertonic saline, sedation); surgical evacuation if cerebellar bleed >3 cm or worsening",
        "Avoid prophylactic anticonvulsants unless seizure occurs.",
        ["Cushing reflex (HTN, bradycardia, irregular respirations) signals ↑ICP",
         "Spot sign on CTA predicts hematoma expansion"]),
    ]),
  },

  {
    id: "ascites",
    title: "Ascites Evaluation",
    category: "Gastroenterology",
    difficulty: "medium",
    blurb: "SAAG splits portal hypertension from non-portal causes.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "New ascites. First step?", [
        ok("Diagnostic paracentesis with cell count, culture, albumin, total protein", "n2"),
        no("Empirical diuretics", "Confirm etiology first."),
      ]),
      D("n2", "SAAG = serum albumin − ascitic albumin?", [
        ok("≥1.1 → portal hypertension (cirrhosis, CHF, Budd–Chiari)", "n3"),
        ok("<1.1 → non-portal (TB, malignancy, pancreatic, nephrotic)", "outNon"),
      ]),
      D("n3", "Total protein in ascites?", [
        ok("<2.5 → cirrhosis", "outCirr"),
        ok("≥2.5 → cardiac (CHF), Budd–Chiari", "outCardiac"),
      ]),
      D("n2b", "PMN count?", [
        ok("≥250 → SBP — empiric ceftriaxone, albumin", "outSBP"),
        ok("<250 → no SBP", "outNo"),
      ]),
      O("outCirr", "Diet, diuretics (spironolactone + furosemide), LVP with albumin if needed",
        "Daily wt loss target 0.5 kg (without edema) or 1 kg (with edema)."),
      O("outCardiac", "Treat heart failure"),
      O("outNon", "Workup: TB (AFB, ADA), malignancy (cytology), pancreatic (amylase), nephrotic"),
      O("outSBP", "Cover GNRs and Strep pneumo; IV albumin reduces hepatorenal syndrome"),
      O("outNo", "Manage per etiology"),
    ]),
  },

  {
    id: "low-back-pain",
    title: "Acute Low Back Pain",
    category: "Musculoskeletal",
    difficulty: "easy",
    blurb: "Red flags decide imaging; otherwise conservative.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Acute low back pain. Red flags?",
        [
          ok("None → conservative care (NSAIDs, activity, no imaging) × 4–6 weeks", "outConserv"),
          ok("Cauda equina (saddle anesthesia, retention, bilateral weakness) → emergent MRI + neurosurgery", "outCE"),
          ok("Fever, IVDU, immunosuppression → MRI for epidural abscess / osteomyelitis", "outInf"),
          ok("Trauma, osteoporosis → spinal X-ray then MRI if abnormal", "outFx"),
          ok("Cancer history, weight loss → MRI", "outCa"),
          ok("Progressive neurologic deficits → MRI", "outNeuro"),
        ],
        "Red flags drive imaging; otherwise routine imaging worsens outcomes."),
      O("outConserv", "NSAIDs, stay active, return precautions"),
      O("outCE", "Emergency decompression"),
      O("outInf", "Blood cultures, IV antibiotics, drainage if abscess"),
      O("outFx", "Bracing, vertebroplasty/kyphoplasty for unstable compression fractures"),
      O("outCa", "MRI; treat per pathology"),
      O("outNeuro", "MRI; surgical referral"),
    ]),
  },

  {
    id: "asthma-exac",
    title: "Acute Asthma Exacerbation",
    category: "Pulmonary",
    difficulty: "medium",
    blurb: "SABA + ICS/oral steroids + adjuncts by severity.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Acute asthma exacerbation. Severity?", [
        ok("Mild–moderate → inhaled SABA + ipratropium + oral steroid", "outMild"),
        ok("Severe (PEF <40%, accessory muscles, can't speak in sentences) → continuous SABA + IV steroids + magnesium ± epi", "outSevere"),
        ok("Life-threatening (silent chest, exhaustion, hypoxia despite O₂) → intubate", "outIntubate"),
      ]),
      O("outMild", "SABA + ipratropium nebs, oral prednisone × 5–7 d"),
      O("outSevere", "Continuous albuterol, IV methylprednisolone, IV magnesium, consider IM epinephrine; admit",
        "Rising PCO₂ in a hypoxic asthma patient is an ominous sign — anticipate respiratory failure."),
      O("outIntubate", "Intubate — low tidal volume, allow permissive hypercapnia, deep sedation; avoid PEEP > 5 if breath-stacking"),
    ]),
  },

  {
    id: "alcohol-withdrawal",
    title: "Alcohol Withdrawal",
    category: "Emergency",
    difficulty: "medium",
    blurb: "Benzodiazepines first-line; CIWA-guided.",
    start: "n1",
    nodes: mkNodes([
      D("n1", "Suspected alcohol withdrawal. First-line treatment?", [
        ok("Benzodiazepines (lorazepam or diazepam) guided by CIWA", "n2"),
        no("β-blockers", "Mask sympathetic symptoms without addressing seizure risk."),
        no("Antipsychotic alone", "Doesn't prevent seizures."),
      ]),
      D("n2", "Additional supportive measures?", [
        ok("Thiamine BEFORE glucose, multivitamin, magnesium, treat hypovolemia, monitor for DTs", "outDT"),
        no("Glucose first", "Glucose before thiamine can precipitate Wernicke encephalopathy."),
      ]),
      O("outDT", "Delirium tremens: ICU-level care, escalating benzos or propofol",
        "DTs typically 48–96 h after last drink; mortality ~5%.",
        ["Thiamine ALWAYS before glucose to avoid precipitating Wernicke",
         "Lorazepam preferred in liver failure (not glucuronidated by CYP)",
         "Phenobarbital in severe refractory withdrawal"]),
    ]),
  },

  // ═══ INFERTILITY EVALUATION (OB/GYN) ═══
  {
    id: "infertility-evaluation",
    title: "Infertility — couple's workup",
    category: "OB/GYN",
    difficulty: "medium",
    blurb: "When to start the workup, what to order first, then branch by cause: anovulation, tubal, male factor, or unexplained.",
    start: "inf1",
    nodes: mkNodes([
      D("inf1",
        "Couple seeking pregnancy. When does formal infertility evaluation start?",
        [
          ok("Woman <35: after 12 months of regular unprotected intercourse", "inf2",
            "Standard definition. Earlier if 35+ or known risk factors."),
          ok("Woman ≥35: after 6 months of trying", "inf2",
            "Ovarian reserve declines sharply after 35; don't wait the full year."),
          ok("Immediately if known issue (amenorrhea, prior PID, chemo, varicocele, age >40)", "inf2",
            "Skip the waiting period if there's a clear risk factor."),
          no("Always wait 24 months before any evaluation",
            "12 months is the standard threshold (6 months for ≥35)."),
        ],
        "About 15% of couples experience infertility. Causes: 25% ovulatory, 25% male factor, 25% tubal/peritoneal, 10% uterine, 15% unexplained."),

      D("inf2",
        "Initial workup — what to order on BOTH partners FIRST?",
        [
          ok("Semen analysis + ovulation assessment + HSG + ovarian reserve labs (TSH, prolactin, AMH or day-3 FSH)",
            "inf3",
            "Workup both partners simultaneously. Semen analysis first — easy, cheap, identifies 25% of cases."),
          no("Schedule IVF immediately",
            "ART is last-line; identify a treatable cause first."),
          no("Laparoscopy",
            "Reserved for suspected endometriosis after non-invasive workup."),
          no("Karyotype both partners",
            "Only if recurrent pregnancy loss or specific suspicion."),
        ]),

      D("inf3",
        "Semen analysis is abnormal (oligospermia, asthenospermia, or azoospermia). Best next step?",
        [
          ok("Repeat semen analysis in 4–6 weeks (with abstinence 2–7 days) + urology referral",
            "infMale",
            "One abnormal SA is not diagnostic — spermatogenesis cycle is ~72 days. Repeat before action."),
          no("Start clomiphene on the male",
            "Empiric clomid in men is second-line and only after endocrine workup."),
          no("Go straight to IVF",
            "Identify and treat reversible male causes first (varicocele, hyperPRL, hypogonadism)."),
        ]),

      O("infMale",
        "Male-factor infertility — urology workup → ICSI/IVF if needed",
        "Reversible causes: varicocele repair, treat hyperprolactinemia (cabergoline), hCG/FSH for hypogonadotropic, stop testosterone (suppresses spermatogenesis). Severe oligo/azoospermia → ICSI with surgical sperm retrieval (TESE).",
        ["Varicocele is the most common surgically correctable cause",
         "Exogenous testosterone shuts down spermatogenesis — STOP it before any workup",
         "Klinefelter syndrome (47,XXY): small firm testes, azoospermia — donor sperm or microTESE",
         "Cystic fibrosis carriers can have CBAVD (congenital bilateral absent vas) → ICSI with retrieved sperm",
         "ICSI revolutionized severe male factor: a single viable sperm = pregnancy possible"]),

      D("inf4",
        "Semen analysis normal. Mid-luteal (day 21) progesterone is LOW (<3 ng/mL) → ANOVULATION. Next step?",
        [
          ok("Check prolactin, TSH, FSH/LH/estradiol, androgens, AMH to identify the cause",
            "inf5",
            "Anovulation has multiple causes — labs distinguish them and guide treatment."),
          no("Start IVF",
            "Treat the underlying ovulation problem first; most respond to oral ovulation induction."),
          no("Laparoscopy",
            "Not indicated for anovulation — would miss the cause."),
        ]),

      D("inf5",
        "Labs come back. What pattern do you see?",
        [
          ok("↑ androgens, polycystic ovaries on US, hirsutism, irregular menses → PCOS",
            "infPCOS",
            "Most common cause of anovulatory infertility."),
          ok("↑ FSH (>30–40) + ↑ LH + low estradiol in woman <40 → premature ovarian insufficiency",
            "infPOI",
            "Ovarian failure — egg donation needed."),
          ok("↓ FSH + ↓ LH + low estradiol + low BMI / excessive exercise / stress → hypothalamic amenorrhea",
            "infHypoth",
            "Functional hypothalamic — restore weight, then gonadotropins or pulsatile GnRH."),
          ok("↑ prolactin → hyperprolactinemia",
            "infPRL",
            "Most often pituitary adenoma or drug-induced; treat with dopamine agonist."),
          ok("Abnormal TSH → thyroid dysfunction",
            "infThy",
            "Hypothyroidism causes anovulation; hyperthyroidism less common but possible."),
        ]),

      O("infPCOS",
        "PCOS infertility — weight loss + letrozole first-line",
        "5–10% weight loss can restore ovulation alone. Letrozole (2.5–7.5 mg cycle days 3–7) — PREFERRED over clomid (higher live birth, lower multiples). Add metformin if insulin resistant. Gonadotropins or IVF if refractory.",
        ["Letrozole has SUPERSEDED clomiphene as first-line in PCOS (PPCOS II trial)",
         "Clomiphene side effects: hot flashes, mood, visual symptoms, multiple gestation",
         "Metformin helps ovulation in insulin-resistant PCOS",
         "Risk of ovarian hyperstimulation syndrome (OHSS) — esp PCOS phenotype",
         "After failed letrozole → gonadotropins (FSH ± hCG) or laparoscopic ovarian drilling, then IVF"]),

      O("infPOI",
        "Premature ovarian insufficiency — donor egg IVF",
        "Spontaneous pregnancy rate <5%. Karyotype (look for Turner mosaic, fragile X premutation), screen for autoimmune (adrenal, thyroid), bone density, HRT until natural menopause age.",
        ["Diagnosis: 4+ mo amenorrhea + FSH >30–40 mIU/mL on two occasions, age <40",
         "Causes: idiopathic (most), Turner mosaicism, fragile X premutation, autoimmune, chemo/radiation",
         "Workup MUST include karyotype + FMR1 (fragile X) + adrenal autoantibodies",
         "Estrogen replacement therapy until age 50–51 (not just for symptoms — bone, CV)",
         "Donor oocyte IVF has high success rates (~50% per transfer)"]),

      O("infHypoth",
        "Hypothalamic amenorrhea — restore energy balance, then gonadotropins or pulsatile GnRH",
        "Often female athletes, anorexia, severe stress. Weight gain + decreased exercise + nutritional restoration often restores ovulation. If refractory: pulsatile GnRH (most physiologic) or exogenous FSH+LH.",
        ["Female athlete triad: amenorrhea + osteoporosis + low energy availability",
         "Often a manifestation of an eating disorder — screen and treat",
         "Clomiphene rarely works (requires intact hypothalamic-pituitary axis)",
         "Pulsatile GnRH is most physiologic; gonadotropins easier and equally effective",
         "Estrogen deficiency causes osteopenia — bone health is part of treatment"]),

      O("infPRL",
        "Hyperprolactinemia — dopamine agonist (cabergoline)",
        "Causes: prolactinoma (micro <10 mm or macro ≥10 mm), drugs (antipsychotics, metoclopramide, opiates, SSRIs), hypothyroid (TRH stimulates PRL). Cabergoline first-line (better tolerated than bromocriptine, twice-weekly dosing).",
        ["Workup: MRI pituitary to look for adenoma; check TSH first (hypothyroidism easy to miss)",
         "Cabergoline restores ovulation in most",
         "Stop dopamine agonists in pregnancy (resume if visual sx) — most microadenomas don't grow",
         "Bromocriptine is the historic alternative (more nausea); SAFER in pregnancy if needed",
         "Antipsychotic-induced hyperPRL: switch to aripiprazole (partial agonist, lower PRL effect)"]),

      O("infThy",
        "Thyroid-related anovulation — normalize TSH",
        "Hypothyroidism is the main culprit; treat with levothyroxine targeting TSH <2.5 for trying-to-conceive women. Hyperthyroidism less common but workup for Graves'.",
        ["Subclinical hypothyroidism (TSH 4.5–10) with infertility — treat to TSH <2.5",
         "Levothyroxine dose typically ↑ 25–30% in pregnancy",
         "Severe hypothyroidism can prevent ovulation entirely",
         "TPO antibodies + recurrent loss → some advocate treatment even with normal TSH"]),

      D("inf6",
        "Semen analysis normal, ovulating normally. HSG shows BILATERAL tubal occlusion or hydrosalpinx. Next step?",
        [
          ok("IVF (most cases — better outcomes than surgery)",
            "infTubal",
            "Tubal patency surgery has fallen out of favor for most patients; IVF outperforms in most metaanalyses."),
          ok("Salpingectomy of hydrosalpinx BEFORE IVF",
            "infTubal",
            "Hydrosalpinx fluid is embryotoxic; remove or clip the tube before IVF."),
          no("Empiric clomid + IUI",
            "Won't bypass blocked tubes."),
          no("Donor egg",
            "Tubes are the issue, not ovarian reserve — egg quality should be fine."),
        ]),

      O("infTubal",
        "Tubal-factor infertility — IVF (with salpingectomy if hydrosalpinx)",
        "Hydrosalpinx halves IVF success rates due to embryotoxic fluid — remove or clip before transfer. Tubal reanastomosis only considered in select younger patients with short prior segments.",
        ["Causes: PID (chlamydia, gonorrhea), endometriosis, prior pelvic surgery, ruptured appendicitis",
         "PID prevention is the biggest public-health win for infertility",
         "Hydrosalpinx → salpingectomy or proximal tubal occlusion BEFORE IVF",
         "Ectopic risk remains elevated even after IVF if abnormal tubes left in place",
         "Tubal reversal surgery: <40, distal patency, ≥4 cm tube — otherwise go to IVF"]),

      D("inf7",
        "All workup normal — semen analysis, ovulation, HSG, ovarian reserve. Diagnosis?",
        [
          ok("Unexplained infertility — start empiric clomid/letrozole + IUI for 3–6 cycles, then IVF",
            "infUnexp",
            "About 15% of infertility is unexplained. Empiric ovulation induction + IUI is reasonable next step."),
          no("Skip to IVF immediately",
            "Less aggressive options often work and are cheaper/less invasive."),
          no("Repeat the entire workup",
            "Workup was complete; move to treatment trial."),
        ]),

      O("infUnexp",
        "Unexplained infertility — letrozole + IUI x 3–6 cycles, then IVF",
        "Empiric ovulation enhancement bumps the per-cycle chance, IUI bypasses cervical factor. If no pregnancy after 3–6 cycles, escalate to IVF. Live birth rates per cycle: clomid+IUI ~10%, letrozole+IUI ~12%, IVF ~30–50% depending on age.",
        ["Age >38 with unexplained: skip directly to IVF (don't waste time)",
         "Endometriosis-related infertility can present as 'unexplained' — laparoscopy if persistent",
         "Lifestyle: weight, smoking, alcohol, caffeine matter",
         "Single-embryo transfer recommended in younger women to avoid multiples",
         "Preimplantation genetic testing (PGT-A) for aneuploidy in advanced age"]),
    ]),
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Category visual metadata
// ────────────────────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  "Cardiology",
  "Pulmonary",
  "Gastroenterology",
  "Endocrine",
  "Renal",
  "Hematology",
  "Oncology",
  "Neurology",
  "OB/GYN",
  "Breast",
  "Pediatrics",
  "Emergency",
  "Infectious Disease",
  "Trauma",
  "Dermatology",
  "Musculoskeletal",
];

export const CATEGORY_META: Record<Category, { color: string; accent: string; emoji: string }> = {
  Cardiology: { color: "from-rose-500 to-red-700", accent: "rose", emoji: "♥" },
  Pulmonary: { color: "from-sky-500 to-blue-700", accent: "sky", emoji: "◐" },
  Gastroenterology: { color: "from-amber-500 to-orange-700", accent: "amber", emoji: "▣" },
  Endocrine: { color: "from-emerald-500 to-teal-700", accent: "emerald", emoji: "✦" },
  Renal: { color: "from-yellow-500 to-amber-700", accent: "yellow", emoji: "◆" },
  Hematology: { color: "from-red-500 to-rose-800", accent: "red", emoji: "◉" },
  Oncology: { color: "from-fuchsia-600 to-purple-800", accent: "fuchsia", emoji: "❖" },
  Neurology: { color: "from-violet-500 to-purple-700", accent: "violet", emoji: "✺" },
  "OB/GYN": { color: "from-pink-500 to-fuchsia-700", accent: "pink", emoji: "❀" },
  Breast: { color: "from-pink-400 to-rose-600", accent: "pink", emoji: "◐" },
  Pediatrics: { color: "from-cyan-400 to-blue-600", accent: "cyan", emoji: "✿" },
  Emergency: { color: "from-red-600 to-orange-700", accent: "red", emoji: "⚡" },
  "Infectious Disease": { color: "from-lime-500 to-green-700", accent: "lime", emoji: "✷" },
  Trauma: { color: "from-orange-600 to-red-800", accent: "orange", emoji: "⌖" },
  Dermatology: { color: "from-amber-400 to-yellow-600", accent: "amber", emoji: "◈" },
  Musculoskeletal: { color: "from-slate-400 to-zinc-600", accent: "slate", emoji: "✦" },
};
