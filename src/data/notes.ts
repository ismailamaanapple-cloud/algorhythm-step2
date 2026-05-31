// Comprehensive study notes — extracted from the 8-Hour Board Review Course (Sessions 1–3).
// Every teaching topic and pearl from the three PDFs, organized for review.

export type NoteSession = 1 | 2 | 3;

export type NoteSection = {
  heading: string;
  bullets: string[];
};

export type NoteTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type Note = {
  id: string;
  session: NoteSession;
  category: string;
  title: string;
  summary: string;
  sections?: NoteSection[];
  tables?: NoteTable[];
  pearls?: string[];
  relatedCaseIds?: string[];
};

export const NOTES: Note[] = [
  // ═══════════════════════════════════════════════════════════════════
  // SESSION 1 — ACUTE STABILIZATION, ENT, NEURO, PSYCH
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "airway-breathing",
    session: 1,
    category: "Acute Stabilization",
    title: "Airway & Breathing Management",
    summary: "Indications for intubation, NIPPV vs intubation, and crashing patient management.",
    sections: [
      {
        heading: "Immediate indications for endotracheal intubation",
        bullets: [
          "Airway protection: AMS unable to protect airway (severe TCA overdose, ETOH intoxication with respiratory distress, trauma)",
          "Mechanical obstruction/threat: expanding neck hematoma or massive facial trauma (cricothyrotomy if standard intubation precluded)",
          "Smoke inhalation: prioritize transoral ETT for hoarseness, carbonaceous sputum, pharyngeal edema, or facial burns",
          "Pediatric epiglottitis (fever, drooling, tripod): secure airway in the OR",
          "Congenital diaphragmatic hernia: intubate at birth; avoid bag-mask (worsens lung compression)",
        ],
      },
      {
        heading: "NIPPV vs intubation",
        bullets: [
          "Cardiogenic pulmonary edema → diuresis + CPAP/BiPAP",
          "COPD exacerbation with hypercarbia + acidosis → NIPPV; intubate if NIPPV fails or AMS",
          "Obesity hypoventilation syndrome → BiPAP for chronic hypercapnia",
        ],
      },
      {
        heading: "The crashing patient",
        bullets: [
          "COPD: target SpO₂ 88–92% to avoid V/Q mismatch worsening and O₂-induced hypercapnia",
          "Severe asthma: nebulized albuterol + systemic steroids; discharge once PEF ≥80% predicted",
          "Flash pulmonary edema (HTN): rapid BP control + ventilatory support",
          "Near-drowning: hypoxia → ARDS and cerebral edema; best prognosis = return of purposeful movements",
        ],
      },
      {
        heading: "ATLS respiratory stabilization",
        bullets: [
          "Tension PTX: clinical dx (hypotension, tracheal deviation, absent breath sounds) → needle decompression 2nd ICS midclavicular BEFORE CXR",
          "Massive hemothorax: hypoxia + hypotension → tube thoracostomy",
          "Prolonged ventilation (>10–14 days): transition to tracheostomy",
        ],
      },
      {
        heading: "Breathing mechanics",
        bullets: [
          "Aspiration pneumonia prevention: intubate if airway protection lost (stroke, advanced AD, PD)",
          "Preoperative FEV1 < 800 mL → contraindication to lung resection",
          "A-a gradient: normal in hypoxic patient = hypoventilation (opioids, OHS)",
        ],
      },
    ],
    pearls: [
      "Cardiogenic edema → BiPAP first if alert",
      "Smoke inhalation → intubate early, don't wait for stridor",
      "Always intubate epiglottitis in OR with anesthesia + ENT ready",
    ],
  },

  {
    id: "shock-fluids",
    session: 1,
    category: "Acute Stabilization",
    title: "Shock & Fluid Resuscitation",
    summary: "Hemodynamic profiles + fluid choices + transfusion thresholds.",
    sections: [
      {
        heading: "Hemodynamic differentiation",
        bullets: [
          "Hypovolemic: ↓CI ↓PCWP ↑SVR; cool/clammy + flat JVP",
          "Cardiogenic: ↓CI ↑PCWP ↑SVR; cool + JVD; causes include inferior MI, myocarditis, blunt cardiac injury",
          "Distributive (sepsis/anaphylaxis): ↑/normal CI ↓PCWP ↓SVR; warm dry skin (peripheral vasodilation)",
          "Neurogenic shock: distributive variant from spinal injury — hypotension + BRADYCARDIA",
          "Obstructive (tension PTX, tamponade, massive PE): JVD + poor perfusion",
        ],
      },
      {
        heading: "Fluid choices",
        bullets: [
          "0.9% NS: hypovolemia, sepsis, hypercalcemia, initial DKA",
          "Lactated Ringer's: trauma, burns (avoid hyperchloremic acidosis); AVOID in hyperkalemia",
          "Parkland formula (burns): 4 mL/kg × %TBSA; 50% in first 8 hr, 50% over next 16 hr",
          "Transfusion threshold: Hgb <7 in stable; emergent O-neg in hemorrhagic shock unresponsive to 2–3 L crystalloid",
        ],
      },
      {
        heading: "Selective IgA deficiency",
        bullets: [
          "Most common primary immunodeficiency, often asymptomatic",
          "Recurrent sinopulmonary and GI infections (Giardia)",
          "Risk of life-threatening anaphylaxis with IgA-containing blood products",
        ],
      },
    ],
    pearls: [
      "Warm, dry skin + hypotension = distributive shock (sepsis/anaphylaxis)",
      "Spinal cord injury + bradycardia + hypotension = neurogenic shock",
      "Anaphylaxis → IM epinephrine FIRST line",
    ],
  },

  {
    id: "thoracic-trauma",
    session: 1,
    category: "Trauma",
    title: "Traumatic Thoracic Injuries",
    summary: "Massive hemothorax, contusions, flail chest, diaphragm rupture, aortic injury.",
    sections: [
      {
        heading: "Massive hemothorax",
        bullets: [
          "Hypoxia + hypotension + dullness to percussion; complete opacification (Hampton's hump) on imaging",
          "Tube thoracostomy first",
          "Thoracotomy if >1500 mL initial output OR persistent bleeding >200 mL/hr × 2–4 hr",
        ],
      },
      {
        heading: "Pulmonary contusion",
        bullets: [
          "Alveolar opacities after blunt trauma; hypoxia worsens over 24 hr",
          "Supportive care (pain control, O₂); AVOID fluid overload",
        ],
      },
      {
        heading: "Myocardial contusion",
        bullets: [
          "Steering wheel impact → chest pain ± troponin elevation, arrhythmia",
          "Behaves like cardiogenic shock — cautious fluids",
        ],
      },
      {
        heading: "Flail chest",
        bullets: [
          "≥3 rib fractures in ≥2 places → paradoxical chest wall motion",
          "Pain control + positive pressure ventilation",
        ],
      },
      {
        heading: "Diaphragmatic rupture",
        bullets: [
          "Usually LEFT side (liver protects right)",
          "Bowel sounds in lung fields, gastric bubble in thorax on CXR",
        ],
      },
      {
        heading: "Blunt thoracic aortic injury",
        bullets: [
          "Aortic isthmus in acceleration-deceleration MVCs",
          "Widened mediastinum on CXR → confirm with CTA",
        ],
      },
    ],
  },

  {
    id: "acute-abdomen",
    session: 1,
    category: "Surgery",
    title: "Perforated Viscus & Pneumoperitoneum",
    summary: "Surgical catastrophe — board-like abdomen → free air → laparotomy.",
    sections: [
      {
        heading: "Presentation",
        bullets: [
          "Sudden severe pain → rigid board-like abdomen + rebound tenderness",
          "Most often from NSAID-induced peptic ulcer perforation",
        ],
      },
      {
        heading: "Triage imaging",
        bullets: [
          "Upright CXR first → free air under diaphragm",
          "AVOID CT if free air already visible — delays definitive care",
        ],
      },
      {
        heading: "Management",
        bullets: [
          "Free air + acute abdomen = emergent ex-lap",
          "IV fluids + broad-spectrum antibiotics + PPI",
        ],
      },
    ],
    pearls: ["NSAID PUD → most common perforation"],
  },

  {
    id: "tia-stroke",
    session: 1,
    category: "Neurology",
    title: "TIA & Ischemic Stroke",
    summary: "TIA = warning; ischemic stroke window 4.5 h for tPA, 24 h for thrombectomy.",
    sections: [
      {
        heading: "TIA",
        bullets: [
          "Focal neuro dysfunction <24 hr, no infarction on imaging",
          "Warning for future stroke — secondary prevention: BP control + high-intensity statin + antiplatelet (ASA)",
          "tPA NOT indicated for TIA",
          "Amaurosis fugax = retinal TIA → carotid duplex US",
        ],
      },
      {
        heading: "Ischemic stroke",
        bullets: [
          "Strongest modifiable risk factor: HYPERTENSION; non-modifiable: AGE",
          "Other risks: smoking, DM, hyperlipidemia",
          "Embolic: AFib (LAA thrombus), post-MI ventricular aneurysm",
          "Lacunar: small vessel HTN damage in basal ganglia/putamen → pure motor, pure sensory, dysarthria-clumsy hand",
        ],
      },
      {
        heading: "Management",
        bullets: [
          "Non-contrast CT FIRST to exclude hemorrhage",
          "tPA (alteplase) if <4.5 hr from LKW + no contraindications",
          "Thrombectomy up to 24 hr with favorable imaging (DAWN/DEFUSE-3)",
          "BP <185/110 before tPA, <180/105 for 24 hr after",
          ">4.5 hr or ineligible → aspirin; permissive HTN (treat only if >220/120)",
        ],
      },
    ],
    relatedCaseIds: ["amaurosis-fugax", "ischemic-stroke-window"],
  },

  {
    id: "ich",
    session: 1,
    category: "Neurology",
    title: "Intracerebral Hemorrhage",
    summary: "HTN with sudden focal deficit + vomiting → CT first, never lytics.",
    sections: [
      {
        heading: "Approach",
        bullets: [
          "Sudden focal deficit + vomiting + HTN → think ICH",
          "Always non-contrast CT BEFORE thrombolytics",
        ],
      },
      {
        heading: "Management",
        bullets: [
          "Reverse anticoagulation per agent (warfarin → 4F-PCC + vit K; dabigatran → idarucizumab; FXa inhibitors → andexanet/4F-PCC; heparin → protamine)",
          "Target systolic 140 in spontaneous ICH",
          "ICP management: HOB 30°, mannitol/hypertonic saline, sedation",
          "Surgical evacuation if cerebellar bleed >3 cm or worsening",
          "Avoid prophylactic anticonvulsants unless seizure occurs",
        ],
      },
    ],
    pearls: [
      "Cushing reflex (HTN, bradycardia, irregular respirations) = ↑ICP",
      "Spot sign on CTA predicts hematoma expansion",
    ],
    relatedCaseIds: ["hypertensive-ich", "ich-mgmt"],
  },

  {
    id: "dementia-ddx",
    session: 1,
    category: "Neurology",
    title: "Dementia Differential Diagnosis",
    summary: "Always screen for reversible causes first.",
    tables: [
      {
        headers: ["Type", "Clinical features"],
        rows: [
          ["Alzheimer", "Gradual memory decline → later executive/language. Donepezil mild; memantine mod–severe"],
          ["Vascular", "Stepwise decline + focal deficits (history of strokes, HTN)"],
          ["Lewy body", "Visual hallucinations ('haLewycinations') + parkinsonism + REM sleep behavior; fluctuating cognition"],
          ["Frontotemporal", "Early personality/behavior or language change; memory spared early"],
          ["Huntington", "Chorea + psychiatric + executive; CAG repeat; anticipation"],
          ["Prion (CJD)", "Rapid (weeks–months) + myoclonus + ataxia; CSF 14-3-3"],
          ["NPH", "Wet (incontinence) + wobbly (gait FIRST) + wacky (dementia); ventriculomegaly out of proportion"],
        ],
      },
    ],
    pearls: [
      "Screen any new cognitive decline for reversible causes (TSH, B12, depression, anticholinergics)",
      "PD dementia vs LBD: apply 1-year rule (motor before cognition by >1 yr = PD dementia)",
      "Avoid antipsychotics in dementia — increased mortality",
    ],
  },

  {
    id: "cns-infections",
    session: 1,
    category: "Infectious Disease",
    title: "CNS Infections",
    summary: "Empiric meningitis abx by age; HSV/Lyme/cryptococcus/neurocysticercosis specifics.",
    sections: [
      {
        heading: "Bacterial meningitis — empiric therapy by age",
        bullets: [
          "<1 month: ampicillin + cefotaxime (cover Listeria + GBS)",
          "1 mo – 50 yr: vancomycin + ceftriaxone",
          ">50 yr or immunosuppressed: vancomycin + ceftriaxone + AMPICILLIN (add Listeria)",
          "Give dexamethasone BEFORE/with first abx dose (adults)",
          "Get CT FIRST if papilledema, focal deficits, AMS, immunocompromised",
        ],
      },
      {
        heading: "Pathogen-specific clues",
        bullets: [
          "S. pneumoniae: most common adult; high risk in asplenia/SCD",
          "N. meningitidis: dorms/barracks; purpuric/petechial rash → contacts get oral rifampin prophylaxis",
          "Listeria: neonates, elderly, immunosuppressed — ampicillin MANDATORY",
          "H. influenzae b: unvaccinated children; prevented by Hib vaccine",
          "M. tuberculosis: subacute fever + AMS + CN palsies; basilar meningeal enhancement on MRI",
        ],
      },
      {
        heading: "Viral / spirochetal",
        bullets: [
          "HSV-1 encephalitis: fever + seizure + AMS; MRI bitemporal hyperintensities; CSF lymphocytic + RBCs. Start IV acyclovir IMMEDIATELY",
          "Lyme meningitis (Borrelia): bilateral CN VII palsy + lymphocytic aseptic meningitis; IV ceftriaxone",
        ],
      },
      {
        heading: "Fungal / parasitic",
        bullets: [
          "Cryptococcal meningitis: HIV CD4 <100; ↑opening pressure + headache; CSF cryptococcal antigen; IV amphotericin B + flucytosine",
          "Neurocysticercosis (Taenia solium): immigrants from Latin America/Asia; multiple ring-enhancing/calcified lesions; albendazole + steroids",
        ],
      },
      {
        heading: "Other intracranial mass lesions",
        bullets: [
          "AIDS + multiple ring-enhancing in basal ganglia → toxoplasmosis (pyrimethamine + sulfadiazine + leucovorin)",
          "AIDS + solitary periventricular ring-enhancing + EBV+ CSF → primary CNS lymphoma",
          "Cavernous sinus thrombosis: facial 'danger triangle' infection + ophthalmoplegia → MR venography + IV abx ± anticoagulation",
        ],
      },
    ],
    relatedCaseIds: ["neonatal-meningitis", "elderly-meningitis", "hsv-encephalitis", "cns-toxoplasmosis", "primary-cns-lymphoma", "cavernous-sinus-thrombosis"],
  },

  {
    id: "brain-tumors",
    session: 1,
    category: "Oncology",
    title: "Brain Tumors",
    summary: "Dexamethasone first for edema; surgical resection + radiation/chemo per type.",
    sections: [
      {
        heading: "Symptomatic mass lesions",
        bullets: [
          "Progressive headache + focal deficits + new seizures + vasogenic edema → IV dexamethasone (stabilizes BBB)",
          "Mannitol is for cytotoxic edema / impending herniation",
          "AVOID lumbar puncture (herniation risk)",
        ],
      },
      {
        heading: "Tumor types",
        bullets: [
          "Brain metastases: multiple ring-enhancing at gray-white junction (lung, breast, melanoma); SRS for limited, WBRT for many",
          "Meningioma: extra-axial dural-based mass in middle-aged woman; 'dural tail'; NF2; observe small asymptomatic",
          "Vestibular schwannoma (acoustic neuroma): progressive unilateral SNHL + tinnitus + imbalance; MRI IAC; bilateral → NF2",
          "Glioblastoma multiforme: large irregular rim-enhancing mass crossing corpus callosum ('butterfly'); Stupp protocol (resection + RT + temozolomide)",
          "Craniopharyngioma: child + bitemporal hemianopsia + GH/DI deficiency + calcified suprasellar mass",
        ],
      },
      {
        heading: "Phakomatoses",
        bullets: [
          "NF1: café-au-lait, Lisch nodules, axillary freckling, optic gliomas",
          "NF2: bilateral vestibular schwannomas — annual brain MRI + audiometry",
          "Tuberous sclerosis: ash leaf spots, shagreen patch, subependymal nodules → SEGAs; cardiac rhabdomyomas; renal AML; vigabatrin for infantile spasms",
          "Sturge-Weber: port-wine stain + leptomeningeal angioma + seizures",
          "Von Hippel-Lindau: hemangioblastomas, RCC, pheochromocytoma",
        ],
      },
    ],
    relatedCaseIds: ["brain-tumor-edema", "brain-mets", "meningioma", "vestibular-schwannoma", "gbm", "tuberous-sclerosis", "craniopharyngioma"],
  },

  {
    id: "headache-ddx",
    session: 1,
    category: "Neurology",
    title: "Headache Classification & Management",
    summary: "Type, signs/triggers, and acute + prophylactic treatment.",
    tables: [
      {
        headers: ["Type", "Presentation", "Associated", "Management"],
        rows: [
          ["Migraine", "Unilateral, throbbing", "Aura, N/V, photo/phonophobia", "Acute: NSAIDs/triptans. Prophylaxis: propranolol, amitriptyline, topiramate/valproate"],
          ["Cluster", "Brief, unilateral severe orbital/temporal", "Ipsilateral autonomic (ptosis, miosis, lacrimation), circadian", "Acute: 100% O₂. Prophylaxis: verapamil"],
          ["Medication overuse (rebound)", "≥15 days/month chronic headache", "Acute med use ≥10 days/mo", "Stop offending acute med + start preventive"],
          ["Caffeine withdrawal", "Diffuse + irritability", "Within 24 hr of last caffeine + fatigue", "Gradual tapering"],
          ["IIH", "↑ICP signs", "Obese young women + papilledema + CN VI palsy + pulsatile tinnitus; LP OP >250", "Weight loss + acetazolamide; ONSF/shunt if vision threatened"],
          ["SAH", "Thunderclap, 'worst headache'", "Meningismus, stupor; ruptured berry aneurysm", "Non-contrast CT → LP for xanthochromia if neg + suspicion"],
          ["GCA", "New headache >50", "Jaw claudication, scalp tenderness, ESR>50", "High-dose steroids IMMEDIATELY before temporal artery biopsy"],
        ],
      },
    ],
    pearls: [
      "Migraine + pregnancy → acetaminophen first (avoid NSAIDs especially 3rd trimester; avoid triptans/ergots)",
      "Triptans contraindicated with CAD, uncontrolled HTN, pregnancy",
      "Estrogen contraceptives contraindicated in migraine WITH AURA (stroke risk); copper IUD is safe",
    ],
    relatedCaseIds: ["iih", "sah", "migraines-pregnancy"],
  },

  {
    id: "spinal-cord",
    session: 1,
    category: "Neurology",
    title: "Spinal Cord & Radiculopathy",
    summary: "Cauda equina, spinal epidural abscess, B12, tabes, radiculopathies.",
    sections: [
      {
        heading: "Subacute combined degeneration (B12)",
        bullets: [
          "Vegan or pernicious anemia + gait instability + numb feet + ↓vibration + +Romberg",
          "Affects dorsal columns + corticospinal tracts",
          "Megaloblastic anemia with hypersegmented neutrophils",
          "Elevated methylmalonic acid + homocysteine",
          "IM B12 replacement; folate alone WORSENS neurologic symptoms",
        ],
      },
      {
        heading: "Tabes dorsalis (tertiary neurosyphilis)",
        bullets: [
          "Lightning leg pains + Argyll Robertson pupils (accommodate but don't react to light) + ataxic gait",
          "Treat with IV penicillin G",
        ],
      },
      {
        heading: "Spinal epidural abscess",
        bullets: [
          "Triad: fever + back pain + neuro deficit",
          "Risks: IVDU, diabetes, immunosuppression, recent procedures",
          "Most common: Staph aureus",
          "Emergent MRI + IV antibiotics + surgical decompression",
        ],
      },
      {
        heading: "Cauda equina syndrome",
        bullets: [
          "Saddle anesthesia + urinary retention + ↓rectal tone + LMN leg weakness",
          "Most common cause: large disc herniation",
          "Emergent decompression within 24–48 hr",
        ],
      },
      {
        heading: "Radiculopathies",
        bullets: [
          "L4: medial leg + ↓knee extension + ↓patellar reflex",
          "L5: dorsiflexion (foot drop) + big toe sensation + no reflex change",
          "S1: lateral foot + ↓plantarflexion + ↓Achilles reflex",
          "Initial conservative (NSAIDs, PT); MRI if severe/progressive",
        ],
      },
      {
        heading: "Mechanical back pain",
        bullets: [
          "Acute after lifting + paraspinal tenderness + no red flags",
          "Conservative care, no imaging",
        ],
      },
      {
        heading: "Spinal stenosis",
        bullets: [
          "Neurogenic claudication — pain with walking, relieved by flexion (shopping cart sign)",
          "Vascular claudication = relieved by standing",
          "MRI lumbar; conservative first, decompression if refractory",
        ],
      },
    ],
    pearls: [
      "Saddle anesthesia + retention = SURGICAL EMERGENCY",
      "Fever + back pain + IVDU/DM = MRI for epidural abscess",
      "Anti-NMDA receptor encephalitis: psych + autonomic + seizures in young woman; often ovarian teratoma",
    ],
    relatedCaseIds: ["b12-deficiency", "tabes-dorsalis", "spinal-epidural-abscess", "cauda-equina", "l4-radiculopathy", "spinal-stenosis"],
  },

  {
    id: "seizures",
    session: 1,
    category: "Neurology",
    title: "Seizures",
    summary: "Focal aware, absence, GTC, status epilepticus.",
    sections: [
      {
        heading: "Classification",
        bullets: [
          "Focal aware (simple partial): consciousness preserved + stereotyped + anatomic spread (Jacksonian march)",
          "Focal impaired awareness: consciousness affected",
          "Generalized tonic-clonic: bilateral + AMS + postictal",
          "Absence (childhood): brief staring + no postictal + 3-Hz spike-and-wave EEG → ethosuximide",
          "Avoid carbamazepine + phenytoin in absence (can worsen)",
        ],
      },
      {
        heading: "Status epilepticus",
        bullets: [
          "Seizure ≥5 min OR repeated without recovery",
          "Step 1: ABCs, glucose, IV access",
          "Step 2: lorazepam IV (or midazolam IM)",
          "Step 3: levetiracetam, fosphenytoin, or valproate IV",
          "Step 4: intubate + propofol/midazolam infusion",
        ],
      },
      {
        heading: "Brain death",
        bullets: [
          "Irreversible cessation of all brain/brainstem function",
          "Clinical: GCS 3, absent brainstem reflexes (pupillary, corneal, oculocephalic, oculovestibular, gag, cough)",
          "Exclude confounders (hypothermia, drugs, metabolic)",
          "Apnea test: PaCO₂ rises ≥20 mm Hg without respiratory effort",
          "Brain death = legal death",
        ],
      },
    ],
    relatedCaseIds: ["focal-aware-seizure", "absence-seizure", "status-epilepticus", "brain-death"],
  },

  {
    id: "movement-disorders",
    session: 1,
    category: "Neurology",
    title: "Movement Disorders",
    summary: "Parkinson, essential tremor, physiologic tremor, ataxias.",
    sections: [
      {
        heading: "Parkinson disease",
        bullets: [
          "TRAPS: Tremor (resting, pill-rolling), Rigidity, Akinesia/bradykinesia, Postural instability, Shuffling gait",
          "Alpha-synuclein (Lewy body) inclusions",
          "First-line: carbidopa-levodopa",
          "Psychosis in PD → quetiapine (avoid worsening motor symptoms)",
          "PT for balance training; pallidotomy or DBS for refractory cases",
        ],
      },
      {
        heading: "Essential tremor",
        bullets: [
          "Bilateral action tremor, improves with alcohol, no parkinsonian features",
          "First-line: propranolol; primidone if asthma",
          "DBS for severe refractory",
        ],
      },
      {
        heading: "Enhanced physiologic tremor",
        bullets: [
          "Fine symmetric high-frequency tremor + clear trigger (caffeine, stress, sleep deprivation, medications)",
          "Remove triggers, reassure",
        ],
      },
    ],
    relatedCaseIds: ["essential-tremor"],
  },

  {
    id: "neuromuscular",
    session: 1,
    category: "Neurology",
    title: "Neuromuscular Junction Disorders",
    summary: "Myasthenia gravis vs Lambert-Eaton; diabetic neuropathy.",
    sections: [
      {
        heading: "Myasthenia gravis",
        bullets: [
          "Fluctuating weakness worse with use, improves with rest/ice",
          "Ocular prominent (ptosis, diplopia); normal sensation/reflexes",
          "Anti-AChR (or anti-MuSK) antibodies",
          "EMG: decremental response with repetitive stimulation",
          "Treat: pyridostigmine + immunosuppression; thymectomy",
          "Myasthenic crisis → plasmapheresis or IVIG",
        ],
      },
      {
        heading: "Lambert-Eaton myasthenic syndrome (LEMS)",
        bullets: [
          "Proximal weakness IMPROVES with brief exercise",
          "Autonomic dysfunction (dry mouth, ED)",
          "60% have small cell lung cancer (paraneoplastic)",
          "Anti-VGCC antibodies; EMG: incremental response",
          "Treat underlying cancer; 3,4-DAP for symptoms",
        ],
      },
      {
        heading: "Diabetic peripheral neuropathy",
        bullets: [
          "Symmetric distal sensory loss (stocking-glove)",
          "Length-dependent axonal degeneration",
          "Burning, nighttime pain, ↓ vibration/pinprick, ↓ ankle reflexes",
          "From chronic hyperglycemia → polyol pathway + microvascular ischemia",
        ],
      },
      {
        heading: "Drug-induced neuropathy",
        bullets: [
          "Isoniazid: pyridoxine (B6) deficiency — give B6 prophylactically",
          "Cisplatin: dose-dependent toxic neuropathy",
          "Lead: distal motor (wrist drop) + microcytic anemia + cognitive decline",
        ],
      },
    ],
    relatedCaseIds: ["myasthenia-gravis", "lems"],
  },

  {
    id: "ophthalmology",
    session: 1,
    category: "Ophthalmology",
    title: "Acute & Chronic Eye Disorders",
    summary: "CRAO, glaucoma, hyphema, conjunctivitis, uveitis, retinoblastoma, retinopathies.",
    sections: [
      {
        heading: "Vision-threatening retinal/vascular",
        bullets: [
          "CRAO: sudden painless monocular loss + pale retina + cherry-red spot at fovea → stroke workup (carotid)",
          "CRVO: 'blood and thunder' fundus; anti-VEGF",
          "Amaurosis fugax: transient 'curtain coming down' → carotid duplex",
          "Macular degeneration: distorted central vision (metamorphopsia), drusen on fundus; wet AMD → anti-VEGF",
          "Retinal detachment: flashes/floaters then 'curtain'; emergent surgery",
          "CMV retinitis: HIV CD4<50; 'pizza pie' hemorrhages + necrosis; ganciclovir/foscarnet",
          "GCA: vision loss + headache + jaw claudication + ESR>50 → immediate steroids",
        ],
      },
      {
        heading: "Acute angle-closure glaucoma",
        bullets: [
          "Sudden painful red eye + mid-dilated FIXED pupil + nausea/vomiting + hazy cornea",
          "Iris blocks trabecular meshwork → ↑IOP",
          "Acute: timolol + acetazolamide + pilocarpine",
          "Definitive: laser peripheral iridotomy (usually bilateral)",
        ],
      },
      {
        heading: "Hyphema",
        bullets: [
          "Blood layering in anterior chamber after blunt trauma",
          "Shield eye + elevate HOB + monitor IOP",
          "Screen sickle cell (high risk of complications)",
          "Rebleed 3–5 days",
        ],
      },
      {
        heading: "Conjunctivitis",
        bullets: [
          "Viral (adenovirus): watery, follicular, preauricular LAD → supportive",
          "Allergic: itching, bilateral → antihistamines + mast cell stabilizers",
          "Bacterial: purulent, stuck eyelids → topical antibiotics (erythromycin, polymyxin)",
        ],
      },
      {
        heading: "Anterior uveitis",
        bullets: [
          "Painful red eye + photophobia + constricted pupil + ciliary flush + cells/flare",
          "Associated: HLA-B27 spondyloarthropathies, sarcoid, IBD",
          "Topical steroids + cycloplegics",
        ],
      },
      {
        heading: "Retinoblastoma",
        bullets: [
          "Leukocoria + absent red reflex in child",
          "RB1 gene mutation; AD heritable; bilateral/multifocal possible",
          "Increased risk of osteosarcoma",
          "Urgent ophtho + MRI",
        ],
      },
      {
        heading: "Optic neuritis",
        bullets: [
          "Painful unilateral vision loss with eye movement + RAPD",
          "Often presents MS — MRI brain/spine",
          "IV methylprednisolone speeds recovery",
        ],
      },
      {
        heading: "Diabetic & hypertensive retinopathy",
        bullets: [
          "DM nonproliferative: microaneurysms (earliest), hard exudates, cotton-wool spots",
          "DM proliferative: neovascularization → panretinal photocoagulation",
          "HTN: AV nicking + flame hemorrhages + cotton-wool spots + pale disc",
        ],
      },
    ],
    relatedCaseIds: ["crao", "angle-closure-glaucoma", "hyphema", "viral-conjunctivitis", "anterior-uveitis", "retinoblastoma", "optic-neuritis"],
  },

  {
    id: "ent",
    session: 1,
    category: "ENT",
    title: "ENT — Vertigo, Ear Infections",
    summary: "Ménière, vestibular neuritis, BPPV, AOM, otitis externa.",
    sections: [
      {
        heading: "Vertigo differential",
        bullets: [
          "Ménière disease: episodic vertigo (20 min–24 h) + SNHL + tinnitus + aural fullness; endolymphatic hydrops; ↓ salt + meclizine acute",
          "Vestibular neuritis: continuous vertigo days + post-URI + NO hearing loss",
          "Labyrinthitis: vertigo + hearing loss",
          "BPPV: <1 min triggered by head movement → Dix-Hallpike to dx, Epley to treat",
          "Acoustic neuroma: progressive unilateral SNHL + imbalance",
          "Cerebellar stroke: vertigo + focal neuro + risk factors",
        ],
      },
      {
        heading: "Otitis media (AOM)",
        bullets: [
          "Bulging TM + ear pain + fever",
          "Pathogens: S. pneumoniae, H. flu, M. catarrhalis",
          "Sudden otorrhea + pain relief = TM rupture",
          "Treat: high-dose amoxicillin (Augmentin if failure or recent abx)",
        ],
      },
      {
        heading: "Otitis externa",
        bullets: [
          "Swimmer + pain with pinna movement + swollen canal",
          "Pseudomonas",
          "Topical fluoroquinolone drops",
        ],
      },
      {
        heading: "Malignant otitis externa",
        bullets: [
          "Elderly diabetic + severe ear pain + granulation tissue + CN VII palsy",
          "Pseudomonas → skull base osteomyelitis",
          "CT/MRI for extent; IV antipseudomonal × 6 weeks",
        ],
      },
    ],
    relatedCaseIds: ["menieres", "vestibular-neuritis", "bppv", "aom", "otitis-externa", "malignant-otitis-externa"],
  },

  {
    id: "psych-mood-anxiety",
    session: 1,
    category: "Psychiatry",
    title: "Mood & Anxiety Disorders",
    summary: "Depression, bipolar, anxiety, PTSD, OCD.",
    sections: [
      {
        heading: "Major depressive disorder",
        bullets: [
          "SIGECAPS ≥5 for ≥2 weeks with functional impairment",
          "First-line: SSRI + CBT (combination > either alone)",
          "Black box warning in adolescents: ↑ suicidal ideation",
          "Treatment-resistant + psychotic features → ECT (safe in pregnancy)",
        ],
      },
      {
        heading: "Bipolar",
        bullets: [
          "Mania: ≥1 wk elevated mood + ↑energy + ↓sleep + pressured speech + risky behavior; OR hospitalization",
          "Bipolar I: ≥1 manic episode (± depression). Bipolar II: hypomania + MDE",
          "Acute mania: lithium, valproate, atypicals (quetiapine, olanzapine)",
          "Bipolar depression: mood stabilizer FIRST (lithium, quetiapine) — do NOT use antidepressant monotherapy",
          "Lithium reduces suicide; restart effective agent on relapse",
        ],
      },
      {
        heading: "Lithium toxicity",
        bullets: [
          "Triggered by dehydration, NSAIDs, ACEi, thiazides → ↓ renal clearance",
          "GI (early), neurologic (tremor, ataxia, seizure), cardiac",
          "Dialysis if level >2.5 with symptoms or >4.0",
          "Chronic monitoring: TSH (hypothyroidism), creatinine",
          "Teratogenic: Ebstein anomaly",
        ],
      },
      {
        heading: "Anxiety disorders",
        bullets: [
          "Panic disorder: recurrent unexpected attacks + worry/avoidance → CBT + SSRI/SNRI",
          "GAD: excessive worry ≥6 mo + ≥3 symptoms → CBT and/or SSRI/SNRI; buspirone adjunct",
          "Social anxiety (performance-only): propranolol PRN; generalized: CBT + SSRI",
          "OCD: ERP + high-dose SSRI",
          "PTSD: trauma-focused CBT first; SSRI/SNRI (sertraline, paroxetine, venlafaxine); prazosin for nightmares",
          "Acute stress disorder: 3 days–1 month after trauma → trauma-focused CBT",
        ],
      },
      {
        heading: "SSRI discontinuation syndrome",
        bullets: [
          "Abrupt stop of short t1/2 SSRI (paroxetine) → flu-like + dizziness + paresthesias + irritability",
          "Resume + taper",
          "SSRIs need 4–6 weeks for full effect",
        ],
      },
    ],
    pearls: [
      "#1 risk factor for suicide: prior attempt",
      "#1 risk factor for postpartum depression: history of depression",
      "Any eating disorder + bupropion = contraindicated (seizures)",
    ],
    relatedCaseIds: ["mdd-adolescent", "ect-psychotic-depression", "lithium-toxicity", "panic-disorder", "gad", "ocd", "ptsd"],
  },

  {
    id: "psych-psychotic",
    session: 1,
    category: "Psychiatry",
    title: "Psychotic & Personality Disorders",
    summary: "Schizophrenia spectrum + personality clusters.",
    sections: [
      {
        heading: "Schizophrenia spectrum",
        bullets: [
          "≥2 symptoms (delusions, hallucinations, disorganized speech, behavior, negative) with ≥1 from first three",
          "<1 month: brief psychotic disorder",
          "1–6 months: schizophreniform",
          "≥6 months: schizophrenia",
          "First-line: atypical antipsychotic (lower EPS than typical)",
          "Clozapine for refractory; monitor for agranulocytosis (weekly CBC)",
          "Nonadherence/recurrent relapse → long-acting injectable (LAI)",
        ],
      },
      {
        heading: "Other psychotic",
        bullets: [
          "Delusional disorder: fixed non-bizarre belief without hallucinations or impairment",
          "Acute new-onset psychosis: rule out substance/medical causes FIRST",
        ],
      },
      {
        heading: "Personality disorders",
        bullets: [
          "Cluster A: paranoid, schizoid (emotionally flat), schizotypal (magical thinking)",
          "Cluster B: antisocial (CONDUCT disorder before 15), borderline (DBT first), histrionic, narcissistic",
          "Cluster C: avoidant, dependent, OCPD (perfectionism, ego-syntonic)",
        ],
      },
      {
        heading: "Defense mechanisms",
        bullets: [
          "Denial: refuses to accept reality",
          "Rationalization: justifying behavior with logical-sounding reasons",
          "Projection: attributing own feelings to others",
          "Splitting: all good or all bad (BPD)",
          "Displacement: redirect to safer target",
          "Sublimation: channel impulses to socially acceptable activity (mature)",
        ],
      },
    ],
    relatedCaseIds: ["schizophrenia-dx", "lai-antipsychotic"],
  },

  {
    id: "psych-pharm-eps",
    session: 1,
    category: "Psychiatry",
    title: "Antipsychotic Side Effects (EPS, NMS, SS)",
    summary: "Time-based EPS classification + NMS vs serotonin syndrome.",
    tables: [
      {
        caption: "Extrapyramidal symptoms by timing",
        headers: ["Reaction", "Onset", "Features", "Treatment"],
        rows: [
          ["Acute dystonia", "Hours-days", "Painful spasms, torticollis, oculogyric crisis", "Benztropine or diphenhydramine"],
          ["Akathisia", "Days-weeks", "Inner restlessness, pacing", "Propranolol; benzo alternative"],
          ["Drug-induced parkinsonism", "Weeks-months", "Bradykinesia, rigidity, tremor", "Benztropine or amantadine; lower dose"],
          ["Tardive dyskinesia", "Months-years", "Lip smacking, choreoathetoid tongue", "Valbenazine (VMAT-2 inhibitor); switch to clozapine. AVOID anticholinergics"],
        ],
      },
      {
        caption: "NMS vs Serotonin syndrome",
        headers: ["Feature", "NMS", "Serotonin syndrome"],
        rows: [
          ["Trigger", "Dopamine antagonists (haloperidol)", "Serotonergic agents (SSRI + MAOI)"],
          ["Symptoms", "Fever + lead-pipe rigidity + ↑CK + myoglobinuria + AMS", "Hyperthermia + clonus + hyperreflexia + agitation + autonomic instability"],
          ["Treatment", "Stop drug + hydration + dantrolene or bromocriptine", "Stop drug + cyproheptadine"],
        ],
      },
    ],
    pearls: [
      "Mirtazapine: sedating + appetite-stimulating (good for elderly with insomnia + weight loss)",
      "Bupropion: activating, no sexual side effects; lowers seizure threshold (avoid in eating disorders)",
      "TCA overdose: anticholinergic + QTc/QRS prolongation → sodium bicarbonate",
    ],
  },

  {
    id: "psych-peds",
    session: 1,
    category: "Psychiatry",
    title: "Pediatric Psychiatry",
    summary: "ADHD, ASD, ODD, Tourette, enuresis, anorexia/bulimia.",
    sections: [
      {
        heading: "ADHD",
        bullets: [
          "Inattention + hyperactivity in ≥2 settings (home + school)",
          "Age <6: behavioral therapy only",
          "Age ≥6: stimulants first-line (methylphenidate, amphetamines)",
          "Non-stimulants (atomoxetine, guanfacine, clonidine) if substance abuse, parent refusal, AEs",
        ],
      },
      {
        heading: "Autism spectrum disorder",
        bullets: [
          "Social communication deficits + restricted/repetitive behaviors",
          "Early intervention with ABA (intensive behavioral therapy)",
          "Risperidone/aripiprazole for severe irritability",
          "Don't wait until school age",
        ],
      },
      {
        heading: "Other peds",
        bullets: [
          "ODD: arguing, defying, spite toward authority",
          "Conduct disorder: violates rights of others before 15 (→ antisocial if ≥18)",
          "Tourette: motor + vocal tics >1 yr; habit reversal training, tetrabenazine, antipsychotics if severe",
          "Primary nocturnal enuresis: child ≥5 yr; reassurance + motivational therapy; alarm > desmopressin long-term",
          "Adolescent distancing + peer attachment + late sleep = normal development",
        ],
      },
      {
        heading: "Eating disorders",
        bullets: [
          "Anorexia: BMI<18.5, denial, amenorrhea, lanugo, bradycardia, osteoporosis; nutritional rehab + CBT; no antidepressants until weight restored",
          "Bulimia: normal/↑ BMI, binge + purge; CBT + SSRI (fluoxetine); BUPROPION CONTRAINDICATED",
          "Binge eating: most common ED in US; CBT, SSRI, lisdexamfetamine",
        ],
      },
      {
        heading: "Postpartum mood disorders",
        bullets: [
          "Postpartum blues: 2–3 days to <2 wk; reassurance",
          "Postpartum depression: 4 wk to 12 mo; SSRI + CBT",
          "Postpartum psychosis: days–weeks; delusions, hallucinations, infanticide risk → emergency hospitalization",
        ],
      },
      {
        heading: "Factitious vs malingering",
        bullets: [
          "Factitious: internal/primary gain ('sick role')",
          "Malingering: external/secondary gain (disability, drugs, release)",
        ],
      },
    ],
    pearls: [
      "Spiral humeral fracture + inconsistent history → report to CPS (non-accidental trauma)",
      "Acute sexual assault → safety + privacy + emergency contraception + STI ppx + nonjudgmental support; offer forensic exam if consented",
    ],
    relatedCaseIds: ["adhd-tx", "autism", "anorexia", "bulimia"],
  },

  {
    id: "alcohol-use",
    session: 1,
    category: "Psychiatry",
    title: "Alcohol Use Disorder",
    summary: "Acamprosate, naltrexone, disulfiram; withdrawal management.",
    tables: [
      {
        headers: ["Scenario", "Drug"],
        rows: [
          ["AUD + liver disease", "Acamprosate"],
          ["AUD + opioid use", "Acamprosate"],
          ["AUD + normal liver, no opioids", "Naltrexone"],
          ["Active alcohol withdrawal", "Benzodiazepines"],
          ["Highly motivated + supervised", "Disulfiram"],
        ],
      },
    ],
    sections: [
      {
        heading: "Withdrawal management",
        bullets: [
          "Benzodiazepines first-line (lorazepam if liver failure)",
          "Thiamine BEFORE glucose (prevent Wernicke)",
          "Mg, folate, multivitamin",
          "DTs: 48–96 hr after last drink; mortality ~5%; ICU + escalating benzos or propofol",
          "Phenobarbital for severe refractory",
        ],
      },
    ],
    pearls: [
      "Naltrexone contraindicated with opioids (precipitates withdrawal)",
      "Acamprosate is safe with opioids and liver disease",
    ],
    relatedCaseIds: ["alcohol-mat", "alcohol-withdrawal"],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SESSION 2 — THORAX (CARDIO + PULM + BREAST)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "endocarditis-full",
    session: 2,
    category: "Cardiology",
    title: "Infective Endocarditis",
    summary: "Prophylaxis indications + IE management + perivalvular abscess.",
    sections: [
      {
        heading: "Prophylaxis indications (only these conditions)",
        bullets: [
          "Prosthetic valve",
          "Prior infective endocarditis",
          "Unrepaired cyanotic congenital heart disease",
          "Mnemonic: SMURF (cyanotic) + TURF (roughed-up endocardium)",
          "MVP, MR, AS, etc. → NOT indications",
        ],
      },
      {
        heading: "Prophylaxis regimens",
        bullets: [
          "Standard: amoxicillin 2 g PO 30–60 min before procedure",
          "Penicillin-allergic: doxycycline, azithromycin, clarithromycin, clindamycin (alternatives)",
        ],
      },
      {
        heading: "IE workup",
        bullets: [
          "Always 3 blood cultures from different sites BEFORE antibiotics (if stable)",
          "IVDU IE: tricuspid valve most common; MRSA empirically (vancomycin)",
          "Non-IVDU native valve: vancomycin + ceftriaxone",
          "TEE > TTE for vegetation detection",
          "New AV block in IE → perivalvular abscess → urgent TEE + surgery",
        ],
      },
      {
        heading: "Surgical indications",
        bullets: [
          "Heart failure from valve dysfunction",
          "Abscess (perivalvular)",
          "Refractory infection on appropriate abx",
          "Large vegetation (>10 mm) or recurrent emboli",
        ],
      },
    ],
    relatedCaseIds: ["ie-prophylaxis", "endocarditis-ivdu", "perivalvular-abscess"],
  },

  {
    id: "chronic-angina",
    session: 2,
    category: "Cardiology",
    title: "Chronic Stable Angina",
    summary: "ASA + statin + BB + nitrate PRN; stress test pathway.",
    sections: [
      {
        heading: "Pharmacotherapy",
        bullets: [
          "Foundation: aspirin + high-intensity statin",
          "First-line antianginal: beta-blocker (↓ contractility + HR)",
          "Add: long-acting nitrate or CCB",
          "Refractory: ranolazine (no major hemodynamic effects)",
          "AVOID beta-blockers in Prinzmetal (use CCB)",
          "Nicotine patches OK in stable angina",
        ],
      },
      {
        heading: "Risk factor modification",
        bullets: [
          "Smoking cessation (most important)",
          "Mediterranean diet ↓ CV mortality",
          "Aerobic exercise program",
        ],
      },
      {
        heading: "Diagnostic triage",
        bullets: [
          "Stress test: intermediate pretest probability + interpretable ECG + can exercise = exercise treadmill",
          "Pharmacologic stress (adenosine, dipyridamole, dobutamine): cannot exercise OR ECG uninterpretable (LBBB, paced, ST↓)",
          "Dobutamine if vasodilators contraindicated; AVOID adenosine/dipyridamole in severe asthma/COPD",
          "Coronary angiography: high-risk stress findings or refractory symptoms",
        ],
      },
    ],
    pearls: [
      "Nitrates + PDE5 inhibitor (sildenafil) → dangerous hypotension",
      "Add ranolazine when BB + nitrates fail and BP/HR limits further therapy",
    ],
    relatedCaseIds: ["stable-angina-first-line", "exercise-stress-test"],
  },

  {
    id: "acs",
    session: 2,
    category: "Cardiology",
    title: "Acute Coronary Syndromes",
    summary: "STEMI, NSTEMI, unstable angina, cocaine MI, Prinzmetal.",
    sections: [
      {
        heading: "STEMI",
        bullets: [
          "ECG: ST elevation in contiguous leads",
          "Aspirin + P2Y12 + heparin + statin + BB + nitrate (avoid if RV infarct/hypotensive)",
          "Reperfusion: PCI ≤90 min door-to-balloon; thrombolytics ≤30 min if PCI not available within 120 min",
          "DAPT ≥12 months after DES",
        ],
      },
      {
        heading: "NSTEMI / unstable angina",
        bullets: [
          "Ischemic ECG + positive troponin = NSTEMI",
          "Ischemic ECG + negative troponin = unstable angina",
          "Repeat troponin in 3–6 hr if early negative",
          "DAPT + anticoagulation; TIMI/GRACE risk stratification",
          "Early invasive (<24 hr) for high-risk",
        ],
      },
      {
        heading: "Prinzmetal (vasospastic)",
        bullets: [
          "Rest pain, often early morning; transient ST elevation that resolves",
          "Smoking is major RF",
          "Clean coronaries on angiography",
          "Treat: CCB (diltiazem, amlodipine) + nitrates; AVOID beta-blockers",
        ],
      },
      {
        heading: "Cocaine-induced MI",
        bullets: [
          "Sympathetic surge → vasospasm + thrombosis",
          "Benzodiazepines FIRST (reduce sympathetic drive)",
          "Nitrates + ASA + phentolamine",
          "AVOID beta-blockers (unopposed alpha)",
        ],
      },
    ],
    relatedCaseIds: ["stemi-initial", "inferior-stemi-pci-distance", "prinzmetal-angina", "troponin-early-negative", "unstable-angina", "cocaine-mi"],
  },

  {
    id: "mi-complications",
    session: 2,
    category: "Cardiology",
    title: "MI Complications",
    summary: "VF (<24 h), papillary muscle rupture (3–5 d), free wall rupture, LV aneurysm.",
    sections: [
      {
        heading: "Timeline of complications",
        bullets: [
          "First 24 hr: ventricular fibrillation (most common cause of pre-hospital MI death)",
          "1–3 days: post-MI pericarditis (treat with aspirin, NOT NSAIDs early)",
          "3–7 days: papillary muscle rupture (inferior MI → posteromedial → acute MR); free wall rupture → tamponade; VSD",
          "Weeks-months: ventricular aneurysm (persistent ST elevation + Q waves + dyskinetic wall)",
          "Weeks-months: Dressler syndrome (autoimmune pericarditis)",
        ],
      },
      {
        heading: "Acute MR vs VSD murmurs",
        bullets: [
          "Apex holosystolic + sudden flash pulmonary edema = papillary muscle rupture → acute MR",
          "Left lower sternal border holosystolic = post-MI VSD",
          "Posteromedial papillary muscle has single supply (PDA from RCA) → inferior MI",
        ],
      },
      {
        heading: "Post-MI med management",
        bullets: [
          "Pulmonary edema + HTN + no improvement on diuretics → add IV vasodilator (nitroprusside)",
          "DAPT for 12+ months",
          "ACEi/ARB prevents remodeling/LV aneurysm",
        ],
      },
    ],
    relatedCaseIds: ["papillary-muscle-rupture", "lv-aneurysm"],
  },

  {
    id: "hf-cardiomyopathy",
    session: 2,
    category: "Cardiology",
    title: "Heart Failure & Cardiomyopathies",
    summary: "HFrEF mortality drugs, HFpEF, cor pulmonale, restrictive, HOCM.",
    sections: [
      {
        heading: "HFrEF drugs WITH mortality benefit",
        bullets: [
          "ACEi/ARB or ARNI (sacubitril/valsartan)",
          "Beta-blockers: carvedilol, metoprolol succinate, bisoprolol ONLY",
          "Aldosterone antagonists (spironolactone, eplerenone)",
          "SGLT2 inhibitors (dapagliflozin, empagliflozin)",
          "Hydralazine/nitrates (esp. in Black patients)",
        ],
      },
      {
        heading: "HFrEF drugs WITHOUT mortality benefit",
        bullets: [
          "Digoxin: symptom relief only",
          "Diuretics: symptom relief only",
        ],
      },
      {
        heading: "HFpEF / Cor pulmonale",
        bullets: [
          "Right-sided HF signs: JVD, hepatomegaly, peripheral edema (clear lungs)",
          "Causes: COPD, ILD, OSA, CTEPH, connective tissue diseases (systemic sclerosis)",
          "Loud P2 + RV strain on echo → pulmonary HTN",
          "Right heart cath to confirm PA pressures (PCWP ≤15 = arterial; >15 = left-heart cause)",
        ],
      },
      {
        heading: "Cardiomyopathies",
        bullets: [
          "Viral myocarditis (Coxsackie B) → dilated CM in young + viral prodrome + ↓EF + biventricular dilation",
          "Trastuzumab → reversible cardiomyopathy (S3 gallop); anthracyclines (doxorubicin) → IRREVERSIBLE (dexrazoxane reduces)",
          "Restrictive: preserved EF + low-voltage QRS + radiation/amyloid/sarcoid/hemochromatosis",
          "HOCM: young + systolic murmur LOUDER with Valsalva; AVOID competitive athletics",
        ],
      },
      {
        heading: "HOCM management",
        bullets: [
          "Asymptomatic: activity restriction; ICD if high-risk (prior VT/VF, FHx SCD, syncope, septum >30 mm)",
          "Symptomatic: beta-blocker first; verapamil if BB contraindicated",
          "Refractory: surgical myectomy or alcohol septal ablation",
          "Most common cause of death in HOCM: VF",
        ],
      },
    ],
    relatedCaseIds: ["hfref-mortality", "viral-myocarditis", "trastuzumab-cardiotoxicity", "restrictive-cm", "hocm-asymptomatic"],
  },

  {
    id: "pericardial-disease",
    session: 2,
    category: "Cardiology",
    title: "Pericarditis & Tamponade",
    summary: "Acute pericarditis (NSAID + colchicine), constrictive, tamponade.",
    sections: [
      {
        heading: "Acute pericarditis",
        bullets: [
          "Pleuritic chest pain better leaning forward + friction rub + diffuse ST↑ + PR↓",
          "Most common: viral (Coxsackie)",
          "Treat: NSAIDs + colchicine",
          "Post-MI (early): ASA (avoid non-aspirin NSAIDs early; impair myocardial healing)",
          "Uremic: hemodialysis (not NSAIDs)",
          "Purulent: antibiotics + drainage",
        ],
      },
      {
        heading: "Constrictive pericarditis",
        bullets: [
          "Rigid pericardium → impaired diastolic filling",
          "TB endemic regions: TB most common; US: viral or post-radiation",
          "Pericardial knock + elevated JVP + Kussmaul sign (paradoxical ↑JVP with inspiration)",
          "CXR/CT: pericardial calcifications",
          "Pericardiectomy if severe",
        ],
      },
      {
        heading: "Cardiac tamponade",
        bullets: [
          "Beck's triad: hypotension + JVD + muffled heart sounds",
          "Pulsus paradoxus >10 mm Hg with inspiration",
          "Clear lungs distinguishes from cardiogenic shock",
          "Echo: RV diastolic collapse, IVC plethora",
          "Pericardiocentesis (echo-guided)",
          "Common causes: malignancy, viral, uremia, dissection",
        ],
      },
    ],
    relatedCaseIds: ["constrictive-pericarditis", "acute-pericarditis", "cardiac-tamponade", "electrical-alternans"],
  },

  {
    id: "arrhythmias",
    session: 2,
    category: "Cardiology",
    title: "Arrhythmias",
    summary: "AFib, AVB, SVT, VT, WPW, torsades.",
    sections: [
      {
        heading: "Atrial fibrillation",
        bullets: [
          "Rate control first-line: beta-blocker OR non-DHP CCB (diltiazem/verapamil if asthma/COPD)",
          "Unstable (hypotension/AMS/chest pain/shock): synchronized cardioversion",
          "Stroke prevention: CHA₂DS₂-VASc ≥2 (M) or ≥3 (F) → DOAC (apixaban, rivaroxaban)",
          "Warfarin for mechanical valves or severe MS",
          "Young + AFib + weight loss + palpitations → check TSH (hyperthyroidism)",
        ],
      },
      {
        heading: "AV blocks",
        bullets: [
          "1st degree (PR >200): asymptomatic = reassurance",
          "Mobitz I (progressive lengthening): usually no pacemaker",
          "Mobitz II + 3rd degree: pacemaker",
          "Inferior MI + complete AV dissociation: temporary pacemaker (often resolves)",
        ],
      },
      {
        heading: "SVT (narrow QRS)",
        bullets: [
          "Stable regular: vagal maneuvers → adenosine 6 mg, then 12 mg",
          "Irregular (AFib/aflutter): rate control",
          "Unstable: synchronized cardioversion",
        ],
      },
      {
        heading: "VT (wide QRS)",
        bullets: [
          "Stable VT: IV amiodarone or lidocaine",
          "Unstable VT: synchronized cardioversion",
          "Pulseless VT/VF: defibrillation + ACLS",
          "Wide QRS in older patient with CAD = assume VT",
          "Old MI + sudden syncope = ventricular arrhythmia (scar-related re-entry)",
        ],
      },
      {
        heading: "Torsades de pointes",
        bullets: [
          "Polymorphic VT + prolonged QT",
          "Triggers: macrolides, fluoroquinolones, methadone, haloperidol, TCAs, antiarrhythmics, hypoK/Mg/Ca",
          "Treat: IV magnesium (even if Mg normal)",
          "Unstable → defibrillate",
        ],
      },
      {
        heading: "WPW",
        bullets: [
          "Delta wave + short PR + wide QRS at baseline",
          "AFib in WPW: AVOID AV nodal blockers (BB, CCB, digoxin, adenosine) → procainamide or ibutilide; cardiovert if unstable",
          "Definitive: catheter ablation of accessory pathway",
        ],
      },
      {
        heading: "Sinus bradycardia",
        bullets: [
          "Symptomatic: atropine first",
          "BB overdose: IV glucagon (↑cAMP independent of BB)",
          "CCB overdose: IV calcium + glucagon",
          "Digoxin toxicity: digoxin immune Fab",
          "Refractory: transcutaneous → transvenous pacing",
        ],
      },
    ],
    relatedCaseIds: ["afib-asthma", "afib-stroke-prophylaxis", "wpw-management", "ventricular-tachycardia", "torsades", "stable-tachy"],
  },

  {
    id: "valvular-disease",
    session: 2,
    category: "Cardiology",
    title: "Valvular Heart Disease",
    summary: "AS, AR, MS, MR — diagnosis and surgical thresholds.",
    sections: [
      {
        heading: "Aortic stenosis",
        bullets: [
          "Age <70: bicuspid valve; ≥70: senile calcific",
          "Severe AS: late-peaking systolic murmur + soft A2 + narrow pulse pressure + pulsus parvus et tardus",
          "Symptomatic severe AS or LVEF <50% → valve replacement (TAVR or surgical)",
          "Medical therapy does NOT fix obstruction",
          "Avoid vasodilators in severe AS",
        ],
      },
      {
        heading: "Aortic regurgitation",
        bullets: [
          "Marfan + AR from root dilation → risk of dissection",
          "Early diastolic decrescendo murmur",
          "Widened pulse pressure; water-hammer pulse",
          "Annual echo; replace root when >5 cm",
          "BB or ARB to slow dilation",
        ],
      },
      {
        heading: "Mitral disease",
        bullets: [
          "MS: opening snap + mid-diastolic murmur; severe (valve area <1.0) + symptoms → balloon valvotomy",
          "Chronic MR: regurgitant flow → LV dilation; surgical repair when symptoms or EF <60%",
          "Post-MI functional MR (improves with diuretics) vs papillary muscle rupture (does NOT improve, requires surgery)",
        ],
      },
      {
        heading: "Rheumatic fever prophylaxis",
        bullets: [
          "No carditis: 5 years or until age 21 (whichever longer)",
          "Carditis without residual disease: 10 years or until age 21",
          "Carditis with persistent valvular disease: 10 years or until age 40",
          "Benzathine penicillin G IM every 4 weeks",
        ],
      },
      {
        heading: "Other vascular conditions",
        bullets: [
          "Coarctation: arm-leg BP difference + weak femoral pulses → echo to confirm",
          "Young cryptogenic stroke + DVT → bubble study echo for PFO (paradoxical embolism)",
        ],
      },
    ],
    relatedCaseIds: ["aortic-stenosis", "marfan-aortic"],
  },

  {
    id: "peds-respiratory",
    session: 2,
    category: "Pediatrics",
    title: "Pediatric Respiratory Distress",
    summary: "Croup, epiglottitis, bronchiolitis, FB aspiration, neonatal lung disease.",
    sections: [
      {
        heading: "Croup (laryngotracheobronchitis)",
        bullets: [
          "Toddler + barking cough + inspiratory stridor at rest + viral URI prodrome",
          "Parainfluenza most common",
          "Mild: dexamethasone single dose",
          "Moderate/severe (stridor at rest): nebulized epinephrine + dexamethasone",
          "Steeple sign on neck X-ray (not always needed)",
        ],
      },
      {
        heading: "Epiglottitis",
        bullets: [
          "Unvaccinated child + fever + drooling + tripod + muffled voice",
          "Hib historically (declining); now GAS, Staph aureus, S. pneumoniae",
          "Thumb sign on lateral neck X-ray",
          "Secure airway in OR with anesthesia + ENT — DO NOT examine in ED",
          "Then ceftriaxone + vancomycin",
        ],
      },
      {
        heading: "Bronchiolitis",
        bullets: [
          "Infant <2 years + viral URI + wheezing + crackles",
          "RSV most common",
          "Supportive care (hydration, suctioning, O₂)",
          "Hospitalize if hypoxia, dehydration, respiratory failure",
          "Palivizumab prophylaxis for high-risk (preterm, CHD, BPD)",
        ],
      },
      {
        heading: "Foreign body aspiration",
        bullets: [
          "Toddler + sudden unilateral wheezing + hyperinflation + unresponsive to albuterol",
          "Right main bronchus most common",
          "Inspiratory + expiratory CXR shows air trapping",
          "Rigid bronchoscopy is definitive",
        ],
      },
      {
        heading: "Neonatal respiratory distress differential",
        bullets: [
          "NRDS (surfactant deficiency): premature + ground-glass + air bronchograms + low volumes",
          "TTN: term C-section + mild + fluid in fissures + improves in 24–48 hr",
          "MAS: term/post-term + meconium fluid + coarse infiltrates + hyperinflation",
          "Pneumothorax: sudden crash + asymmetric breath sounds + hyperlucent side + mediastinal shift",
          "Neonatal sepsis: temperature instability + lethargy + diffuse illness",
          "TEF: choking with feeds + cannot pass NG tube",
          "CDH: scaphoid abdomen + bowel sounds in chest + severe distress at birth",
        ],
      },
    ],
    relatedCaseIds: ["croup-treatment", "epiglottitis", "bronchiolitis", "foreign-body-aspiration", "neonatal-rds"],
  },

  {
    id: "pulm-pft",
    session: 2,
    category: "Pulmonary",
    title: "PFT Interpretation",
    summary: "FEV1/FVC + lung volumes + DLCO algorithm.",
    sections: [
      {
        heading: "Stepwise algorithm",
        bullets: [
          "Step 1: FEV1/FVC ratio. ≤0.7 = obstructive; >0.7 = restrictive",
          "Step 2 (obstructive): ↑TLC + ↑RV (air trapping). Test reversibility with albuterol",
          "Reversible (↑FEV1 ≥12%) = asthma",
          "Not reversible: ↓DLCO = emphysema; normal DLCO = chronic bronchitis",
          "Step 2 (restrictive): ↓TLC + ↓RV. Check DLCO",
          "↓DLCO = intrinsic (pulmonary fibrosis)",
          "Normal DLCO = extrinsic (obesity, chest wall, NMD)",
        ],
      },
    ],
    pearls: [
      "Methacholine challenge: ↓FEV1 ≥20% confirms asthma when reversibility test equivocal",
      "Severe asthma exacerbation + rising PCO₂ in hypoxic patient = ominous, anticipate respiratory failure",
    ],
  },

  {
    id: "asthma-copd",
    session: 2,
    category: "Pulmonary",
    title: "Asthma & COPD",
    summary: "Asthma reversibility, AERD, exacerbation tx; COPD progression, AAT.",
    sections: [
      {
        heading: "Asthma diagnosis",
        bullets: [
          "Obstructive PFTs with bronchodilator reversibility (↑FEV1 ≥12%)",
          "Methacholine challenge (↓FEV1 ≥20%) confirms if reversibility equivocal",
          "Episodic with symptom-free intervals",
        ],
      },
      {
        heading: "Asthma exacerbation management",
        bullets: [
          "Mild–moderate: SABA + ipratropium + oral prednisone × 5–7 d",
          "Severe (PEF <40%, accessory muscles, can't speak in sentences): continuous SABA + IV steroids + magnesium + O₂; consider IM epi",
          "Life-threatening (silent chest, exhaustion, AMS, rising CO₂): intubate",
          "Discharge criteria: PEF ≥70%, taught inhaler technique, action plan",
        ],
      },
      {
        heading: "Aspirin-exacerbated respiratory disease (Samter)",
        bullets: [
          "Asthma + nasal polyps + NSAID-induced bronchospasm",
          "COX-1 inhibition shunts to leukotrienes",
          "Avoid all NSAIDs; acetaminophen safe",
          "Leukotriene antagonists (montelukast)",
          "Aspirin desensitization for selected",
        ],
      },
      {
        heading: "COPD",
        bullets: [
          "Smoking cessation slows progression more than any drug",
          "Pulmonary rehab improves QoL when meds optimized",
          "Acute exacerbation + AMS + ↑PaCO₂ = hypercapnic respiratory acidosis (target SpO₂ 88–92%)",
        ],
      },
      {
        heading: "Alpha-1 antitrypsin deficiency",
        bullets: [
          "Young (<45) + progressive dyspnea + basilar emphysema + minimal smoking",
          "↓ AAT → unopposed neutrophil elastase",
          "Liver dysfunction (abnormal AAT accumulates in hepatocytes)",
          "Low serum AAT + genetic testing (PiZZ)",
          "Smoking cessation + AAT augmentation",
        ],
      },
      {
        heading: "Inhaler side effects",
        bullets: [
          "ICS → oral thrush, hoarseness (prevent with spacer + mouth rinse)",
          "Albuterol → tremor, tachycardia, hypokalemia",
        ],
      },
    ],
    relatedCaseIds: ["asthma-dx", "severe-asthma-exac", "aerd", "aat-deficiency", "asthma-exac"],
  },

  {
    id: "pneumonia",
    session: 2,
    category: "Infectious Disease",
    title: "Pneumonia & Mycobacterial Infections",
    summary: "CAP, atypicals, aspiration, lung abscess, empyema, TB.",
    sections: [
      {
        heading: "Community-acquired pneumonia",
        bullets: [
          "Typical: productive cough + fever + pleuritic pain + lobar infiltrate → S. pneumoniae",
          "Atypical (young + dry cough + pharyngitis + normal CXR): Mycoplasma → macrolide or doxycycline",
          "Recurrent same lobe → bronchial obstruction (tumor, FB)",
        ],
      },
      {
        heading: "Aspiration",
        bullets: [
          "Aspiration pneumonia (foul sputum + dependent lobe + alcoholic/stroke/dementia): ampicillin-sulbactam or clindamycin (anaerobes)",
          "Aspiration pneumonitis (vomiting + hypoxia, no fever): supportive care only",
          "Lung abscess: cavitary + air-fluid level → anaerobic coverage 4–6 weeks",
          "Empyema: pH<7.2, glucose<60, Gram stain+, purulent → CHEST TUBE + abx (drainage essential)",
        ],
      },
      {
        heading: "TB",
        bullets: [
          "PPD cutoffs: ≥5 (HIV, contacts, immunosuppressed), ≥10 (immigrants, HCW, CKD, DM, IVDU), ≥15 (low-risk)",
          "Latent: positive PPD + normal CXR → INH + B6 × 9 months (or rifapentine + INH × 12 wks)",
          "Active: hemoptysis + night sweats + apical cavitary lesions → isolate + RIPE",
          "RIPE: Rifampin, Isoniazid, Pyrazinamide, Ethambutol",
          "Confirm with sputum AFB smear + culture; NAAT for speed",
        ],
      },
      {
        heading: "Opportunistic infections",
        bullets: [
          "PJP (HIV CD4<200): bilateral interstitial + hypoxia → TMP-SMX + corticosteroids (if PaO₂ <70 or A-a >35); prophylaxis when CD4<200",
          "ABPA (asthma + brown sputum + ↑IgE + central bronchiectasis): systemic steroids + itraconazole if recurrent",
          "Aspergilloma (mobile fungal ball in old cavity): observe unless severe hemoptysis",
        ],
      },
    ],
    pearls: [
      "Stroke + dysphagia: prevent aspiration with HOB elevation, swallow eval, oral hygiene",
      "Post-sternotomy fever + chest pain + mediastinal widening = mediastinitis → urgent surgical debridement + IV abx",
    ],
    relatedCaseIds: ["lung-abscess", "empyema", "latent-tb", "active-tb", "pjp", "abpa"],
  },

  {
    id: "lung-other",
    session: 2,
    category: "Pulmonary",
    title: "Other Pulmonary Conditions",
    summary: "CO poisoning, ARDS, pulmonary contusion, IPF, PE, cor pulmonale.",
    sections: [
      {
        heading: "CO poisoning",
        bullets: [
          "Headache + confusion + enclosed space + NORMAL SpO₂ (CO binds Hb >200x more than O₂)",
          "Check carboxyhemoglobin level",
          "100% O₂ via non-rebreather",
          "Hyperbaric O₂ if pregnancy, neuro symptoms, COHb >25%",
        ],
      },
      {
        heading: "ARDS",
        bullets: [
          "Acute bilateral infiltrates + refractory hypoxemia + PaO₂/FiO₂ ≤300 + normal heart size",
          "Low tidal volume ventilation (~6 mL/kg PBW) — only strategy proven to improve mortality",
          "PEEP to prevent alveolar collapse",
          "Target SpO₂ 88–95% (avoid O₂ toxicity)",
          "Permissive hypercapnia tolerated",
          "Treat underlying (sepsis, etc.)",
        ],
      },
      {
        heading: "Ventilator adjustments",
        bullets: [
          "Oxygenation problem (↓PaO₂): ↑FiO₂ or ↑PEEP",
          "Ventilation problem (↑PaCO₂): ↑RR (do NOT increase TV in ARDS)",
          "ARDS rule: keep VT ~6 mL/kg",
        ],
      },
      {
        heading: "Other lung topics",
        bullets: [
          "Pulmonary contusion: blunt trauma + patchy alveolar opacities + hypoxia → supportive",
          "Atelectasis: post-op fever + hypoxemia without hypercapnia in first 48 hr → incentive spirometry",
          "TRALI: <6 hr post-transfusion + noncardiogenic edema → supportive (no diuretics); normal JVP",
          "TACO: <6 hr post-transfusion + cardiogenic edema + ↑JVP/HTN → diuretics",
          "Decompression sickness: after rapid scuba ascent + neuro/pulm sx → hyperbaric O₂",
          "PE: cancer + recent surgery + sudden dyspnea → CTPA",
          "Idiopathic pulmonary fibrosis: progressive dyspnea + dry cough + basilar peripheral honeycombing → pirfenidone, nintedanib",
          "Sarcoidosis: observe if asymptomatic; steroids if symptomatic or organ-threatening",
          "Asbestosis: pleural plaques + lower-lobe fibrosis → highest risk = bronchogenic CA (not mesothelioma)",
          "Pancoast tumor: smoker + apical mass + shoulder pain + Horner syndrome",
        ],
      },
      {
        heading: "Lung cancer screening",
        bullets: [
          "Low-dose CT annually (NOT CXR or sputum cytology)",
          "Age 50–80, ≥20 pack-years, current smoker or quit within 15 years (USPSTF 2021)",
          "Stop when age >80, ≥15 years since quitting, or life-expectancy-limiting illness",
          "Lung-RADS classification for nodule follow-up",
        ],
      },
      {
        heading: "Amiodarone toxicity",
        bullets: [
          "Lungs (pulmonary fibrosis/pneumonitis)",
          "Thyroid (hyper- or hypothyroidism)",
          "Liver",
          "Skin (blue-gray)",
          "Optic neuritis, corneal microdeposits",
          "Always get TFTs, PFTs, LFTs before starting",
        ],
      },
    ],
    relatedCaseIds: ["co-poisoning", "trali", "amiodarone-toxicity", "lung-cancer-screen", "ipf", "pancoast"],
  },

  {
    id: "breast-disease",
    session: 2,
    category: "Breast",
    title: "Breast Disease",
    summary: "Benign, malignant, lactation, age-based workup.",
    sections: [
      {
        heading: "Benign breast masses",
        bullets: [
          "Fibrocystic changes: cyclic pain + bilateral nodularity in premenopausal; 'blue-domed' cysts on aspiration; no cancer risk",
          "Fibroadenoma: solitary mobile rubbery painless mass in young women; most common benign tumor",
          "Intraductal papilloma: #1 cause of unilateral bloody nipple discharge; surgical excision",
          "Phyllodes tumor: large breast mass + 'leaf-like' projections histology",
          "Galactocele: milk-filled retention cyst in lactating women; aspiration",
          "Fat necrosis: post-trauma/surgery; can mimic malignancy on imaging",
        ],
      },
      {
        heading: "Infectious / inflammatory",
        bullets: [
          "Lactational mastitis: unilateral erythema + induration + fever; Staph aureus through nipple trauma",
          "Treat: dicloxacillin or cephalexin + continue breastfeeding/pumping",
          "Breast abscess: fluctuant mass — needs I&D or FNA + abx",
          "Inflammatory breast cancer: peau d'orange + rapid progression",
        ],
      },
      {
        heading: "Malignant",
        bullets: [
          "Peau d'orange → inflammatory breast cancer",
          "Eczematoid nipple lesion → Paget disease (associated DCIS/invasive)",
          "ER/PR positive → SERMs (tamoxifen) or aromatase inhibitors (anastrozole)",
          "HER2 positive → trastuzumab (reversible CM); doxorubicin (irreversible CM)",
          "Lymph node involvement is the MOST predictive prognostic factor",
          "Clustered pleomorphic microcalcifications on mammography = classic DCIS",
          "Chronic lymphedema (post-axillary dissection) → lymphangiosarcoma (purplish ulcer)",
        ],
      },
      {
        heading: "Diagnostic algorithm",
        bullets: [
          "Palpable mass + age <30 → ultrasound first (± mammogram)",
          "Palpable mass + age ≥30 → mammogram + ultrasound",
          "Negative mammogram + palpable mass → core needle biopsy",
          "US solid mass → core needle biopsy",
          "US cystic mass → FNA",
          "Bloody FNA fluid → cytology + core needle biopsy",
        ],
      },
      {
        heading: "Breast cancer in pregnancy",
        bullets: [
          "Core needle biopsy is gold standard; don't delay for pregnancy",
          "Avoid RT and chemo in first trimester",
          "Surgery typically in second trimester",
          "Mets sites: bone, liver, lungs, brain",
          "ER/PR positive: copper IUD for contraception (hormones contraindicated)",
        ],
      },
      {
        heading: "Lactation",
        bullets: [
          "Exclusively breastfed infants → vitamin D supplementation from day 1",
          "Preterm + breastfed → iron supplementation",
          "SSRIs and dicloxacillin generally safe",
          "Avoid combined OCPs for first 6 weeks postpartum (estrogen ↓ milk protein)",
        ],
      },
    ],
    relatedCaseIds: [],
  },

  {
    id: "gynecomastia",
    session: 2,
    category: "Endocrine",
    title: "Gynecomastia & Drug Side Effects",
    summary: "Spironolactone → switch to eplerenone.",
    sections: [
      {
        heading: "Pubertal gynecomastia",
        bullets: [
          "Common in boys 12–14",
          "Self-resolves in 1–2 years",
        ],
      },
      {
        heading: "Drug-induced gynecomastia",
        bullets: [
          "Spironolactone: antiandrogen effects → bilateral gynecomastia, ↓libido, ED",
          "Eplerenone is selective aldosterone receptor antagonist with minimal antiandrogen → switch when symptomatic",
          "Other causes: digoxin, ketoconazole, cimetidine, alcohol, marijuana, anabolic steroids",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SESSION 3 — ABDOMEN (GI)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "gi-bleeding",
    session: 3,
    category: "Gastroenterology",
    title: "GI Bleeding (Upper & Lower)",
    summary: "Resuscitate → EGD/colonoscopy; variceal bleed bundle.",
    sections: [
      {
        heading: "Upper vs Lower GI bleed",
        bullets: [
          "Upper (proximal to ligament of Treitz): hematemesis (bright red or coffee-ground) or melena",
          "Causes: PUD (esp. duodenal eroding into gastroduodenal artery), varices, Mallory-Weiss",
          "Gold standard diagnostic/therapeutic: EGD",
          "Lower (distal to Treitz): hematochezia (painless BRBPR)",
          "Causes: diverticulosis (#1 in older adults), angiodysplasia, CRC, IBD",
          "First-line: colonoscopy",
        ],
      },
      {
        heading: "Initial stabilization",
        bullets: [
          "Two large-bore IVs",
          "Isotonic crystalloids (NS or LR)",
          "Transfuse: Hgb <7 stable; lower threshold if ongoing hemorrhage/end-organ dysfunction",
          "Intubate if massive hematemesis or AMS for airway protection",
        ],
      },
      {
        heading: "Variceal hemorrhage bundle",
        bullets: [
          "Octreotide IV (↓splanchnic flow + portal pressure)",
          "Ceftriaxone IV (↓ SBP risk; improves mortality)",
          "Urgent EGD within 12 hr — band ligation or sclerotherapy",
          "Refractory: balloon tamponade (Sengstaken-Blakemore) as bridge → TIPS",
          "Prevention: nonselective BB (propranolol/nadolol) or EVL for newly diagnosed cirrhosis",
        ],
      },
      {
        heading: "Anorectal bleeding",
        bullets: [
          "Anal fissure: severe pain with defecation + BRBPR on TP; posterior midline; sitz baths + fiber + topical nifedipine/nitroglycerin",
          "Internal hemorrhoids: painless BRBPR (above pectinate line)",
          "External hemorrhoids: pain only if thrombosed",
        ],
      },
    ],
    relatedCaseIds: ["variceal-bleed-mgmt", "mallory-weiss", "anal-fissure", "hemorrhoids"],
  },

  {
    id: "esophageal",
    session: 3,
    category: "Gastroenterology",
    title: "Esophageal Disorders",
    summary: "GERD, Barrett, Zenker, achalasia, infectious, pill esophagitis.",
    sections: [
      {
        heading: "GERD",
        bullets: [
          "Substernal burning + regurgitation + worse after meals/lying down",
          "Without alarm features → empiric PPI 8 weeks + lifestyle",
          "Alarm features (weight loss, GI bleed, anemia, persistent vomiting, dysphagia, age >60) → endoscopy",
          "Risk factors for Barrett: chronic GERD + male + >50 + white + obesity + smoking + FH",
          "PPI doesn't eliminate Barrett cancer risk; surveillance still needed",
        ],
      },
      {
        heading: "Barrett surveillance",
        bullets: [
          "No dysplasia: EGD q3–5 years",
          "Low-grade dysplasia: EGD q6 months",
          "High-grade dysplasia: endoscopic eradication (RFA or EMR)",
          "Surgery (Nissen fundoplication) treats reflux but NOT cancer risk",
        ],
      },
      {
        heading: "Dysphagia differential",
        bullets: [
          "Oropharyngeal: cough, choke, nasal regurgitation; stroke/PD/ALS/MG → video swallow study (modified barium swallow)",
          "Esophageal mechanical (solids → liquids progression): EGD; cancer, stricture, ring",
          "Esophageal motility (solids + liquids together): achalasia, scleroderma, DES → barium swallow + manometry",
        ],
      },
      {
        heading: "Achalasia",
        bullets: [
          "Solids + liquids dysphagia at onset",
          "Degeneration of myenteric (Auerbach) plexus",
          "Impaired LES relaxation + absent peristalsis",
          "Barium: 'bird's beak'; manometry confirms; EGD to exclude pseudoachalasia",
          "Treatment: Heller myotomy, POEM, or pneumatic dilation; botox/CCB/nitrates if not surgical",
        ],
      },
      {
        heading: "Zenker diverticulum",
        bullets: [
          "Elderly + dysphagia + halitosis + regurg undigested food hours later + gurgling neck mass",
          "Outpouching at Killian triangle (cricopharyngeal)",
          "Barium swallow FIRST (do NOT scope first — perforation risk)",
          "Cricopharyngeal myotomy + diverticulectomy or endoscopic stapling",
        ],
      },
      {
        heading: "Infectious esophagitis (HIV)",
        bullets: [
          "Mild + thrush → empiric fluconazole",
          "Severe or no thrush → EGD with biopsy",
          "Candida: white plaques → fluconazole",
          "CMV: large linear distal ulcers → ganciclovir; owl's eye inclusions",
          "HSV: small punched-out (volcano) ulcers → acyclovir; multinucleated giant cells",
          "Aphthous: idiopathic → symptomatic",
        ],
      },
      {
        heading: "Pill esophagitis",
        bullets: [
          "Culprits: bisphosphonates, NSAIDs, tetracyclines, KCl, iron",
          "Take with full glass of water + upright 30 min",
          "Stop offending drug + PPI",
        ],
      },
      {
        heading: "Caustic ingestion",
        bullets: [
          "Alkali (drain cleaner): liquefactive necrosis → deep penetration",
          "Acid: coagulative; more stomach injury",
          "Never induce vomiting or give charcoal",
          "Emergent EGD within 12–24 hr to grade injury",
          "Long-term: stricture, squamous cell carcinoma years later",
        ],
      },
      {
        heading: "Mallory-Weiss vs Boerhaave",
        bullets: [
          "Mallory-Weiss: mucosal tear at GE junction from retching → often self-limits",
          "Boerhaave: transmural rupture → pneumomediastinum + subcutaneous emphysema → emergent surgery",
          "Confirm Boerhaave with water-soluble (gastrografin) contrast, NOT barium",
        ],
      },
    ],
    relatedCaseIds: ["gerd-empiric", "barretts-ld", "oropharyngeal-dysphagia", "achalasia", "zenker", "hiv-esophagitis", "pill-esophagitis", "caustic-ingestion", "mallory-weiss", "boerhaave"],
  },

  {
    id: "pud-h-pylori",
    session: 3,
    category: "Gastroenterology",
    title: "Peptic Ulcer Disease & H. pylori",
    summary: "Testing pathway + quadruple therapy + confirmation.",
    sections: [
      {
        heading: "Presentation",
        bullets: [
          "Duodenal ulcer: epigastric pain 2–3 hr after meals + at night, IMPROVES with eating; H. pylori most common cause",
          "Gastric ulcer: pain WORSENS with food; weight loss common",
          "Relief with antacids",
          "Melena = upper GI bleed",
        ],
      },
      {
        heading: "Workup by age and alarms",
        bullets: [
          "Age <60 + no alarms → noninvasive H. pylori testing (urea breath or stool antigen)",
          "Age ≥60 or alarms (weight loss, bleeding, anemia, dysphagia, vomiting, FH upper GI ca) → EGD",
          "Serology positive lifelong; not useful for confirmation",
        ],
      },
      {
        heading: "H. pylori treatment",
        bullets: [
          "Quadruple therapy: PPI + bismuth + tetracycline + metronidazole (or tinidazole)",
          "Old triple: PPI + clarithromycin + amoxicillin (now less preferred due to clarithromycin resistance)",
          "Penicillin allergy → substitute amoxicillin with metronidazole",
        ],
      },
      {
        heading: "Eradication confirmation",
        bullets: [
          "Required for all treated patients",
          "Urea breath test OR stool antigen (active infection markers)",
          "Off PPI ≥2 weeks; off antibiotics/bismuth ≥4 weeks",
          "Serology does NOT distinguish past from active infection",
          "If positive after first-line: rescue therapy with different combination",
        ],
      },
      {
        heading: "Other PUD complications",
        bullets: [
          "Perforation: sudden severe pain + rigid abdomen + free air under diaphragm on upright CXR → emergent surgery",
          "Gastric outlet obstruction (chronic duodenal scarring): succussion splash + vomiting undigested food",
          "Hemorrhage from gastroduodenal artery erosion",
        ],
      },
      {
        heading: "Other gastric inflammatory conditions",
        bullets: [
          "Autoimmune (type A): antibodies vs parietal cells → loss of IF → B12 deficiency + ↑gastrin",
          "Iron pill gastritis: epigastric pain + black stools → switch to IV iron",
          "MALT lymphoma: H. pylori-associated; may resolve with antibiotic eradication",
        ],
      },
      {
        heading: "Gastroparesis",
        bullets: [
          "Diabetic autonomic neuropathy most common",
          "Early satiety + nausea + bloating + vomiting undigested food hours later",
          "Gastric emptying study confirms",
          "Metoclopramide or erythromycin (prokinetics)",
          "Tight glycemic control; small frequent low-fat low-fiber meals",
        ],
      },
    ],
    relatedCaseIds: ["h-pylori-testing-young", "h-pylori-confirmation", "duodenal-ulcer-pud", "perforated-ulcer", "diabetic-gastroparesis"],
  },

  {
    id: "drug-induced-gi",
    session: 3,
    category: "Gastroenterology",
    title: "Drug-Induced GI Disease",
    summary: "Constipation, ulcer/perf, hepatitis, pancreatitis, esophagitis.",
    sections: [
      {
        heading: "Motility changes",
        bullets: [
          "Opioids → constipation. Tx: osmotic laxatives (PEG), cathartics (Mg citrate), softeners (docusate)",
          "Anticholinergics (diphenhydramine, oxybutynin, amitriptyline) → constipation, fecal impaction",
          "Chronic laxative abuse (eating disorders) → hypoK + arrhythmias",
        ],
      },
      {
        heading: "NSAID/aspirin GI injury",
        bullets: [
          "Inhibit prostaglandin → loss of mucosal barrier",
          "Gastritis, PUD, perforation",
          "Painless diverticular hemorrhage in elderly",
        ],
      },
      {
        heading: "Drug-induced hepatitis",
        bullets: [
          "Acetaminophen overdose → centrilobular necrosis → N-acetylcysteine",
          "Isoniazid → ↑AST/ALT without ↑bilirubin; also B6 deficiency",
          "Valproic acid → hyperammonemia + hepatotoxicity",
        ],
      },
      {
        heading: "Drug-induced pancreatitis (I GET SMASHED)",
        bullets: [
          "Thiazides, loop diuretics, sulfa, valproate, azathioprine, didanosine",
        ],
      },
      {
        heading: "Pill esophagitis culprits",
        bullets: [
          "NSAIDs, tetracyclines, bisphosphonates, KCl, iron",
        ],
      },
    ],
  },

  {
    id: "pancreatitis-full",
    session: 3,
    category: "Gastroenterology",
    title: "Acute & Chronic Pancreatitis",
    summary: "I GET SMASHED + LR > NS + complications.",
    sections: [
      {
        heading: "Etiology (I GET SMASHED)",
        bullets: [
          "Idiopathic, Gallstones, ETOH, Trauma, Steroids, Mumps, Autoimmune, Scorpion, Hypercalcemia/hypertriglyceridemia, ERCP, Drugs",
        ],
      },
      {
        heading: "Diagnosis (2 of 3)",
        bullets: [
          "Epigastric pain radiating to back",
          "Lipase/amylase >3× ULN",
          "Characteristic imaging (CT)",
        ],
      },
      {
        heading: "Management",
        bullets: [
          "Aggressive IV LR (preferred over NS) + pain control + bowel rest",
          "Early oral nutrition once tolerated (don't routinely fast)",
          "Antibiotics ONLY for infected necrosis",
          "ERCP only if gallstone with obstruction or cholangitis",
          "Severe hyperTG → insulin infusion or plasmapheresis",
        ],
      },
      {
        heading: "Complications",
        bullets: [
          "Acute peripancreatic fluid collection (<4 weeks)",
          "Pancreatic pseudocyst: fluid collection with fibrous wall ≥4 weeks; asymptomatic + <6 cm → observe; symptomatic/large → endoscopic drainage",
          "Walled-off necrosis: similar but with necrotic debris",
          "Pancreatic abscess: fluid + leukocytosis + fever",
          "Recurrent pancreatitis without alcohol/gallstones → check triglycerides",
        ],
      },
    ],
    relatedCaseIds: ["pancreatitis-mgmt", "pancreatic-pseudocyst"],
  },

  {
    id: "hepatitis-cirrhosis",
    session: 3,
    category: "Gastroenterology",
    title: "Hepatitis & Cirrhosis",
    summary: "Hep A/B/C + alcoholic hepatitis + complications.",
    sections: [
      {
        heading: "Hepatitis A & E",
        bullets: [
          "Fecal-oral, acute, self-limited",
          "HEV: fulminant in pregnancy",
          "HAV IgM = acute; IgG = past or vaccinated",
          "Post-exposure: vaccine ± immune globulin",
        ],
      },
      {
        heading: "Hepatitis B",
        bullets: [
          "HBsAg + for >6 months = chronic",
          "Treat: tenofovir or entecavir (oral antivirals)",
          "Long-term complications: cirrhosis, HCC (HBV can cause HCC WITHOUT cirrhosis via viral DNA integration)",
          "HCC surveillance: US ± AFP q6 months",
          "Vaccinated immune: anti-HBs+, anti-HBc-",
          "Past infection: anti-HBs+, anti-HBc+, HBsAg-",
        ],
      },
      {
        heading: "Hepatitis B PEP after needlestick",
        bullets: [
          "Documented immune (anti-HBs ≥10) → no PEP",
          "Unvaccinated or non-responder → HBIG + start vaccine series",
        ],
      },
      {
        heading: "Hepatitis C",
        bullets: [
          "Chronic + HCV RNA positive",
          "Direct-acting antivirals (sofosbuvir/velpatasvir): >95% cure",
          "8–12 weeks treatment",
          "Universal adult screening at least once",
          "HCV + heavy alcohol → markedly accelerated cirrhosis; alcohol cessation slows progression",
          "HCC surveillance if cirrhosis even after cure",
          "Mixed cryoglobulinemia: HCV + palpable purpura + arthralgias + weakness ± neuropathy/GN",
        ],
      },
      {
        heading: "Alcoholic hepatitis",
        bullets: [
          "AST/ALT >2:1 with both <500",
          "Maddrey DF ≥32 or MELD ≥21 = severe",
          "Prednisolone 28 days (check Lille score day 7)",
          "Abstinence is critical",
          "N-acetylcysteine may be added",
        ],
      },
      {
        heading: "Cirrhosis complications",
        bullets: [
          "Hepatic encephalopathy: identify trigger (GI bleed, infection, electrolytes, constipation), lactulose, rifaximin; AVOID benzos/opioids",
          "SBP: ascitic PMN ≥250 → ceftriaxone + IV albumin (↓HRS); prophylaxis with ciprofloxacin after first episode",
          "Ascites: diet, spironolactone + furosemide, paracentesis with albumin if large volume",
          "Variceal bleed (see bundle)",
          "HCC surveillance",
        ],
      },
      {
        heading: "HCC surveillance criteria",
        bullets: [
          "All cirrhotic patients regardless of cause",
          "Chronic HBV without cirrhosis: Asian male >40, Asian female >50, African >20, FH HCC",
          "US ± AFP q6 months",
          "AFP >400 highly suggestive",
        ],
      },
    ],
    relatedCaseIds: ["hepatitis-a", "chronic-hbv", "hep-c-treatment", "alcoholic-hepatitis", "hepatic-encephalopathy", "sbp", "hcc-surveillance"],
  },

  {
    id: "metabolic-liver",
    session: 3,
    category: "Gastroenterology",
    title: "Metabolic & Autoimmune Liver Disease",
    summary: "Wilson, hemochromatosis, PBC, PSC.",
    sections: [
      {
        heading: "Wilson disease",
        bullets: [
          "Autosomal recessive ATP7B mutation → impaired copper excretion",
          "Hepatitis + neuropsychiatric (tremor, dystonia, mood) + Kayser-Fleischer rings",
          "Low ceruloplasmin + high 24-hr urine copper",
          "Treat: penicillamine or trientine + zinc",
          "Liver transplant for fulminant or end-stage",
        ],
      },
      {
        heading: "Hereditary hemochromatosis",
        bullets: [
          "HFE C282Y mutation (autosomal recessive)",
          "Bronze diabetes: bronze skin + DM + cirrhosis + arthralgias + cardiomyopathy",
          "Transferrin saturation >45% + ferritin >300 (M) or >200 (F)",
          "Confirm with genetic testing",
          "Treat: therapeutic phlebotomy",
        ],
      },
      {
        heading: "Primary biliary cholangitis (PBC)",
        bullets: [
          "Middle-aged women",
          "Fatigue + pruritus + jaundice + ↑alk phos + ↑IgM",
          "Anti-mitochondrial antibody (AMA) is hallmark",
          "Treat: ursodeoxycholic acid (UDCA); obeticholic acid if refractory",
          "Cholestyramine for pruritus",
        ],
      },
      {
        heading: "Primary sclerosing cholangitis (PSC)",
        bullets: [
          "Young men with UC",
          "MRCP: beaded biliary strictures",
          "p-ANCA may be positive",
          "Risk of cholangiocarcinoma + colon cancer (do CRC surveillance)",
          "Liver transplant for end-stage",
        ],
      },
    ],
    relatedCaseIds: ["wilson-disease", "hemochromatosis", "primary-biliary-cholangitis", "psc"],
  },

  {
    id: "ibd",
    session: 3,
    category: "Gastroenterology",
    title: "Inflammatory Bowel Disease",
    summary: "Crohn vs UC + escalation therapy + toxic megacolon.",
    tables: [
      {
        headers: ["Feature", "Crohn disease", "Ulcerative colitis"],
        rows: [
          ["Location", "Mouth to anus, skip lesions", "Continuous, rectum + colon only"],
          ["Inflammation", "Transmural", "Mucosa/submucosa only"],
          ["Complications", "Fistulas, strictures, granulomas", "Toxic megacolon, colorectal cancer"],
          ["Smoking", "WORSENS", "Protective"],
          ["B12 deficiency", "Yes (terminal ileum)", "No"],
          ["Bleeding", "Less common", "Bloody diarrhea common"],
        ],
      },
    ],
    sections: [
      {
        heading: "UC escalation",
        bullets: [
          "Mild-moderate: 5-ASA (mesalamine)",
          "Moderate-severe: corticosteroids for flares + immunomodulators (azathioprine, 6-MP)",
          "Severe flare or steroid-refractory: IV corticosteroids → infliximab or cyclosporine",
          "Colectomy if toxic megacolon, perforation, refractory",
          "Surveillance colonoscopy q1–3 yr starting 8 years after dx",
        ],
      },
      {
        heading: "Crohn escalation",
        bullets: [
          "Mild: 5-ASA (mesalamine — safe in sulfa allergy unlike sulfasalazine)",
          "Moderate: immunomodulators (azathioprine, 6-MP, methotrexate)",
          "Severe: anti-TNF (infliximab, adalimumab)",
          "Steroids for flares, NOT maintenance",
        ],
      },
      {
        heading: "Toxic megacolon",
        bullets: [
          "Colon diameter >6 cm + systemic toxicity",
          "Causes: UC, Crohn, C. diff",
          "AVOID anti-motility agents and opioids",
          "Bowel rest, IVF, broad-spectrum abx, IV steroids (NOT in C. diff alone)",
          "C. diff-associated: oral vancomycin ± IV metronidazole",
          "Colectomy if no improvement 24–72 hr or perforation",
        ],
      },
      {
        heading: "C. difficile",
        bullets: [
          "After abx (clindamycin, fluoroquinolones, cephalosporins)",
          "Stool PCR/NAAT for toxin",
          "First-line: oral vancomycin OR fidaxomicin (metronidazole no longer first-line)",
          "Severe: oral vanc + IV metronidazole",
          "Recurrent: fecal microbiota transplant",
        ],
      },
    ],
    relatedCaseIds: ["crohn-vs-uc", "toxic-megacolon", "c-difficile"],
  },

  {
    id: "ibs-other-gi",
    session: 3,
    category: "Gastroenterology",
    title: "IBS, Celiac, Whipple, Lactose",
    summary: "Functional vs malabsorption.",
    sections: [
      {
        heading: "IBS (Rome IV)",
        bullets: [
          "Recurrent abdominal pain ≥1 day/week for 3 months + ≥2 of: relief with defecation, change in stool frequency, change in form",
          "Red flags (require workup): weight loss, anemia, GI bleed, nocturnal symptoms, age >50, FH CRC/IBD",
          "Treatment: fiber, low FODMAP, antispasmodics; linaclotide/lubiprostone for constipation; loperamide for diarrhea",
        ],
      },
      {
        heading: "Celiac disease",
        bullets: [
          "Chronic diarrhea + weight loss + bloating after gluten",
          "First test: anti-tissue transglutaminase IgA + TOTAL IgA (rule out IgA deficiency)",
          "Iron deficiency anemia common; dermatitis herpetiformis association",
          "DO NOT start gluten-free diet before testing",
          "Confirm: duodenal biopsy → villous atrophy + crypt hyperplasia + ↑IELs",
          "Strict lifelong gluten-free diet",
        ],
      },
      {
        heading: "Whipple disease",
        bullets: [
          "Tropheryma whipplei (gram positive)",
          "Triad: diarrhea + arthralgia + neurologic symptoms (middle-aged man)",
          "May have hyperpigmentation, lymphadenopathy",
          "Small bowel biopsy: PAS-positive foamy macrophages",
          "IV ceftriaxone × 2 weeks → PO TMP-SMX × 1 year",
          "Fatal if untreated",
        ],
      },
      {
        heading: "Lactose intolerance",
        bullets: [
          "Often after viral gastroenteritis → temporary lactase deficiency",
          "Osmotic diarrhea after lactose ingestion",
          "Lactose-free formula or lactase enzyme supplementation",
          "Usually self-limited",
        ],
      },
    ],
    relatedCaseIds: ["ibs-vs-ibd", "celiac", "whipple-disease"],
  },

  {
    id: "obstruction-ileus-volvulus",
    session: 3,
    category: "Gastroenterology",
    title: "Bowel Obstruction, Ileus, Volvulus, Hernia",
    summary: "SBO vs ileus vs sigmoid volvulus.",
    sections: [
      {
        heading: "SBO",
        bullets: [
          "Most common cause: ADHESIONS from prior surgery",
          "Other: hernias (incarcerated/strangulated), malignancy, IBD strictures, intussusception",
          "Vomiting + distention + obstipation; early hyperactive bowel sounds, late hypoactive",
          "KUB: multiple air-fluid levels + dilated small bowel loops",
          "Initial: NPO + NG decompression + IVF + serial exams",
          "Strangulation/closed-loop: emergent surgery",
        ],
      },
      {
        heading: "Ileus",
        bullets: [
          "Diffuse gas without transition point",
          "Post-op, opioids, electrolyte abnormalities",
          "Treat: NPO, NG, electrolyte correction, ambulation, minimize opioids",
          "Alvimopan may help",
        ],
      },
      {
        heading: "Sigmoid volvulus",
        bullets: [
          "Elderly, institutionalized, chronic constipation",
          "'Coffee bean' sign on X-ray = twisted sigmoid",
          "Without peritonitis: endoscopic detorsion (flexible sigmoidoscopy)",
          "With perforation/ischemia/recurrent: surgical resection",
        ],
      },
      {
        heading: "Incarcerated/strangulated hernia",
        bullets: [
          "Tender nonreducible groin mass + obstruction symptoms",
          "Immediate surgical exploration (don't delay for imaging)",
        ],
      },
      {
        heading: "Subphrenic abscess",
        bullets: [
          "Postoperative day 5–10 + fever + LEFT-sided pleural effusion (after splenic surgery)",
          "CT abdomen → percutaneous drainage + IV abx",
        ],
      },
    ],
    relatedCaseIds: ["sbo", "ileus-vs-obstruction"],
  },

  {
    id: "biliary",
    session: 3,
    category: "Gastroenterology",
    title: "Biliary Disease",
    summary: "Cholecystitis, choledocholithiasis, cholangitis, Mirizzi, gallstone ileus.",
    tables: [
      {
        headers: ["Condition", "Presentation", "Diagnosis", "Management"],
        rows: [
          ["Biliary colic", "RUQ pain radiating to scapula, fatty meal trigger, resolves hours", "RUQ US → stones", "Analgesia + elective lap cholecystectomy"],
          ["Acute cholecystitis", "Constant RUQ pain + fever + leukocytosis + Murphy", "RUQ US (wall thickening, pericholecystic fluid); HIDA if equivocal", "NPO, IV fluids, IV abx (piperacillin-tazobactam), cholecystectomy <72 hr"],
          ["Choledocholithiasis", "RUQ/epigastric + jaundice; cholestatic LFTs (↑direct bili, ↑ALP, ↑GGT)", "US: dilated CBD; MRCP", "ERCP stone extraction → cholecystectomy"],
          ["Acute cholangitis", "Charcot triad (RUQ pain + jaundice + fever); Reynolds pentad adds AMS + hypotension", "Leukocytosis + cholestasis; ERCP diagnostic + therapeutic", "IV fluids + abx → urgent ERCP biliary decompression"],
          ["Mirizzi syndrome", "Stone in cystic duct compresses common hepatic duct → obstructive jaundice", "MRCP shows extrinsic compression", "ERCP or surgery to relieve obstruction"],
          ["Gallstone ileus", "Large stone erodes through fistula → SBO; elderly women", "Pneumobilia + SBO on imaging", "Enterolithotomy + fistula repair"],
        ],
      },
    ],
    pearls: [
      "Hereditary spherocytosis → splenectomy prevents pigment gallstones",
      "Hemobilia: upper GI bleed + RUQ pain + jaundice after ERCP",
    ],
    relatedCaseIds: ["acute-cholecystitis", "choledocholithiasis-cholangitis"],
  },

  {
    id: "appendicitis-diverticulitis",
    session: 3,
    category: "Emergency",
    title: "Appendicitis & Diverticular Disease",
    summary: "Imaging by age/pregnancy + treatment.",
    sections: [
      {
        heading: "Appendicitis",
        bullets: [
          "Periumbilical pain migrating to RLQ + fever + anorexia + rebound at McBurney point",
          "Adult: CT abdomen/pelvis with contrast",
          "Child/pregnant: US first; MRI if non-diagnostic",
          "Lap appendectomy + perioperative abx",
          "Perforated with abscess (symptoms >5 days): IV abx + PCD → interval appendectomy 6–8 weeks",
          "Diffuse contamination/peritonitis: immediate surgery",
          "Pregnant + peritonitis: don't delay for imaging — proceed to surgery",
        ],
      },
      {
        heading: "Acute diverticulitis",
        bullets: [
          "Older adult + LLQ pain + low-grade fever + leukocytosis",
          "CT: pericolic fat stranding, diverticula",
          "Uncomplicated: outpatient PO abx (cipro+metro or amox-clav) + clear liquids 7–10 days",
          "Complicated (abscess, perforation, fistula, obstruction): admit ± drainage ± surgery",
          "Colonoscopy 6–8 weeks AFTER acute episode resolves to rule out malignancy",
        ],
      },
      {
        heading: "Diverticular complications",
        bullets: [
          "Colovesical fistula: pneumaturia + recurrent UTIs → CT with contrast; cystoscopy; surgical repair after infection control",
          "Diverticular hemorrhage: painless BRBPR in elderly (chronic NSAIDs)",
        ],
      },
    ],
    relatedCaseIds: ["appendicitis-mgmt", "diverticulitis"],
  },

  {
    id: "ischemia-vascular-gi",
    session: 3,
    category: "Gastroenterology",
    title: "Ischemic Colitis & Acute Mesenteric Ischemia",
    summary: "Watershed vs embolic.",
    sections: [
      {
        heading: "Ischemic colitis (watershed)",
        bullets: [
          "Recent hypotension or AAA repair + LLQ crampy pain + hematochezia",
          "Watershed areas: splenic flexure (SMA/IMA) and rectosigmoid (IMA/hypogastric)",
          "CT: bowel wall thickening, thumbprinting",
          "Colonoscopy: pale, edematous, friable mucosa ± ulceration",
          "Supportive care + bowel rest + IV fluids; abx if moderate-severe",
        ],
      },
      {
        heading: "Acute mesenteric ischemia (SMA embolus)",
        bullets: [
          "AFib + severe abd pain out of proportion to exam + metabolic acidosis",
          "CT angiography immediately",
          "Emergent surgical embolectomy ± resection of necrotic bowel",
        ],
      },
    ],
  },

  {
    id: "anorectal-overflow",
    session: 3,
    category: "Gastroenterology",
    title: "Anorectal Disorders",
    summary: "Fissure, hemorrhoids, abscess, fecal impaction.",
    sections: [
      {
        heading: "Anal fissure",
        bullets: [
          "Severe pain with defecation + BRBPR on TP",
          "Posterior midline most common",
          "Atypical location: consider Crohn, HIV, malignancy",
          "Conservative: fiber, hydration, sitz baths, topical CCB (nifedipine) or nitroglycerin",
          "Botulinum or sphincterotomy if chronic",
        ],
      },
      {
        heading: "Internal hemorrhoids",
        bullets: [
          "Painless BRBPR during/after BM (above pectinate line, visceral innervation)",
          "Conservative: high-fiber + fluids + sitz baths + topical care",
          "Persistent → rubber band ligation",
          "Refractory/grade IV → surgical excision",
          "Always exclude cancer in older patients with red flags → colonoscopy",
        ],
      },
      {
        heading: "External hemorrhoids",
        bullets: [
          "Pain only if thrombosed",
          "Perianal abscess: tender fluctuant + fever → I&D",
        ],
      },
      {
        heading: "Fecal impaction (with overflow diarrhea)",
        bullets: [
          "Elderly on opioids + 5 days no BM + leakage of loose stool + hard stool on rectal exam",
          "Enema or manual disimpaction",
          "Then bowel regimen + reduce opioids",
        ],
      },
    ],
    relatedCaseIds: ["anal-fissure", "hemorrhoids"],
  },

  {
    id: "gi-pediatrics",
    session: 3,
    category: "Pediatrics",
    title: "Pediatric GI",
    summary: "Pyloric stenosis, intussusception, Hirschsprung, NEC, malrotation.",
    sections: [
      {
        heading: "Pyloric stenosis",
        bullets: [
          "First-born males, 3–6 weeks of age",
          "Projectile non-bilious vomiting + olive-shaped epigastric mass",
          "Hypochloremic hypokalemic metabolic alkalosis",
          "US: pyloric muscle >4 mm thick",
          "Fluid + electrolyte correction FIRST, then Ramstedt pyloromyotomy",
        ],
      },
      {
        heading: "Intussusception",
        bullets: [
          "Toddler (6 mo–2 yr) + intermittent severe crampy pain + currant jelly stools + sausage mass",
          "US: target/donut sign",
          "Air or contrast enema = diagnostic AND therapeutic",
          "Surgery if enema fails or perforation",
        ],
      },
      {
        heading: "Hirschsprung",
        bullets: [
          "Failure of neural crest migration → absent ganglion cells",
          "Delayed meconium >48 h + abdominal distention + forceful stool on rectal exam",
          "Risk: Down syndrome",
          "Diagnose: rectal suction biopsy",
          "Surgical pull-through",
        ],
      },
      {
        heading: "NEC",
        bullets: [
          "Premature (esp. <32 wk) + feeding intolerance + bloody stools + distention",
          "KUB: pneumatosis intestinalis (air in bowel wall)",
          "NPO + NG decompression + IVF + broad-spectrum abx",
          "Surgery for perforation or refractory",
        ],
      },
      {
        heading: "Malrotation with midgut volvulus",
        bullets: [
          "Bilious emesis in neonate = SURGICAL EMERGENCY",
          "Upper GI series: corkscrew + right-sided ligament of Treitz",
          "Bowel ischemia within hours",
          "Emergent Ladd procedure",
        ],
      },
      {
        heading: "Duodenal atresia",
        bullets: [
          "Double bubble sign on KUB",
          "Association with Down syndrome",
        ],
      },
      {
        heading: "Umbilical hernia (toddler)",
        bullets: [
          "Soft + reducible + <5 yr + <1.5 cm → observe (most close by 3–5 yr)",
          "Repair if persistent >5 yr, incarceration, or ≥1.5 cm",
        ],
      },
      {
        heading: "Infantile hemangioma",
        bullets: [
          "Most resolve spontaneously → observe",
          "If large, ulcerated, vision-threatening → propranolol",
        ],
      },
    ],
    relatedCaseIds: ["intussusception", "pyloric-stenosis", "hirschsprung", "nec", "intussusception-vs-volvulus"],
  },

  {
    id: "gi-cancer-screen",
    session: 3,
    category: "Oncology",
    title: "GI Cancer Screening & Management",
    summary: "CRC screening, pancreatic CA, GIST, carcinoid.",
    sections: [
      {
        heading: "Colorectal cancer screening",
        bullets: [
          "Average risk: start at 45 (USPSTF 2021, lowered from 50)",
          "Options: colonoscopy q10y, FIT annually, sigmoidoscopy q5y + FIT q3y, Cologuard (multi-target stool DNA) q3y",
          "FHx CRC in first-degree relative <60: start at 40 OR 10 years before relative's dx (whichever earlier); repeat q5 yr",
          "Lynch syndrome: colonoscopy q1–2y starting age 20–25",
          "Stop at age 75 if life-expectancy limited",
        ],
      },
      {
        heading: "Symptomatic CRC",
        bullets: [
          "Age >50 + weight loss + iron deficiency anemia + change in bowel habits = colonoscopy (NOT FOBT — that's screening)",
          "Confirmed CRC → CT abdomen/pelvis for staging",
          "Liver mets of unknown primary → consider colorectal source",
        ],
      },
      {
        heading: "Pancreatic adenocarcinoma",
        bullets: [
          "Painless jaundice + weight loss + pruritus + Courvoisier sign (palpable nontender gallbladder)",
          "Risk: smoking, chronic pancreatitis, age, family history, BRCA",
          "US first if unclear biliary obstruction; CT if high suspicion for pancreatic cancer",
          "Imaging: dilated CBD + pancreatic duct ('double duct sign')",
          "EUS with biopsy for tissue diagnosis",
          "CA 19-9 elevated (not diagnostic alone)",
          "Whipple if resectable; chemo if not",
        ],
      },
      {
        heading: "GIST",
        bullets: [
          "Most common mesenchymal GI tumor",
          "From interstitial cells of Cajal",
          "CD117 (c-KIT) positive on biopsy",
          "Imatinib for metastatic; localized → surgical resection",
          "Size + mitotic index predict recurrence",
        ],
      },
      {
        heading: "Carcinoid syndrome",
        bullets: [
          "Serotonin-secreting NET with hepatic mets",
          "Flushing, diarrhea, bronchospasm, right-heart valvular disease (TR, PS)",
          "24-hr urine 5-HIAA elevated",
          "Localize: CT, octreotide scan",
          "Treat: octreotide; surgical resection",
        ],
      },
      {
        heading: "Gastric adenocarcinoma",
        bullets: [
          "Endoscopy + biopsy positive → CT abd/pelvis → PET/CT + EUS + CT chest + laparoscopy",
          "Limited stage: surgical resection ± perioperative chemo (FLOT)",
          "Advanced: systemic chemo ± immunotherapy + palliative",
        ],
      },
      {
        heading: "Gastrinoma (ZES)",
        bullets: [
          "Multiple stomach ulcers + thickened gastric folds",
          "Stop PPI 1 week → check serum gastrin",
          "<110 = not gastrinoma; >1000 = check gastric pH off PPI; 110–1000 = secretin stimulation test (paradoxical rise >120 = positive)",
          "Localize: somatostatin receptor scintigraphy or EUS",
          "Surgical resection if possible; MEN-1 association",
        ],
      },
    ],
    relatedCaseIds: ["colon-cancer-screen", "pancreatic-cancer", "gist", "carcinoid-syndrome", "gastric-ca-staging", "gastrinoma"],
  },

  {
    id: "renal-electrolytes",
    session: 1,
    category: "Renal",
    title: "Key Electrolyte Emergencies",
    summary: "Hyperkalemia, hypocalcemia, lithium-induced DI.",
    sections: [
      {
        heading: "Hyperkalemia",
        bullets: [
          "Tall peaked T waves → wide QRS → sine wave on ECG",
          "Step 1: IV calcium gluconate (stabilize myocardium)",
          "Step 2: insulin + glucose, albuterol (shift K into cells)",
          "Step 3: loop diuretic, kayexalate/patiromer, dialysis (remove K)",
          "Stop offending drugs (spironolactone, ACEi, NSAIDs)",
        ],
      },
      {
        heading: "Lithium-induced nephrogenic DI",
        bullets: [
          "Chronic lithium causes nephrogenic DI",
          "Stop lithium if possible",
          "Amiloride blocks lithium uptake into collecting duct",
        ],
      },
    ],
    relatedCaseIds: ["hyperkalemia-treatment"],
  },

  {
    id: "post-exposure-prophylaxis",
    session: 3,
    category: "Infectious Disease",
    title: "HBV Post-Exposure Prophylaxis",
    summary: "Documented immunity → no PEP needed.",
    sections: [
      {
        heading: "HCW after needlestick",
        bullets: [
          "Anti-HBs ≥10 IU/mL = documented immunity → NO PEP",
          "Unvaccinated → HBIG + start hepatitis B vaccine series",
          "Documented non-responder (received vaccine but anti-HBs <10) → HBIG + revaccinate",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // EXPANDED NOTES — Immunodeficiencies, Peds, STDs, Vector, Fungi,
  // Vasculitides, Renal, Adrenal
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "primary-immunodeficiencies",
    session: 1,
    category: "Immunology",
    title: "Primary Immunodeficiencies",
    summary: "B-cell, T-cell, combined, phagocyte, and complement defects — recognize by pattern of infection.",
    sections: [
      {
        heading: "B-cell defects (encapsulated bacteria + giardia + enterovirus)",
        bullets: [
          "Bruton X-linked agammaglobulinemia: boys >6 mo (after maternal IgG wanes); recurrent sinopulmonary infections; absent B cells + all immunoglobulins low; absent lymphoid tissue (no tonsils); BTK mutation. Tx: IVIG monthly",
          "Selective IgA deficiency: MOST COMMON primary immunodeficiency; often asymptomatic; sinopulmonary + GI (Giardia); anaphylaxis with IgA-containing blood products (use washed PRBCs)",
          "Common variable immunodeficiency (CVID): adult onset (15–35); ↓ IgG ± IgA/IgM; recurrent infections, autoimmune disease, lymphoma; replace IgG",
          "Hyper-IgM syndrome (CD40L deficiency, X-linked): ↑IgM + ↓ other isotypes; PJP, Cryptosporidium (intractable diarrhea)",
        ],
      },
      {
        heading: "T-cell / combined (viruses, fungi, opportunistic)",
        bullets: [
          "DiGeorge (22q11.2 deletion): CATCH-22 — Cardiac (truncus arteriosus, TOF), Abnormal facies, Thymic aplasia (T-cell deficiency), Cleft palate, Hypocalcemia (parathyroid agenesis)",
          "SCID: 'bubble boy'; absent T cells (± B cells); recurrent severe infections in first months; thrush, chronic diarrhea, FTT; bone marrow transplant curative",
          "Wiskott-Aldrich (WATER / WAITER): X-linked; Wiskott = thrombocytopenia + Eczema + Recurrent infections; ↑IgE/IgA, ↓IgM; risk of lymphoma; WAS gene",
          "Ataxia-telangiectasia: cerebellar ataxia + spider angiomas + ↑AFP + IgA deficiency; ATM gene (DNA repair); ↑lymphoma risk",
          "Hyper-IgE (Job syndrome): coarse facies + cold abscesses + retained primary teeth + eczema + ↑↑IgE + eosinophilia; STAT3 mutation",
          "Chronic mucocutaneous candidiasis: T-cell dysfunction → recurrent Candida of skin/mucosa",
        ],
      },
      {
        heading: "Phagocyte defects (catalase+ organisms, skin/abscess infections)",
        bullets: [
          "Chronic granulomatous disease (CGD): X-linked NADPH oxidase deficiency; recurrent infections with CATALASE+ organisms (Staph, Burkholderia, Serratia, Nocardia, Aspergillus); abnormal dihydrorhodamine flow test (replaces nitroblue tetrazolium)",
          "Chediak-Higashi: AR; giant granules in neutrophils + albinism + peripheral neuropathy + recurrent pyogenic infections (Staph, Strep); LYST gene",
          "Leukocyte adhesion deficiency (LAD-1): delayed umbilical cord separation (>30 days) + recurrent skin/mucosal infections WITHOUT pus + ↑↑neutrophils; CD18/integrin deficient",
        ],
      },
      {
        heading: "Complement deficiencies",
        bullets: [
          "C5–C9 (terminal/MAC): recurrent Neisseria (gonorrhea, meningococcus)",
          "C1 esterase inhibitor deficiency: hereditary angioedema → face/airway swelling; AVOID ACE inhibitors; treat with C1 inhibitor concentrate, ecallantide, or icatibant. Do NOT use epinephrine/antihistamines/steroids (bradykinin-mediated, not histamine)",
          "C3: severe pyogenic infections (encapsulated)",
        ],
      },
    ],
    tables: [
      {
        caption: "Infection pattern clues",
        headers: ["Defect type", "Classic infections"],
        rows: [
          ["B-cell / antibody", "Encapsulated bacteria (S. pneumo, H. flu, N. meningitidis), Giardia, enteroviruses"],
          ["T-cell", "Viruses (CMV, HSV, VZV, EBV), fungi (Candida, PJP), intracellular (Mycobacteria, Salmonella)"],
          ["Combined (SCID)", "All of the above + FTT in infancy"],
          ["Phagocyte (CGD)", "Catalase+ organisms (Staph, Burkholderia, Serratia, Nocardia, Aspergillus)"],
          ["Complement (C5–9)", "Recurrent Neisseria meningitis/gonococcemia"],
        ],
      },
    ],
    pearls: [
      "Maternal IgG protects infants until ~6 months — Bruton presents AFTER that",
      "Live vaccines (MMR, varicella, BCG, oral polio) CONTRAINDICATED in T-cell deficiencies and SCID",
      "Delayed umbilical cord separation = think LAD-1",
      "Anaphylaxis after transfusion in IgA-deficient patient → give washed/IgA-deficient blood products",
      "Mnemonic for Wiskott-Aldrich: WATER (Wiskott Aldrich = Thrombocytopenia + Eczema + Recurrent infections)",
    ],
  },

  {
    id: "hiv-aids",
    session: 1,
    category: "Immunology",
    title: "HIV & AIDS — Opportunistic Infections",
    summary: "CD4-based prophylaxis + opportunistic infection patterns + ART basics.",
    sections: [
      {
        heading: "Diagnosis & monitoring",
        bullets: [
          "Screening: 4th-gen Ag/Ab combo (detects p24 + HIV Ab) — window ~3 weeks",
          "Confirm with HIV-1/2 differentiation immunoassay; HIV RNA viral load if acute",
          "Acute HIV (mono-like illness): screen Ag/Ab negative but HIV RNA positive",
          "Monitor: CD4 count + viral load",
        ],
      },
      {
        heading: "Prophylaxis by CD4 count",
        bullets: [
          "CD4 <200: TMP-SMX for PJP (also covers toxoplasmosis at CD4<100)",
          "CD4 <150 (Ohio/Mississippi valley): itraconazole for histoplasmosis",
          "CD4 <100: TMP-SMX double dose for toxoplasmosis (PJP also covered)",
          "CD4 <50: azithromycin weekly for MAC",
        ],
      },
      {
        heading: "Opportunistic infections by CD4",
        bullets: [
          "<500: Kaposi sarcoma, candida (oral thrush), TB, HSV/zoster, lymphoma",
          "<200: PJP (bilateral interstitial + hypoxia + ↑LDH); HIV-associated dementia",
          "<100: toxoplasmosis (multiple ring-enhancing basal ganglia), cryptococcal meningitis, esophageal Candida",
          "<50: CMV retinitis ('pizza pie' hemorrhages), CMV esophagitis (large linear ulcers), MAC (fever + ↓wt + diarrhea + ↑alk phos), CNS lymphoma (solitary periventricular + EBV in CSF), PML (JC virus)",
        ],
      },
      {
        heading: "ART basics",
        bullets: [
          "Start ART in everyone regardless of CD4",
          "Typical regimen: 2 NRTIs + (INSTI or NNRTI or boosted PI)",
          "Common: tenofovir + emtricitabine + dolutegravir (Biktarvy is bictegravir + emtricitabine + tenofovir alafenamide)",
          "Immune reconstitution inflammatory syndrome (IRIS): worsening with paradoxical inflammation after starting ART; treat both ART + offending infection",
        ],
      },
      {
        heading: "Special situations",
        bullets: [
          "Post-exposure prophylaxis (PEP): 3-drug ART within 72 hr × 28 days (tenofovir/emtricitabine + dolutegravir/raltegravir)",
          "Pre-exposure prophylaxis (PrEP): tenofovir/emtricitabine (Truvada or Descovy) or long-acting cabotegravir",
          "Pregnancy: HIV+ mother → ART throughout + IV zidovudine in labor + ART for infant 6 weeks; avoid breastfeeding in high-resource settings",
        ],
      },
    ],
    pearls: [
      "Acute HIV: mono-like + negative Ab + positive RNA — high transmission risk",
      "Don't forget PEP for occupational AND sexual assault exposure",
      "Cryptococcal meningitis: ↑opening pressure → serial LPs; treat amphotericin B + flucytosine then fluconazole",
      "Pneumocystis prophylaxis dose < treatment dose",
    ],
  },

  {
    id: "peds-rashes",
    session: 1,
    category: "Pediatrics",
    title: "Pediatric Rashes & Exanthems",
    summary: "Classic childhood exanthems by viral pattern — measles, rubella, roseola, fifth disease, hand-foot-mouth, varicella.",
    tables: [
      {
        caption: "Childhood viral exanthems",
        headers: ["Disease", "Agent", "Classic features", "Management"],
        rows: [
          ["Measles (rubeola)", "Paramyxovirus", "3 C's (cough, coryza, conjunctivitis) + KOPLIK spots (white lesions on buccal mucosa) → cephalocaudal maculopapular rash. Highly contagious", "Supportive + vitamin A; airborne isolation. Complications: pneumonia (#1 cause of death), encephalitis, SSPE years later"],
          ["Rubella (German measles)", "Togavirus", "Mild fever + posterior auricular/occipital LAD + face-down rash. Congenital rubella: cataracts, deafness, PDA", "Supportive; avoid in pregnancy"],
          ["Roseola (sixth disease)", "HHV-6", "Infant 6 mo–2 yr; high fever 3–5 days → fever defervesces THEN rash appears on trunk", "Supportive. Most common cause of febrile seizures"],
          ["Erythema infectiosum (fifth disease)", "Parvovirus B19", "'Slapped cheek' rash → lacy reticular on extremities. Aplastic crisis in sickle cell; hydrops fetalis", "Supportive; avoid pregnant women"],
          ["Hand-foot-mouth", "Coxsackie A", "Vesicles on palms, soles, oral mucosa; fever", "Supportive"],
          ["Varicella (chickenpox)", "VZV", "Crops of vesicles in DIFFERENT stages (macule → papule → vesicle → crust)", "Acyclovir for adolescents/adults/immunocompromised; airborne + contact isolation"],
          ["Scarlet fever", "Group A Strep", "Sandpaper rash + strawberry tongue + circumoral pallor + Pastia lines (axillary). After strep pharyngitis", "Penicillin/amoxicillin × 10 days"],
          ["Kawasaki", "Vasculitis (not viral)", "≥5 days fever + ≥4 of: conjunctivitis, mucositis (strawberry tongue), rash, extremity changes (palmar erythema/desquamation), cervical LAD", "IVIG + high-dose aspirin within 10 d; echo to monitor coronary aneurysms"],
        ],
      },
    ],
    pearls: [
      "Measles is the MOST CONTAGIOUS exanthem; airborne precautions",
      "Roseola: rash AFTER fever breaks; child looks well",
      "Parvovirus B19 + sickle cell → aplastic crisis (transient red cell aplasia)",
      "Hand-foot-mouth ≠ herpangina: herpangina = ulcers on soft palate only (no skin lesions)",
      "Kawasaki: untreated = 25% develop coronary aneurysms",
    ],
    relatedCaseIds: ["kawasaki-coronary"],
  },

  {
    id: "peds-other",
    session: 1,
    category: "Pediatrics",
    title: "Other Common Pediatric Conditions",
    summary: "Wheezing infant DDx, common rashes, congenital heart disease patterns, FTT.",
    sections: [
      {
        heading: "Congenital heart disease patterns",
        bullets: [
          "Cyanotic (5 T's): Truncus arteriosus, Transposition, Tricuspid atresia, Tetralogy of Fallot, TAPVR",
          "TOF: VAR-PHS — VSD, Overriding aorta, RV hypertrophy, Pulmonary stenosis; 'tet spells' (squat to ↑SVR); boot-shaped heart",
          "Transposition: cyanosis at birth; egg-on-a-string CXR; need PGE1 + balloon atrial septostomy then arterial switch",
          "PDA: continuous machine-like murmur, wide pulse pressure; close with INDOMETHACIN (term infant) or wait if cyanotic CHD (then keep open with PGE1)",
          "VSD: most common CHD; holosystolic at LLSB",
          "ASD: fixed split S2",
          "Coarctation: arm > leg BP; HTN in upper, ↓ in lower; rib notching; Turner syndrome association",
          "Ebstein anomaly: lithium teratogen; apical displacement of tricuspid valve",
        ],
      },
      {
        heading: "Failure to thrive (FTT)",
        bullets: [
          "Weight <5th %ile or crossing 2 major %iles down",
          "Non-organic (most common): poor feeding/social",
          "Organic: CF, celiac, cow milk protein allergy, congenital heart disease, hypothyroid, immunodeficiency",
          "Workup: feeding history, growth chart, CBC, BMP, UA, sweat chloride if recurrent infections",
        ],
      },
      {
        heading: "Common peds infections",
        bullets: [
          "Roseola: fever then rash (HHV-6)",
          "Erythema toxicum: normal newborn rash (eosinophilic, harmless)",
          "Mongolian spot: dermal melanocytes, blue-gray lower back; not bruising",
          "Caput succedaneum: crosses suture lines (vs cephalohematoma which doesn't)",
          "Pyloric stenosis: 3–6 weeks, projectile non-bilious vomiting (covered in S3 GI)",
          "Strabismus: requires evaluation if persists >4 months",
          "Leukocoria: think retinoblastoma",
        ],
      },
      {
        heading: "Childhood cancers",
        bullets: [
          "ALL: most common childhood cancer; bone pain, fever, bleeding, blasts on smear; Philadelphia chromosome worse; treat with multi-agent chemo",
          "Wilms tumor (nephroblastoma): abdominal mass (don't palpate excessively → rupture risk); WAGR/Denys-Drash syndromes",
          "Neuroblastoma: <2 yr; abdominal mass crossing midline + opsoclonus-myoclonus (dancing eyes); ↑urine VMA/HVA; N-MYC amplification poor prognosis",
          "Retinoblastoma: leukocoria + absent red reflex; RB1 mutation; ↑osteosarcoma risk",
          "Medulloblastoma: cerebellar; most common malignant brain tumor in kids",
          "Osteosarcoma: distal femur/proximal tibia in adolescent; Codman triangle, sunburst",
          "Ewing sarcoma: diaphysis of long bones; 'onion skin'; t(11;22)",
        ],
      },
      {
        heading: "Bone & joint pediatric",
        bullets: [
          "Legg-Calve-Perthes: AVN of femoral head in 4–10 yr; painless limp + ↓ROM",
          "SCFE: obese adolescent; gradual hip/knee pain + ↓internal rotation; surgical pinning",
          "Septic arthritis vs transient synovitis: Kocher criteria (fever >38.5, WNB, ESR>40, WBC>12K)",
          "Nursemaid's elbow (radial head subluxation): toddler arm pulled; refuses to use arm; reduce by supinate + flex",
          "DDH: Ortolani/Barlow exam; US <6 months, X-ray after",
        ],
      },
    ],
    pearls: [
      "FTT mnemonic for organic causes: GI (CF, celiac), endocrine, cardiac, renal, immune, mental",
      "Caput succedaneum CROSSES sutures (soft tissue swelling); cephalohematoma does NOT cross (subperiosteal blood)",
      "Wilms vs neuroblastoma: Wilms = doesn't cross midline; neuroblastoma = crosses midline + opsoclonus-myoclonus",
      "Don't push fluids in a child with tet spell — squat them and give O₂ + morphine + beta-blocker",
    ],
  },

  {
    id: "stds",
    session: 2,
    category: "Infectious Disease",
    title: "STDs — Comprehensive",
    summary: "Syphilis, gonorrhea, chlamydia, HSV, HPV, trichomoniasis, chancroid, LGV, granuloma inguinale.",
    tables: [
      {
        caption: "Genital ulcers — contrasting features",
        headers: ["Cause", "Lesion", "Lymph nodes", "Diagnostic", "Treatment"],
        rows: [
          ["Syphilis (T. pallidum)", "PAINLESS firm clean chancre", "Painless rubbery LAD", "Dark-field, VDRL/RPR (screen), FTA-ABS (confirm)", "Benzathine penicillin G"],
          ["HSV-2", "PAINFUL grouped vesicles → ulcers", "Tender bilateral LAD", "PCR / Tzanck (multinucleated giants)", "Acyclovir, valacyclovir, famciclovir"],
          ["Chancroid (H. ducreyi)", "PAINFUL deep ulcer with ragged border", "Tender suppurative LAD", "Clinical / culture (gram neg coccobacilli)", "Azithromycin or ceftriaxone"],
          ["LGV (C. trachomatis L1–3)", "Small painless ulcer → resolves; THEN painful inguinal LAD", "Tender 'groove sign' bubo", "NAAT / serology", "Doxycycline 21 days"],
          ["Granuloma inguinale (Klebsiella granulomatis)", "Painless beefy red ulcer", "No LAD typically", "Donovan bodies on biopsy", "Doxycycline 3+ weeks"],
        ],
      },
    ],
    sections: [
      {
        heading: "Syphilis stages",
        bullets: [
          "Primary: painless chancre (3–6 weeks after exposure)",
          "Secondary: maculopapular rash including palms/soles + condylomata lata + mucous patches + generalized LAD; 6 weeks to 6 months",
          "Latent: asymptomatic; early <1 yr, late >1 yr",
          "Tertiary: gummas, cardiovascular (aortic aneurysm, AR), neurosyphilis (tabes dorsalis, general paresis, Argyll Robertson pupils)",
          "Treatment: benzathine penicillin G IM (single dose primary/secondary/early latent; weekly × 3 for late latent/tertiary). Neuro: IV penicillin G × 10–14 days",
          "Jarisch-Herxheimer reaction: fever/chills/myalgias hours after treatment (endotoxin release)",
          "Allergic: doxycycline (NOT in pregnancy → desensitize and give penicillin)",
        ],
      },
      {
        heading: "Gonorrhea & Chlamydia",
        bullets: [
          "Gonorrhea (N. gonorrhoeae): purulent urethritis/cervicitis; disseminated (DGI) → triad of polyarthralgia + tenosynovitis + pustular rash",
          "Chlamydia (C. trachomatis): often asymptomatic; cervicitis, urethritis, PID",
          "Both: NAAT of urine or swab",
          "Treat empirically for both due to coinfection: ceftriaxone 500 mg IM + doxycycline 100 mg BID × 7 days (or azithromycin 1 g if pregnant)",
          "PID: fever + lower abd pain + cervical motion tenderness; outpatient ceftriaxone + doxycycline ± metronidazole; admit if pregnant, severe, abscess",
          "Fitz-Hugh-Curtis: PID + perihepatitis (RUQ pain + 'violin string' adhesions)",
        ],
      },
      {
        heading: "HSV",
        bullets: [
          "HSV-1 usually oral, HSV-2 usually genital but overlap common",
          "Painful grouped vesicles on erythematous base; recurrences",
          "Diagnose: PCR (most sensitive); Tzanck shows multinucleated giant cells",
          "Treat: acyclovir, valacyclovir, famciclovir",
          "Pregnancy with active lesions at delivery → C-section (prevent neonatal HSV — devastating)",
          "Antiviral suppression from 36 weeks if recurrent",
        ],
      },
      {
        heading: "HPV",
        bullets: [
          "Low-risk (6, 11): condyloma acuminata (genital warts) → imiquimod, podofilox, cryotherapy",
          "High-risk (16, 18): cervical, anal, oropharyngeal cancer",
          "Cervical cancer screening: Pap at 21, q3 yr until 30; then Pap + HPV q5 yr or Pap q3 yr until 65",
          "HPV vaccine (Gardasil 9): all 11–12 yr (can start at 9); up to 26 (or 45 with shared decision-making)",
        ],
      },
      {
        heading: "Trichomoniasis",
        bullets: [
          "T. vaginalis: frothy yellow-green discharge + strawberry cervix + motile trichomonads on wet mount",
          "Treat: metronidazole single dose 2 g (treat partner)",
          "Avoid alcohol with metronidazole (disulfiram-like reaction)",
        ],
      },
      {
        heading: "Vaginal discharge differential",
        bullets: [
          "Bacterial vaginosis: gray, thin, fishy (KOH 'whiff' test +); clue cells; pH >4.5; metronidazole or clindamycin",
          "Candida (yeast): thick white 'cottage cheese', itching; pseudohyphae on KOH; fluconazole or topical azole",
          "Trichomonas: frothy yellow-green, strawberry cervix; metronidazole + treat partner",
        ],
      },
    ],
    pearls: [
      "Painless ulcer + painless LAD = syphilis; PAINFUL ulcer = HSV or chancroid",
      "DGI triad: dermatitis + arthritis + tenosynovitis (think gonorrhea)",
      "Argyll Robertson pupils accommodate but don't react to light = neurosyphilis ('prostitute's pupil')",
      "Pregnancy + syphilis allergy → penicillin desensitization (only option to prevent congenital syphilis)",
      "Always treat sexual partners",
    ],
    relatedCaseIds: ["tabes-dorsalis", "hsv-pregnancy"],
  },

  {
    id: "vector-borne",
    session: 1,
    category: "Infectious Disease",
    title: "Vector-Borne & Zoonotic Diseases",
    summary: "Tick, mosquito, flea, animal — geographic + exposure clues.",
    tables: [
      {
        caption: "Tick-borne diseases",
        headers: ["Disease", "Vector / region", "Features", "Diagnosis", "Treatment"],
        rows: [
          ["Lyme (Borrelia burgdorferi)", "Ixodes; Northeast/Midwest US", "Stage 1: erythema migrans (target). Stage 2: bilateral facial nerve palsy, carditis (AV block), aseptic meningitis. Stage 3: arthritis (knee), neuro", "Clinical + serology (ELISA → Western blot)", "Doxycycline (or amoxicillin/cefuroxime in pregnancy/peds <8); CNS/heart → IV ceftriaxone"],
          ["RMSF (Rickettsia rickettsii)", "Dermacentor; SE US (NC, OK)", "Fever + headache + rash STARTING ON WRISTS/ANKLES → centripetal spread (palms/soles too); thrombocytopenia + hyponatremia", "Clinical (don't wait for serology)", "Doxycycline (even in pregnancy and kids)"],
          ["Ehrlichiosis (Ehrlichia)", "Lone Star tick; SE/SC US", "Fever + headache + myalgia; LEUKOPENIA + thrombocytopenia + ↑LFTs. Morulae in monocytes", "Smear + PCR", "Doxycycline"],
          ["Anaplasmosis", "Ixodes; Upper Midwest/NE", "Similar to ehrlichiosis but morulae in granulocytes (neutrophils)", "Smear + PCR", "Doxycycline"],
          ["Babesiosis (Babesia)", "Ixodes; New England, Midwest", "Fever + hemolytic anemia + jaundice + asplenic patients severe; Maltese cross on smear", "Smear or PCR", "Atovaquone + azithromycin (severe: clindamycin + quinine)"],
          ["Tularemia (Francisella)", "Dermacentor / rabbit handling", "Ulcer at bite site + regional LAD + fever (ulceroglandular)", "Serology", "Streptomycin or gentamicin"],
        ],
      },
      {
        caption: "Mosquito-borne diseases",
        headers: ["Disease", "Vector / region", "Features", "Treatment"],
        rows: [
          ["Malaria", "Anopheles; tropics", "Fever cycles, hemolytic anemia, splenomegaly. P. falciparum (severe, no relapse); vivax/ovale (hypnozoites → relapse)", "Chloroquine if sensitive; artemisinin-based for resistant. Primaquine to clear hypnozoites in vivax/ovale (check G6PD first)"],
          ["Dengue", "Aedes; tropics", "Saddleback fever + retro-orbital pain + thrombocytopenia + 'breakbone' myalgia; hemorrhagic/shock on second infection", "Supportive (AVOID aspirin/NSAIDs — bleeding); IV fluids"],
          ["Zika", "Aedes; Latin America", "Mild rash + conjunctivitis + arthralgias; Guillain-Barré association; congenital microcephaly", "Supportive; avoid pregnancy ≥2 months after exposure"],
          ["Chikungunya", "Aedes", "Severe arthralgia + fever + rash; arthritis persists months", "Supportive (acetaminophen, NOT NSAIDs early to rule out dengue)"],
          ["West Nile", "Culex", "Fever + headache; rare meningoencephalitis + flaccid paralysis", "Supportive"],
        ],
      },
      {
        caption: "Other zoonotic",
        headers: ["Disease", "Source", "Features", "Treatment"],
        rows: [
          ["Cat scratch (Bartonella henselae)", "Cat scratch/bite", "Tender regional LAD + low-grade fever; HIV → bacillary angiomatosis", "Azithromycin"],
          ["Brucellosis", "Unpasteurized dairy / livestock", "Undulating fever + arthralgia + sweats", "Doxycycline + rifampin"],
          ["Leptospirosis", "Animal urine / water exposure", "Fever + conjunctival suffusion + myalgia; Weil disease = jaundice + AKI + hemorrhage", "Doxycycline or penicillin"],
          ["Q fever (Coxiella)", "Livestock / aerosols", "Atypical pneumonia + hepatitis", "Doxycycline"],
          ["Plague (Yersinia pestis)", "Flea (prairie dogs SW US)", "Bubonic: tender bubo + fever; pneumonic = bioterror form", "Streptomycin or gentamicin"],
          ["Hantavirus", "Rodent excrement (SW US)", "Pulmonary syndrome: fever → ARDS", "Supportive ICU"],
          ["Rabies", "Bat/dog/raccoon bite", "Hydrophobia, paresthesia at bite, encephalitis", "Wound care + RIG + vaccine series; PEP per algorithm"],
          ["Toxoplasmosis", "Cat litter / undercooked meat", "Pregnant → fetal hydrocephalus + intracranial calcifications; AIDS → ring-enhancing lesions", "Pyrimethamine + sulfadiazine + leucovorin"],
          ["Echinococcus (hydatid cyst)", "Dog / sheep", "Liver cysts with daughter cysts ('eggshell' calcifications)", "Albendazole ± surgery"],
        ],
      },
    ],
    pearls: [
      "Lyme rash crosses palms/soles? NO — that's RMSF. Lyme = target lesion, RMSF = wrists/ankles then central",
      "Doxycycline is OK in kids for tick-borne illness (RMSF, ehrlichia) — outweighs tooth concerns",
      "Ehrlichia: monocytes morulae. Anaplasma: granulocyte morulae",
      "Babesia + asplenic = severe disease",
      "Dengue + aspirin = hemorrhage (Reye-like)",
      "P. vivax/ovale → primaquine for hypnozoites (check G6PD)",
    ],
  },

  {
    id: "endemic-mycoses",
    session: 2,
    category: "Infectious Disease",
    title: "Endemic Mycoses & Other Fungal Infections",
    summary: "Histoplasma, Coccidioides, Blastomyces, Cryptococcus, Aspergillus, Candida, Sporothrix.",
    tables: [
      {
        caption: "Endemic dimorphic fungi",
        headers: ["Fungus", "Region", "Reservoir", "Features", "Diagnosis", "Treatment"],
        rows: [
          ["Histoplasma capsulatum", "Ohio + Mississippi River valleys", "Bird/bat droppings (caves)", "Flu-like + pulmonary nodules; immunocompromised: disseminated (hepatosplenomegaly, pancytopenia, oral ulcers); intracellular yeast in macrophages", "Urine antigen, serology, biopsy", "Itraconazole; amphotericin if severe/disseminated"],
          ["Coccidioides immitis", "SW US (Arizona, S. California), Mexico", "Soil after rain/dust storms", "'Valley fever' = pulm + erythema nodosum + arthralgias; can disseminate to skin/bone/meninges (esp. AA/Filipino, pregnant)", "Serology, spherules on biopsy", "Fluconazole or itraconazole; ampho for severe/meningitis"],
          ["Blastomyces dermatitidis", "Mississippi + Ohio Valleys + Great Lakes", "Decaying wood, soil", "Pulmonary + skin (verrucous ulcers), bone, GU; broad-based budding yeast", "Biopsy/culture", "Itraconazole; ampho for severe"],
          ["Paracoccidioides", "Latin America", "Soil", "Pulm + mucocutaneous oral ulcers; 'captain's wheel' yeast", "Biopsy", "Itraconazole; ampho if severe"],
          ["Sporothrix schenckii", "Worldwide (rose gardener)", "Soil/thorny plants", "Linear ulcers along lymphatics from scratch ('rose gardener')", "Culture", "Itraconazole"],
        ],
      },
      {
        caption: "Opportunistic & yeast infections",
        headers: ["Fungus", "Patient", "Features", "Treatment"],
        rows: [
          ["Cryptococcus neoformans", "HIV (CD4<100), immunocompromised", "Meningitis (headache + AMS + ↑opening pressure); India ink shows encapsulated yeast; serum/CSF cryptococcal antigen", "Amphotericin B + flucytosine 2 weeks → fluconazole consolidation/maintenance"],
          ["Aspergillus fumigatus", "Neutropenic / transplant", "Invasive: pulm with halo/air crescent sign; angioinvasion. Aspergilloma (fungal ball in old cavity). ABPA (asthma + brown sputum)", "Voriconazole (invasive); aspergilloma observe; ABPA steroids ± itraconazole"],
          ["Mucormycosis (Rhizopus)", "DKA + ferric overload (deferoxamine)", "Black necrotic eschar in nose/sinus → invades orbit/brain; non-septate hyphae", "Emergent surgical debridement + amphotericin B"],
          ["Pneumocystis jirovecii", "HIV CD4<200, steroids", "Bilateral interstitial infiltrates + hypoxia + ↑LDH", "TMP-SMX + steroids if PaO₂<70 or A-a>35"],
          ["Candida albicans", "Diabetes, abx, immunocompromised, IV lines", "Oral thrush, esophagitis (white plaques on EGD), vulvovaginitis, candidemia", "Fluconazole (uncomplicated); echinocandin (severe/candidemia)"],
        ],
      },
    ],
    pearls: [
      "Histoplasmosis: bird/bat poop + Mississippi/Ohio — pancytopenia in HIV",
      "Coccidioides: 'cocci in California' + erythema nodosum",
      "Blastomyces: BROAD-based budding; verrucous skin lesions",
      "Sporothrix: 'rose gardener's disease' — linear lymphangitic spread",
      "Cryptococcus + HIV: India ink + cryptococcal antigen; treat serial LPs for ↑OP",
      "Mucor in DKA: emergent surgery + ampho; deferoxamine + iron overload also risk",
      "Aspergillus halo sign / air crescent / fungal ball in old cavity",
    ],
  },

  {
    id: "parasites",
    session: 3,
    category: "Infectious Disease",
    title: "Parasites & Protozoa",
    summary: "GI (Giardia, Crypto, Entamoeba) + tissue (Toxo, Trypanosoma, Trichinella) + helminths.",
    sections: [
      {
        heading: "GI protozoa & parasites",
        bullets: [
          "Giardia lamblia: hiker/camper + fatty foul diarrhea + bloating; stool ELISA antigen; tinidazole or metronidazole",
          "Cryptosporidium: HIV CD4<100 + chronic watery diarrhea; oocysts on acid-fast smear; nitazoxanide + ART",
          "Entamoeba histolytica: bloody diarrhea (amebic colitis) + flask-shaped ulcers; LIVER ABSCESS (anchovy paste); metronidazole + paromomycin",
          "Ascaris: most common helminth worldwide; pulmonary symptoms (Loeffler) → migratory eosinophilic infiltrates → GI; albendazole",
          "Enterobius (pinworm): perianal itching at night; Scotch tape test; albendazole or pyrantel pamoate (whole household)",
          "Strongyloides: chronic eosinophilia in immigrants; ivermectin; CAUTION pre-steroids — hyperinfection",
          "Schistosoma: freshwater swimming abroad; eggs in stool/urine (haematobium = bladder cancer); praziquantel",
          "Taenia (tapeworm) solium: pork → cysticercosis (CNS calcified cysts → seizures in Latin American immigrants); praziquantel + steroids",
          "Diphyllobothrium latum: fish → B12 deficiency (megaloblastic anemia); praziquantel",
        ],
      },
      {
        heading: "Tissue protozoa",
        bullets: [
          "Toxoplasma gondii: cat litter / undercooked meat. Congenital: chorioretinitis + hydrocephalus + intracranial calcifications. AIDS: multiple ring-enhancing basal ganglia. Pyrimethamine + sulfadiazine + leucovorin",
          "Trypanosoma cruzi (Chagas): kissing bug, S/Central America; acute Romaña sign; chronic megacolon/megaesophagus + cardiomyopathy; benznidazole",
          "T. brucei (African sleeping sickness): tsetse fly; encephalopathy; suramin/eflornithine",
          "Leishmania: sandfly. Cutaneous: ulcer that heals slowly. Visceral (kala-azar): hepatosplenomegaly + pancytopenia. Liposomal amphotericin",
          "Trichinella spiralis: undercooked pork/wild boar → periorbital edema + myositis + eosinophilia; albendazole",
          "Babesia: see Tick-borne notes",
          "Plasmodium: see Malaria",
        ],
      },
    ],
    pearls: [
      "Giardia + IgA deficient = chronic infection",
      "Liver abscess + anchovy paste = Entamoeba (not Echinococcus which is hydatid cyst)",
      "Schistosoma haematobium → squamous cell bladder cancer in endemic areas",
      "Diphyllobothrium → B12 deficiency",
      "Strongyloides hyperinfection if given steroids — treat with ivermectin FIRST",
      "Toxo seroconversion in pregnancy → spiramycin (1st trim) or pyrimethamine + sulfadiazine (later)",
    ],
  },

  {
    id: "vasculitides",
    session: 1,
    category: "Rheumatology",
    title: "Vasculitides",
    summary: "Large, medium, small vessel — by size, presentation, and ANCA status.",
    tables: [
      {
        caption: "Large vessel vasculitis",
        headers: ["Disease", "Demographics", "Features", "Diagnosis", "Treatment"],
        rows: [
          ["Giant cell (temporal) arteritis", "Women >50; polymyalgia rheumatica association", "New headache + jaw claudication + scalp tenderness + visual loss (AION)", "ESR >50, CRP↑; temporal artery biopsy (segmental — get long sample)", "HIGH-DOSE prednisone IMMEDIATELY before biopsy (prevent blindness); add tocilizumab"],
          ["Takayasu arteritis", "Young Asian women <40", "'Pulseless disease': diminished arm pulses + arm claudication + BP difference; aortic arch + branches", "MRA/CTA", "Glucocorticoids"],
        ],
      },
      {
        caption: "Medium vessel",
        headers: ["Disease", "Features", "Associations", "Treatment"],
        rows: [
          ["Polyarteritis nodosa (PAN)", "Constitutional + skin (livedo, ulcers, nodules) + peripheral neuropathy (mononeuritis multiplex) + GI + renal (HTN) + cardiac. SPARES lungs", "Hepatitis B (30%); ANCA NEGATIVE; rosary bead aneurysms on angiogram", "Steroids ± cyclophosphamide; treat HBV"],
          ["Kawasaki", "Child + fever ≥5 days + 4 of 5 (conjunctivitis, mucositis/strawberry tongue, rash, extremity changes, cervical LAD)", "Coronary aneurysms if untreated", "IVIG + high-dose aspirin within 10 days; echo monitoring"],
          ["Buerger (thromboangiitis obliterans)", "Heavy male smoker <45; distal extremity ischemia, ulcers, gangrene; superficial thrombophlebitis", "SMOKING — strongly tied", "STRICT smoking cessation (only treatment)"],
        ],
      },
      {
        caption: "Small vessel — ANCA-associated",
        headers: ["Disease", "ANCA", "Features", "Treatment"],
        rows: [
          ["GPA (Granulomatosis with polyangiitis / Wegener)", "c-ANCA (anti-PR3)", "Upper airway (sinusitis, saddle nose) + lower airway (cavitary nodules) + glomerulonephritis", "Steroids + rituximab (or cyclophosphamide)"],
          ["MPA (Microscopic polyangiitis)", "p-ANCA (anti-MPO)", "Pulmonary-renal syndrome WITHOUT upper airway; no granulomas", "Steroids + rituximab/cyclophosphamide"],
          ["EGPA (Eosinophilic granulomatosis / Churg-Strauss)", "p-ANCA (anti-MPO) in 50%", "Asthma + eosinophilia + sinusitis + neuropathy + skin", "Steroids ± rituximab/mepolizumab"],
        ],
      },
      {
        caption: "Small vessel — immune complex",
        headers: ["Disease", "Features", "Treatment"],
        rows: [
          ["IgA vasculitis (Henoch-Schönlein purpura)", "Child after URI; palpable purpura on buttocks/legs + arthralgias + abdominal pain (intussusception) + IgA nephritis", "Supportive; steroids for severe abdominal pain or renal involvement"],
          ["Cryoglobulinemic vasculitis", "Hepatitis C; palpable purpura + arthralgia + neuropathy + glomerulonephritis", "Treat HCV (DAAs); rituximab if severe"],
          ["Behçet disease", "Recurrent oral + genital ulcers + uveitis + erythema nodosum + pathergy (papule at needle stick site)", "Steroids; immunosuppression"],
        ],
      },
    ],
    pearls: [
      "ANCA mnemonic: c-ANCA → Wegener (GPA); p-ANCA → MPA, EGPA, also UC/PSC",
      "PAN spares lungs; GPA loves them",
      "Buerger: smoking is the disease — quit or lose the limb",
      "HSP triad: palpable purpura on buttocks + abdominal pain + arthritis",
      "GCA: don't wait for biopsy — give steroids first to save the eye",
      "Polymyalgia rheumatica: bilateral shoulder/hip aching + ↑ESR; low-dose prednisone is dramatic relief",
    ],
  },

  {
    id: "glomerular-disease",
    session: 1,
    category: "Renal",
    title: "Glomerular Diseases — Nephritic vs Nephrotic",
    summary: "Nephritic: hematuria + HTN + low GFR. Nephrotic: proteinuria + edema + hyperlipidemia.",
    tables: [
      {
        caption: "Nephritic syndromes",
        headers: ["Disease", "Features", "Complement", "Light micro / IF / EM", "Treatment"],
        rows: [
          ["Post-streptococcal GN", "1–4 weeks after pharyngitis/impetigo (kids); cola urine + edema + HTN", "↓ C3", "Hypercellular glomeruli; 'lumpy bumpy' IgG/C3; subepithelial 'humps'", "Supportive; usually self-resolves"],
          ["IgA nephropathy (Berger)", "Synpharyngitic hematuria (within DAYS of URI, not weeks)", "Normal", "Mesangial IgA + C3", "ACEi; steroids if severe"],
          ["Anti-GBM (Goodpasture)", "Hemoptysis + glomerulonephritis (pulmonary-renal)", "Normal", "Linear IgG on IF", "Plasmapheresis + steroids + cyclophosphamide"],
          ["Rapidly progressive GN (crescentic)", "Renal failure in days–weeks; crescents on biopsy", "Variable", "Crescents = subdivisions: type I anti-GBM, II immune complex (lupus, PSGN, IgA), III pauci-immune (ANCA — GPA, MPA, EGPA)", "Aggressive immunosuppression"],
          ["Lupus nephritis", "Lupus + hematuria/proteinuria", "↓ C3, ↓ C4", "Class IV diffuse proliferative most common/severe; full-house IF (IgG, IgM, IgA, C3, C1q)", "Steroids + cyclophosphamide or MMF"],
          ["MPGN", "Mixed nephritic/nephrotic; HCV + cryoglobulinemia association", "↓ C3, ↓ C4", "Tram-track BM splitting; subendothelial deposits", "Treat underlying"],
          ["Alport syndrome", "Hereditary; sensorineural hearing loss + lens dislocation + hematuria", "Normal", "Type IV collagen mutation; basket-weave EM", "ACEi; eventual transplant"],
        ],
      },
      {
        caption: "Nephrotic syndromes (proteinuria >3.5 g/day, edema, hypoalbumin, hyperlipidemia)",
        headers: ["Disease", "Demographics", "Features", "Biopsy", "Treatment"],
        rows: [
          ["Minimal change disease", "Most common in CHILDREN; after URI/vaccine/Hodgkin", "Selective albuminuria", "Light micro normal; EM podocyte foot process effacement", "Steroids (highly responsive)"],
          ["FSGS", "Most common in ADULTS (Black, HIV, heroin, obesity, sickle cell)", "Non-selective proteinuria", "Segmental sclerosis", "Steroids ± immunosuppression; poor response often"],
          ["Membranous nephropathy", "Adults — primary (anti-PLA2R antibody) or secondary (hepatitis B, SLE, malignancy, drugs — gold, penicillamine, NSAIDs)", "Hypercoagulable (renal vein thrombosis)", "Spike and dome subepithelial deposits; granular IF", "ACEi + immunosuppression"],
          ["Diabetic nephropathy", "Long-standing DM; hyperglycemia → mesangial expansion → Kimmelstiel-Wilson nodules", "Microalbuminuria earliest", "GBM thickening, mesangial expansion", "ACEi/ARB + SGLT2; tight glycemic control"],
          ["Amyloidosis", "Multiple myeloma (AL), chronic inflammation (AA)", "Restrictive cardiomyopathy + nephrotic + macroglossia", "Apple-green birefringence under polarized light with Congo red", "Treat underlying"],
        ],
      },
    ],
    sections: [
      {
        heading: "Diagnostic clues / contrasts",
        bullets: [
          "Cola-colored urine + RBC casts + dysmorphic RBCs = NEPHRITIC",
          "Frothy urine + edema + hyperlipidemia + lipiduria (Maltese cross) = NEPHROTIC",
          "Synpharyngitic (DAYS after URI) = IgA. Post-pharyngitic (1–4 WEEKS after) = PSGN",
          "Low C3 + C4 = lupus, MPGN. Low C3 only = PSGN, endocarditis-associated GN",
          "Hemoptysis + GN: Goodpasture (linear IgG) or GPA (c-ANCA)",
          "Nephrotic + hepatitis B = membranous; nephrotic + HIV/Black = FSGS; nephrotic + child = minimal change",
        ],
      },
      {
        heading: "Nephrotic complications",
        bullets: [
          "Hypercoagulability (loss of antithrombin III) → renal vein thrombosis (esp. membranous); flank pain + sudden ↓ renal function",
          "Infection (loss of IgG) → encapsulated organisms",
          "Hyperlipidemia → atherosclerosis",
          "Hypocalcemia (vit D binding protein loss)",
        ],
      },
    ],
    pearls: [
      "Mnemonic for nephritic: hematuria + HTN + Oliguria + RBC casts (cola urine)",
      "Mnemonic for nephrotic: massive Proteinuria + edema + hypoalbumin + hyperlipidemia",
      "Acute interstitial nephritis (AIN): triad of fever + rash + eosinophilia after drug (PPI, NSAID, β-lactam, sulfa); WBC casts + eos in urine — stop drug",
      "ATN: muddy brown casts (covered in S2 renal note)",
    ],
  },

  {
    id: "tubular-interstitial",
    session: 1,
    category: "Renal",
    title: "Tubular & Interstitial Renal Disease + RTAs",
    summary: "ATN, AIN, PKD, RTA types, contrast nephropathy.",
    sections: [
      {
        heading: "Acute tubular necrosis (ATN)",
        bullets: [
          "Most common intrinsic AKI",
          "Causes: ischemia (sepsis, surgery, shock), nephrotoxins (aminoglycosides, vancomycin, IV contrast, cisplatin, amphotericin B), pigment (rhabdomyolysis, hemolysis)",
          "Phases: initiation → maintenance (oliguric) → recovery (polyuric — watch for hypoK)",
          "Urine: muddy brown granular casts; FENa >2%; urine osm ~300",
          "Supportive; dialysis if AEIOU criteria",
        ],
      },
      {
        heading: "Acute interstitial nephritis (AIN)",
        bullets: [
          "Drug-induced hypersensitivity: PPI, NSAIDs, β-lactams, sulfa, allopurinol",
          "Triad (often incomplete): fever + rash + eosinophilia",
          "Urine: WBC casts + sterile pyuria + eosinophiluria (Hansel stain)",
          "Stop offending drug; steroids if persistent",
        ],
      },
      {
        heading: "Polycystic kidney disease",
        bullets: [
          "ADPKD: most common; PKD1/PKD2; presents adulthood; bilateral cysts + flank pain + hematuria + HTN; berry aneurysms + mitral valve prolapse + hepatic cysts; ESRD often by 60s",
          "ARPKD: infantile; oligohydramnios → Potter sequence + hepatic fibrosis",
        ],
      },
      {
        heading: "Contrast-induced nephropathy",
        bullets: [
          "Risk: CKD, diabetes, HF, dehydration, age",
          "Prevent: IV isotonic saline pre/post; minimize contrast volume; hold metformin (avoid lactic acidosis)",
          "N-acetylcysteine evidence weak",
        ],
      },
    ],
    tables: [
      {
        caption: "Renal tubular acidosis types",
        headers: ["Type", "Defect", "Urine pH", "K+", "Associations"],
        rows: [
          ["1 (distal)", "Cannot secrete H+ in distal tubule", ">5.5", "LOW", "Calcium phosphate stones, Sjogren, amphotericin, lithium"],
          ["2 (proximal)", "Cannot reabsorb bicarb in proximal tubule", "<5.5 (variable)", "LOW", "Fanconi syndrome (multiple myeloma, Wilson, lead), acetazolamide"],
          ["4 (hypoaldo)", "Aldosterone resistance/deficiency", "<5.5", "HIGH (hyperK)", "Diabetes (most common), ACEi/ARB, heparin, NSAIDs"],
        ],
      },
    ],
    pearls: [
      "Type 1 RTA + nephrolithiasis = calcium PHOSPHATE stones (alkaline urine)",
      "Type 2 RTA = Fanconi syndrome (also glucosuria, phosphaturia, aminoaciduria)",
      "Type 4 RTA = diabetic kidney; hyperK + non-anion gap acidosis + low aldosterone",
      "AKI from rhabdomyolysis: ↑CK + heme positive UA without RBCs + brown urine; aggressive fluids",
      "Hepatorenal syndrome: cirrhosis + AKI + no other cause; albumin + terlipressin; definitive = liver transplant",
    ],
  },

  {
    id: "electrolyte-acidbase",
    session: 1,
    category: "Renal",
    title: "Electrolytes & Acid-Base Disturbances",
    summary: "Sodium, potassium, calcium, magnesium + anion gap acidosis MUDPILES.",
    sections: [
      {
        heading: "Hyponatremia (Na <135)",
        bullets: [
          "Check serum osm first (rule out pseudo or hypertonic)",
          "Hypotonic + euvolemic: SIADH (CNS, lung CA, drugs — SSRIs, carbamazepine), hypothyroid, glucocorticoid deficiency",
          "Hypotonic + hypovolemic: GI/skin loss, diuretics (urine Na >20 if diuretic; <20 if extrarenal)",
          "Hypotonic + hypervolemic: CHF, cirrhosis, nephrotic",
          "Correct slowly — <8–10 mEq/L per 24 hr to avoid osmotic demyelination (central pontine myelinolysis)",
          "Severe symptomatic (seizure, AMS): 3% hypertonic saline",
        ],
      },
      {
        heading: "Hypernatremia (Na >145)",
        bullets: [
          "Always reflects water deficit (or excess Na)",
          "Diabetes insipidus (central or nephrogenic) → polyuria + polydipsia + dilute urine despite ↑serum osm",
          "Correct slowly to avoid cerebral edema",
        ],
      },
      {
        heading: "Hyperkalemia",
        bullets: [
          "ECG: peaked T → wide QRS → sine wave",
          "Step 1: IV calcium gluconate (membrane stabilization)",
          "Step 2: insulin + glucose, albuterol, bicarb (shift)",
          "Step 3: kayexalate, patiromer, loop diuretic, dialysis (remove)",
          "Stop offenders (spironolactone, ACEi/ARB, NSAIDs, K-sparing)",
        ],
      },
      {
        heading: "Hypokalemia",
        bullets: [
          "Causes: diuretics, vomiting, diarrhea, hyperaldosteronism",
          "ECG: flat T, U waves",
          "Replete K + Mg (low Mg perpetuates low K)",
        ],
      },
      {
        heading: "Hypercalcemia (stones, bones, abd groans, psychic moans)",
        bullets: [
          "Causes: primary HPT (most common outpatient), malignancy (most common inpatient), vitamin D toxicity, sarcoid, milk-alkali, thiazides, immobilization, MEN syndromes",
          "Treatment: IV NS + calcitonin (rapid) + bisphosphonate (durable, e.g., zoledronic acid); steroids for vitamin D-mediated",
        ],
      },
      {
        heading: "Hypocalcemia",
        bullets: [
          "Chvostek (facial twitch with tap) and Trousseau (carpal spasm with BP cuff) signs",
          "Prolonged QT on ECG → tetany, seizure",
          "Causes: hypoparathyroidism (post-thyroidectomy), CKD, vitamin D deficiency, hypomagnesemia, pancreatitis, tumor lysis",
          "IV calcium gluconate for symptomatic; replace Mg first if low",
        ],
      },
      {
        heading: "Anion gap metabolic acidosis (MUDPILES)",
        bullets: [
          "Methanol (formic acid), Uremia, DKA, Propylene glycol, Iron/INH, Lactic acidosis, Ethylene glycol (oxalate crystals), Salicylates",
          "Methanol → visual changes (retinal damage)",
          "Ethylene glycol → calcium oxalate crystals in urine + ATN",
          "Both treated with fomepizole (alcohol dehydrogenase inhibitor) ± dialysis",
        ],
      },
      {
        heading: "Non-anion gap metabolic acidosis (HARDASS)",
        bullets: [
          "Hyperalimentation, Addison disease, RTA, Diarrhea, Acetazolamide, Spironolactone, Saline",
        ],
      },
      {
        heading: "Respiratory acid-base",
        bullets: [
          "Respiratory acidosis: hypoventilation (COPD, opioids, NMD)",
          "Respiratory alkalosis: hyperventilation (anxiety, PE, salicylates, sepsis)",
          "Salicylates: mixed primary respiratory alkalosis + anion gap acidosis",
        ],
      },
    ],
    pearls: [
      "Correct hyponatremia too fast → ODS (central pontine myelinolysis); too slow → cerebral edema",
      "Always replete Mg before K (low Mg blunts K replacement)",
      "Hypocalcemia → check Mg first",
      "Methanol vs ethylene glycol: methanol → vision (formic acid attacks retina); ethylene glycol → crystals + AKI",
    ],
  },

  {
    id: "adrenal",
    session: 1,
    category: "Endocrine",
    title: "Adrenal Disorders",
    summary: "Insufficiency (Addison, secondary), CAH, Cushing, pheochromocytoma, hyperaldosteronism.",
    sections: [
      {
        heading: "Primary adrenal insufficiency (Addison)",
        bullets: [
          "Autoimmune (most common in developed), TB (developing), adrenal hemorrhage (Waterhouse-Friderichsen with meningococcemia), metastases, drugs (ketoconazole)",
          "Both cortisol AND aldosterone deficient → hypotension + hyperpigmentation (↑ACTH/MSH) + hyperK + hyponatremia + hypoglycemia + eosinophilia",
          "Cosyntropin (ACTH) stimulation test: cortisol fails to rise",
          "Treat: hydrocortisone (glucocorticoid) + fludrocortisone (mineralocorticoid)",
        ],
      },
      {
        heading: "Secondary adrenal insufficiency",
        bullets: [
          "Pituitary failure → low ACTH → low cortisol; aldosterone INTACT (RAAS independent)",
          "NO hyperpigmentation, NO hyperK",
          "Causes: pituitary tumor, Sheehan, sudden steroid withdrawal",
          "Treat: hydrocortisone only (no need for fludrocortisone)",
        ],
      },
      {
        heading: "Adrenal crisis",
        bullets: [
          "Acute decompensation: severe hypotension + AMS + abdominal pain + hyperK + hypoglycemia",
          "Trigger: infection, surgery, trauma, sudden steroid withdrawal",
          "Treat: IV hydrocortisone 100 mg + IV fluids + dextrose; don't wait for labs",
          "Always 'stress dose' steroids before surgery in chronic steroid users",
        ],
      },
      {
        heading: "Congenital adrenal hyperplasia (CAH)",
        bullets: [
          "21-hydroxylase deficiency (most common, 95%): low cortisol + low aldosterone + HIGH androgens → salt wasting + virilization in girls (ambiguous genitalia); ↑ 17-OHP",
          "11-β-hydroxylase: low cortisol + HIGH 11-deoxycorticosterone (acts as mineralocorticoid) → HTN + low K + virilization",
          "17-α-hydroxylase: low cortisol + LOW androgens → HTN + low K + lack of secondary sex characteristics",
          "Treat: glucocorticoid replacement (hydrocortisone) ± mineralocorticoid (fludrocortisone) for 21-OH",
        ],
      },
      {
        heading: "Cushing syndrome",
        bullets: [
          "Causes: exogenous steroids (most common); endogenous: pituitary adenoma (Cushing DISEASE — 70%), ectopic ACTH (small cell lung CA), adrenal adenoma",
          "Features: central obesity, moon face, buffalo hump, purple striae, easy bruising, HTN, hyperglycemia, osteoporosis, proximal weakness, depression",
          "Screening: 24-hr urine free cortisol, late-night salivary cortisol, low-dose dex suppression",
          "Localize: ACTH level. Low → adrenal source. High → ACTH-dependent (pituitary vs ectopic); high-dose dex suppression: suppresses pituitary (DISEASE), doesn't suppress ectopic",
          "Treat: surgical resection of source; ketoconazole/metyrapone for medical management",
        ],
      },
      {
        heading: "Pheochromocytoma",
        bullets: [
          "Catecholamine-secreting adrenal medulla tumor",
          "Classic '5 P's': Paroxysmal HTN + Palpitations + Perspiration + Pain (headache) + Pallor",
          "10% rule: 10% bilateral, 10% malignant, 10% extra-adrenal, 10% familial",
          "Associations: MEN 2A/2B, NF1, VHL",
          "Diagnose: 24-hr urine metanephrines (or plasma free metanephrines)",
          "Localize: CT/MRI; MIBG scan if not seen",
          "Treat: alpha-blockade FIRST (phenoxybenzamine) for 10–14 days → THEN beta-blockade → THEN surgical resection. NEVER β-block first (unopposed alpha → hypertensive crisis)",
        ],
      },
      {
        heading: "Primary hyperaldosteronism (Conn)",
        bullets: [
          "Adrenal adenoma or bilateral hyperplasia → ↑ aldosterone → HTN + HYPOKALEMIA + metabolic alkalosis",
          "Aldosterone:renin ratio elevated (>20)",
          "Adrenal vein sampling to distinguish unilateral (adenoma → adrenalectomy) vs bilateral (hyperplasia → spironolactone)",
          "Suspect in HTN + spontaneous hypokalemia OR resistant HTN",
        ],
      },
    ],
    tables: [
      {
        caption: "Adrenal insufficiency: primary vs secondary",
        headers: ["Feature", "Primary (Addison)", "Secondary (pituitary)"],
        rows: [
          ["Site", "Adrenal", "Pituitary"],
          ["Cortisol", "Low", "Low"],
          ["Aldosterone", "LOW (hyperK, hypoNa)", "Normal (RAAS intact)"],
          ["ACTH", "HIGH", "LOW"],
          ["Hyperpigmentation", "YES (↑ MSH from POMC)", "NO"],
          ["Hyperkalemia", "YES", "NO"],
          ["Treatment", "Hydrocortisone + fludrocortisone", "Hydrocortisone only"],
        ],
      },
      {
        caption: "Congenital adrenal hyperplasia",
        headers: ["Enzyme defect", "Cortisol", "Mineralocorticoid effect", "Androgens", "BP / K"],
        rows: [
          ["21-hydroxylase (most common)", "Low", "Low (salt wasting)", "HIGH (virilization)", "Low BP, ↑K"],
          ["11-β-hydroxylase", "Low", "HIGH (DOC builds up)", "HIGH", "HIGH BP, ↓K"],
          ["17-α-hydroxylase", "Low", "HIGH", "LOW (no secondary sex chars)", "HIGH BP, ↓K"],
        ],
      },
    ],
    pearls: [
      "Hyperpigmentation in adrenal insufficiency = PRIMARY (high ACTH/MSH from POMC)",
      "Always α-block BEFORE β-block in pheochromocytoma",
      "Cushing test ladder: screen (UFC, salivary cortisol, low-dose dex) → measure ACTH → high-dose dex / MRI",
      "Stress-dose steroids: anyone on >5 mg/day prednisone for >3 weeks in past year",
      "Sheehan syndrome: postpartum hemorrhage → pituitary infarction → no lactation (low prolactin) + amenorrhea + adrenal insufficiency",
    ],
    relatedCaseIds: ["hypertensive-emerg"],
  },

  {
    id: "thyroid-extended",
    session: 1,
    category: "Endocrine",
    title: "Thyroid Disorders — Comprehensive",
    summary: "Hyper/hypothyroidism, thyroiditis, thyroid storm, thyroid nodule.",
    sections: [
      {
        heading: "Hyperthyroidism causes",
        bullets: [
          "Graves disease: TSI antibodies + diffuse goiter + exophthalmos + pretibial myxedema; high RAIU diffuse",
          "Toxic multinodular goiter (Plummer): elderly; nodular uptake on scan",
          "Toxic adenoma: single 'hot' nodule",
          "Painful subacute (de Quervain) thyroiditis: post-viral; tender goiter; transient hyper → hypo → euthyroid; LOW RAIU (released stored hormone)",
          "Painless (silent/postpartum) thyroiditis: similar but no pain; postpartum common",
          "Factitious (exogenous): LOW thyroglobulin (vs all others which are high or normal)",
        ],
      },
      {
        heading: "Hyperthyroidism management",
        bullets: [
          "Methimazole first-line (except first trimester pregnancy — use PTU)",
          "PTU also used in thyroid storm (blocks T4→T3 conversion)",
          "Radioactive iodine ablation: definitive; avoid in pregnancy/breastfeeding/severe ophthalmopathy",
          "Thyroidectomy: large goiter, ophthalmopathy, pregnancy",
          "β-blocker for symptoms (propranolol)",
        ],
      },
      {
        heading: "Thyroid storm",
        bullets: [
          "Severe hyperthyroidism + fever + tachycardia + agitation/coma + GI symptoms",
          "Triggers: surgery, infection, iodine load, parturition",
          "Burch-Wartofsky score for diagnosis",
          "Treatment ORDER matters:",
          "1. β-blocker (propranolol) — symptoms",
          "2. PTU or methimazole — blocks new hormone synthesis",
          "3. Iodine (Lugol) ≥1 hr AFTER PTU (Wolff-Chaikoff)",
          "4. Glucocorticoid (hydrocortisone) — blocks T4→T3 conversion + treats possible adrenal insufficiency",
          "Cooling, IV fluids, treat precipitant",
        ],
      },
      {
        heading: "Hypothyroidism",
        bullets: [
          "Hashimoto thyroiditis: most common cause; anti-TPO + anti-thyroglobulin antibodies; ↑ TSH + ↓ free T4; goiter",
          "Other: post-RAI/surgery, iodine deficiency, lithium, amiodarone, congenital",
          "Subclinical: ↑TSH + normal T4 — treat if TSH >10, symptomatic, or trying to conceive",
          "Treatment: levothyroxine; pregnancy increases dose ~30%",
        ],
      },
      {
        heading: "Myxedema coma",
        bullets: [
          "Severe hypothyroidism + AMS + hypothermia + hypoventilation + bradycardia",
          "IV levothyroxine + IV hydrocortisone (until adrenal insufficiency excluded) + supportive",
        ],
      },
      {
        heading: "Thyroid cancer",
        bullets: [
          "Papillary (#1, best prognosis): psammoma bodies + 'Orphan Annie' nuclei; spreads via lymph; thyroidectomy",
          "Follicular: hematogenous spread (bone, lung)",
          "Medullary: from parafollicular C cells; ↑calcitonin; MEN 2A/2B",
          "Anaplastic: elderly; rapidly progressive; poor prognosis",
        ],
      },
    ],
    pearls: [
      "PTU = Pregnancy (first trimester) + Thyroid storm (blocks T4→T3); methimazole otherwise",
      "Iodine in thyroid storm must come AFTER thionamide to avoid Jod-Basedow + Wolff-Chaikoff",
      "Low RAIU + hyperthyroid = thyroiditis, exogenous hormone, iodine load",
      "Pregnancy + Graves → PTU (1st trimester) → methimazole (2nd/3rd)",
      "Amiodarone = iodine-rich → can cause hyper or hypothyroid; monitor TFTs",
      "Hashimoto: 80x risk of thyroid lymphoma",
    ],
    relatedCaseIds: ["thyroid-storm"],
  },

  {
    id: "pituitary",
    session: 1,
    category: "Endocrine",
    title: "Pituitary Disorders",
    summary: "Prolactinoma, acromegaly, SIADH, DI, Sheehan, hypopituitarism.",
    sections: [
      {
        heading: "Prolactinoma",
        bullets: [
          "Most common functioning pituitary adenoma",
          "Women: amenorrhea + galactorrhea + infertility",
          "Men: ↓libido + ED + infertility; often present later when large (bitemporal hemianopsia)",
          "Rule out causes of secondary hyperprolactinemia: pregnancy, hypothyroidism (TRH stimulates prolactin), drugs (antipsychotics, metoclopramide, methyldopa, opioids), chronic kidney disease",
          "Treat: dopamine agonist (cabergoline or bromocriptine) shrinks tumor and ↓prolactin; surgery if refractory",
        ],
      },
      {
        heading: "Acromegaly / Gigantism",
        bullets: [
          "Excess GH from somatotroph adenoma",
          "Adults (closed growth plates): acromegaly — large hands/feet/jaw, frontal bossing, deepening voice, OSA, HTN, cardiomyopathy, DM, colon polyps",
          "Children (before closure): gigantism",
          "Screen: IGF-1 (single sample); confirm: GH not suppressed after oral glucose",
          "MRI pituitary",
          "Treat: transsphenoidal surgery; octreotide/lanreotide if persistent; cabergoline; pegvisomant",
        ],
      },
      {
        heading: "SIADH",
        bullets: [
          "Euvolemic hyponatremia + concentrated urine (osm >100, ofen >300) + ↑urine Na (>30) + normal/low BUN/Cr/uric acid",
          "Causes: CNS (stroke, tumor, infection), lung (small cell CA, pneumonia), drugs (SSRIs, carbamazepine, cyclophosphamide), surgery",
          "Treat: fluid restriction first; salt tabs; demeclocycline or vaptans (tolvaptan, conivaptan) for refractory",
          "Severe symptomatic (seizure): 3% hypertonic saline — correct <8–10 mEq/L per 24 hr",
        ],
      },
      {
        heading: "Diabetes insipidus",
        bullets: [
          "Polyuria + polydipsia + dilute urine despite hypernatremia",
          "Central DI: ↓ ADH (head trauma, pituitary surgery, tumor, autoimmune)",
          "Nephrogenic DI: ADH-resistant kidney (lithium, hypercalcemia, hypokalemia, CKD)",
          "Water deprivation test: urine osm stays low; desmopressin challenge: central DI → urine osm rises >50%; nephrogenic → little response",
          "Treat: central → desmopressin; nephrogenic → low salt + thiazide (paradoxical) + amiloride; stop offending drugs",
        ],
      },
      {
        heading: "Sheehan syndrome",
        bullets: [
          "Postpartum hemorrhage → pituitary infarction (hypertrophied during pregnancy)",
          "First sign: failure to lactate (prolactin)",
          "Other: amenorrhea, fatigue (TSH/cortisol deficiency), cold intolerance",
          "Treat: replace all deficient hormones (hydrocortisone FIRST, then levothyroxine)",
        ],
      },
    ],
    pearls: [
      "Bitemporal hemianopsia + pituitary mass = compression of optic chiasm",
      "Always treat cortisol deficiency BEFORE thyroid (giving thyroxine first can precipitate adrenal crisis)",
      "Empty sella syndrome: enlarged sella with thin rim of pituitary; often asymptomatic",
      "Acromegaly → screen for colonoscopy + sleep apnea",
    ],
  },

  {
    id: "diabetes-comprehensive",
    session: 1,
    category: "Endocrine",
    title: "Diabetes Mellitus — Complete",
    summary: "Types, diagnosis, complications (DKA, HHS, neuropathy, nephropathy, retinopathy).",
    sections: [
      {
        heading: "Diagnosis",
        bullets: [
          "HbA1c ≥6.5% (diabetes); 5.7–6.4% (prediabetes)",
          "Fasting glucose ≥126 mg/dL",
          "OGTT 2-hr ≥200",
          "Random ≥200 + symptoms",
          "Confirm with repeat test unless symptomatic + clearly elevated",
        ],
      },
      {
        heading: "Type 1 vs Type 2",
        bullets: [
          "Type 1: autoimmune β-cell destruction (anti-GAD, anti-islet); juvenile/lean; insulin-dependent; DKA-prone",
          "Type 2: insulin resistance + relative insulin deficiency; older/obese; HHS-prone; metabolic syndrome",
          "MODY: monogenic; family history with AD inheritance",
          "LADA: latent autoimmune of adulthood; T1DM in T2DM presentation",
        ],
      },
      {
        heading: "Type 2 treatment ladder",
        bullets: [
          "Metformin first-line (UNLESS GFR <30, decompensated HF, acidosis); GI side effects; B12 deficiency long-term",
          "Add SGLT2 (-flozins) if HFrEF, CKD, ASCVD: cardiorenal protection; risk of euglycemic DKA, UTI, mycotic infections, amputation (canagliflozin)",
          "Add GLP-1 (-tides) if ASCVD or obesity: weight loss; ↑ pancreatitis risk; ↑ medullary thyroid CA risk in animals (avoid MEN 2/MTC history)",
          "Other: sulfonylureas (hypoglycemia, weight gain), DPP-4 inhibitors (neutral), TZDs (weight gain, HF, fractures), insulin",
        ],
      },
      {
        heading: "DKA",
        bullets: [
          "Glucose >250 + anion gap acidosis + ketones + pH <7.3 + HCO3 <18",
          "Trigger: infection, MI, missed insulin, new T1DM",
          "Fluids FIRST: NS 1–1.5 L bolus then maintenance",
          "Potassium: <3.3 hold insulin + replete K; 3.3–5.3 start insulin + replete K; >5.3 start insulin no K",
          "Insulin: regular IV infusion; continue until anion gap CLOSES (not when glucose normalizes)",
          "Add D5 to fluids when glucose ~200",
          "Bicarb only if pH <6.9",
          "Cerebral edema is dreaded peds complication (don't drop glucose/Na too fast)",
        ],
      },
      {
        heading: "HHS (hyperosmolar hyperglycemic state)",
        bullets: [
          "Glucose often >600 + osm >320 + minimal/no ketones + AMS",
          "Type 2 elderly; trigger infection",
          "Aggressive IV fluids + insulin + K monitoring",
          "Mortality higher than DKA (older + comorbidities)",
        ],
      },
      {
        heading: "Chronic complications",
        bullets: [
          "Retinopathy: annual dilated exam; nonproliferative (microaneurysms, hard exudates, cotton-wool) → proliferative (neovascularization) → panretinal photocoagulation",
          "Nephropathy: microalbuminuria earliest; ACEi/ARB + SGLT2 protect; eventual ESRD",
          "Peripheral neuropathy: stocking-glove sensory; gabapentin/duloxetine/TCAs for pain; foot care",
          "Autonomic neuropathy: gastroparesis, postural hypotension, ED, neurogenic bladder",
          "Macrovascular: MI, stroke, PVD",
          "Foot ulcers: offloading + debridement; osteomyelitis if probes to bone",
          "Diabetic mononeuropathies: CN III palsy (pupil-SPARING in DM ischemic; pupil-INVOLVING = aneurysm)",
        ],
      },
      {
        heading: "Hypoglycemia in DM",
        bullets: [
          "Triad: Whipple triad (low glucose + symptoms + relief with sugar)",
          "Treat: oral glucose if alert; IV dextrose or IM glucagon if AMS",
          "Sulfonylurea hypoglycemia is prolonged — admit",
        ],
      },
    ],
    pearls: [
      "Don't stop insulin in DKA until anion gap CLOSES (glucose normalization alone is not enough)",
      "Pregnant + DM: insulin only (oral agents not first-line); tight control reduces fetal anomalies",
      "Steroids cause hyperglycemia — basal-bolus regimen + sliding scale",
      "Somogyi vs dawn: dawn phenomenon = morning hyperglycemia from cortisol surge; Somogyi (controversial) = early AM hypoglycemia → rebound hyperglycemia",
      "Newer GLP-1/GIP agonists (semaglutide, tirzepatide) — weight loss + cardiometabolic benefit",
    ],
    relatedCaseIds: ["dka", "diabetic-gastroparesis"],
  },

  {
    id: "men-syndromes",
    session: 1,
    category: "Endocrine",
    title: "MEN Syndromes & Endocrine Tumors",
    summary: "MEN 1, 2A, 2B + carcinoid + insulinoma + gastrinoma.",
    tables: [
      {
        caption: "Multiple endocrine neoplasia syndromes (all AD)",
        headers: ["Syndrome", "Gene", "Tumors"],
        rows: [
          ["MEN 1 (3 P's)", "MEN1 (menin)", "Pituitary adenoma + Parathyroid hyperplasia + Pancreatic NETs (gastrinoma, insulinoma, glucagonoma, VIPoma)"],
          ["MEN 2A (2 P's + 1 M)", "RET", "Medullary thyroid CA + Pheochromocytoma + Parathyroid hyperplasia"],
          ["MEN 2B (1 P + 2 M)", "RET", "Medullary thyroid CA + Pheochromocytoma + Mucosal neuromas + marfanoid habitus"],
        ],
      },
    ],
    sections: [
      {
        heading: "Functional pancreatic NETs",
        bullets: [
          "Insulinoma: hypoglycemia (Whipple triad) + ↑insulin + ↑C-peptide (vs exogenous → low C-peptide); 72-hr fast",
          "Gastrinoma (ZES): multiple recurrent ulcers + diarrhea + weight loss; ↑gastrin off PPI + secretin stim",
          "VIPoma: WDHA syndrome (Watery Diarrhea + Hypokalemia + Achlorhydria)",
          "Glucagonoma: necrolytic migratory erythema + diabetes + diarrhea + DVT",
          "Somatostatinoma: diabetes + steatorrhea + gallstones",
        ],
      },
      {
        heading: "Carcinoid syndrome",
        bullets: [
          "Serotonin-secreting NET — usually metastatic to liver to bypass hepatic clearance",
          "Flushing + diarrhea + bronchospasm + right-sided valvular disease (TR, PS)",
          "↑ 24-hr urine 5-HIAA",
          "Localize: CT, octreotide scan",
          "Treat: octreotide + surgical resection",
        ],
      },
    ],
    pearls: [
      "Medullary thyroid cancer → screen for pheochromocytoma BEFORE surgery (must α-block first)",
      "Prophylactic thyroidectomy for kids with RET mutation (especially MEN 2B)",
      "Whipple triad for insulinoma: hypoglycemia + symptoms + relief with sugar",
    ],
  },

  {
    id: "anemia-comprehensive",
    session: 1,
    category: "Hematology",
    title: "Anemia — Full Workup",
    summary: "MCV + reticulocyte + smear → microcytic, normocytic, macrocytic differentials.",
    tables: [
      {
        caption: "Microcytic anemia (MCV <80)",
        headers: ["Cause", "Iron studies / clues", "Smear"],
        rows: [
          ["Iron deficiency", "↓ferritin (best), ↑TIBC, ↓transferrin sat, ↑RDW", "Hypochromic microcytic; pencil cells"],
          ["Anemia of chronic disease", "↑ferritin, ↓TIBC, normal/↓ sat", "Mild; can become microcytic over time"],
          ["Thalassemia", "Normal iron studies; ↑RBC; target cells; basophilic stippling; hemoglobin electrophoresis", "α: silent (1 deletion), trait (2), HbH (3 — anemia, splenomegaly), Bart hydrops (4 — fatal). β: minor (heterozygous), major (Cooley — transfusion-dependent, ↑HbF/HbA2)"],
          ["Sideroblastic", "↑iron, ↑ferritin, normal/↓TIBC; ringed sideroblasts on Prussian blue", "Lead, isoniazid, alcohol, X-linked"],
          ["Lead poisoning", "Microcytic + basophilic stippling + abdominal pain + neuro; lead level", "Children with paint exposure; adults occupational"],
        ],
      },
      {
        caption: "Macrocytic anemia (MCV >100)",
        headers: ["Type", "Cause", "Clues"],
        rows: [
          ["Megaloblastic", "B12 deficiency", "Pernicious anemia (anti-IF, anti-parietal cell), terminal ileum disease (Crohn), pure vegans, Diphyllobothrium; SUBACUTE COMBINED DEGENERATION (dorsal columns + corticospinal); hypersegmented neutrophils; ↑MMA + ↑homocysteine"],
          ["Megaloblastic", "Folate deficiency", "Alcoholism, pregnancy, methotrexate, phenytoin, trimethoprim, sulfasalazine; NO neuro symptoms; ↑homocysteine only; folate IM (B12 first!)"],
          ["Non-megaloblastic", "Alcohol, liver disease, hypothyroidism, MDS, drugs (zidovudine)", "Round macrocytes; no hypersegmented neutrophils"],
        ],
      },
      {
        caption: "Normocytic anemia (MCV 80–100)",
        headers: ["Reticulocyte", "Differential"],
        rows: [
          ["Low (hypoproliferative)", "Anemia of chronic disease, CKD (↓EPO), aplastic anemia, marrow infiltration (leukemia, mets, fibrosis), early IDA"],
          ["High (hemolytic or hemorrhage)", "See hemolytic anemia table"],
        ],
      },
      {
        caption: "Hemolytic anemia",
        headers: ["Disease", "Features", "Diagnostic"],
        rows: [
          ["G6PD deficiency", "X-linked; episodic hemolysis after oxidative stress (sulfa, primaquine, fava beans, infection); Heinz bodies + BITE cells", "G6PD activity AFTER episode (false normal during acute)"],
          ["Hereditary spherocytosis", "AR; spherocytes; ↑MCHC; splenomegaly; pigment gallstones; splenectomy curative", "Eosin-5-maleimide flow cytometry; osmotic fragility"],
          ["Sickle cell", "HbS; vaso-occlusive crises, acute chest syndrome, dactylitis, autosplenectomy, osteomyelitis (Salmonella)", "Hb electrophoresis; treat hydroxyurea"],
          ["Autoimmune hemolytic (AIHA)", "Warm (IgG; SLE, CLL, drugs); Cold (IgM; Mycoplasma, mono); Coombs+", "Direct antiglobulin (Coombs) test"],
          ["Microangiopathic (MAHA)", "TTP, HUS, DIC, malignant HTN, HELLP; SCHISTOCYTES on smear; ↓platelets, ↑LDH, ↑indirect bili", "Smear + clinical context"],
          ["Paroxysmal nocturnal hemoglobinuria", "PIGA mutation; loss of CD55/59; intravascular hemolysis; venous thrombosis", "Flow cytometry CD55/59; treat eculizumab"],
        ],
      },
    ],
    sections: [
      {
        heading: "Iron deficiency anemia workup in adults",
        bullets: [
          "Men or postmenopausal women with new IDA → GI workup (colonoscopy + EGD) to rule out malignancy",
          "Premenopausal women: heavy menses most common; still consider GI source",
        ],
      },
      {
        heading: "Sickle cell complications",
        bullets: [
          "Vaso-occlusive (pain) crisis: hydration + opioids + O₂",
          "Acute chest syndrome: fever + chest pain + new infiltrate + hypoxia → exchange transfusion + abx",
          "Splenic sequestration: sudden splenomegaly + hypovolemic shock",
          "Aplastic crisis: parvovirus B19",
          "Stroke: chronic transfusions if TCD shows high risk",
          "Salmonella osteomyelitis (asplenic)",
          "Hydroxyurea: ↑HbF → fewer crises",
        ],
      },
    ],
    pearls: [
      "Always give B12 BEFORE folate (folate alone in B12 deficiency = worsens neuro)",
      "Sickle cell prophylaxis: penicillin until age 5, vaccinate against encapsulated organisms",
      "TTP pentad: FAT-RN — Fever + Anemia (MAHA) + Thrombocytopenia + Renal failure + Neuro changes; ADAMTS13 deficiency; plasma exchange (NO platelets)",
      "HUS: kids + bloody diarrhea (EHEC O157:H7) + MAHA + thrombocytopenia + AKI; AVOID antibiotics in EHEC (↑ Shiga release)",
      "Lead poisoning: BAL/EDTA/succimer; check children for FEP and Pb level",
    ],
  },

  {
    id: "bleeding-coagulation",
    session: 1,
    category: "Hematology",
    title: "Bleeding & Coagulation Disorders",
    summary: "Platelet vs clotting factor disorders; ITP, TTP, hemophilia, VWD, DIC.",
    sections: [
      {
        heading: "Pattern of bleeding",
        bullets: [
          "Mucocutaneous (epistaxis, petechiae, menorrhagia, easy bruising) → platelet or vWF disorder",
          "Deep tissue (hemarthrosis, muscle hematoma) → clotting factor disorder (hemophilia)",
        ],
      },
      {
        heading: "Platelet disorders",
        bullets: [
          "ITP: isolated thrombocytopenia; anti-platelet IgG; kids self-limit after viral; adults often chronic — steroids/IVIG/rituximab/splenectomy",
          "TTP: ADAMTS13 deficiency → unprocessed vWF multimers → MAHA + thrombocytopenia + neuro + renal + fever; plasma exchange (DO NOT give platelets — thrombus)",
          "HUS: see anemia note",
          "HIT: heparin-induced thrombocytopenia; PF4-heparin antibodies; thrombosis paradoxically; stop heparin + use direct thrombin inhibitor (argatroban) or fondaparinux",
          "DIC: consumption of platelets + clotting factors; ↑PT/PTT + ↓platelets + ↑D-dimer + ↓fibrinogen + schistocytes; treat underlying (sepsis, OB, malignancy, trauma)",
        ],
      },
      {
        heading: "Clotting factor disorders",
        bullets: [
          "Hemophilia A: factor 8 deficiency; X-linked; ↑PTT; deep tissue/joint bleeds; factor 8 concentrate or desmopressin (releases vWF/factor 8)",
          "Hemophilia B: factor 9; same presentation; factor 9 concentrate",
          "vWD: most common inherited bleeding disorder; mucocutaneous bleeding + epistaxis + menorrhagia; ↑PTT (factor 8 also low); desmopressin (most types)",
          "Vitamin K deficiency: ↑PT then ↑PTT; factors 2, 7, 9, 10 + C, S; vitamin K + FFP",
          "Liver disease: all factors low except factor 8",
          "Warfarin: targets vitamin K pathway",
        ],
      },
      {
        heading: "Hypercoagulability (thrombophilias)",
        bullets: [
          "Factor V Leiden: most common inherited; APC resistance",
          "Prothrombin G20210A mutation",
          "Antithrombin III deficiency (warfarin-resistant; heparin doesn't work well)",
          "Protein C or S deficiency: skin necrosis with warfarin start",
          "Antiphospholipid syndrome: arterial AND venous thromboses + recurrent miscarriage + ↑PTT (paradoxically — lupus anticoagulant). Anti-cardiolipin, anti-β2-GP1. Treat warfarin INR 2–3",
        ],
      },
    ],
    tables: [
      {
        caption: "Lab patterns",
        headers: ["Disorder", "PT", "PTT", "Platelets", "BT"],
        rows: [
          ["Hemophilia A/B", "Normal", "↑↑", "Normal", "Normal"],
          ["vWD", "Normal", "↑ (factor 8 carrier)", "Normal", "↑↑"],
          ["ITP", "Normal", "Normal", "↓↓↓", "↑"],
          ["DIC", "↑", "↑", "↓", "↑; ↓fibrinogen, ↑D-dimer"],
          ["Liver disease", "↑↑ (early)", "↑", "↓ (late)", "↑"],
          ["Vitamin K deficiency", "↑↑ (early)", "↑ (later)", "Normal", "Normal"],
        ],
      },
    ],
    pearls: [
      "Never give platelets in TTP/HIT (worsens thrombosis)",
      "Warfarin → starts with PROTHROMBOTIC state (depletes protein C/S first) — bridge with heparin",
      "Plavix mechanism: blocks ADP P2Y12; reversed by transfusing platelets",
      "Aspirin: irreversible COX inhibitor → DDAVP can help bleeding (releases vWF)",
      "Tranexamic acid: antifibrinolytic for bleeding (trauma, postpartum hemorrhage, surgery)",
    ],
  },

  {
    id: "heme-malignancies",
    session: 1,
    category: "Oncology",
    title: "Hematologic Malignancies",
    summary: "Leukemias, lymphomas, multiple myeloma — key distinguishers.",
    tables: [
      {
        caption: "Leukemias",
        headers: ["Type", "Demographics", "Features", "Treatment"],
        rows: [
          ["ALL", "Kids (peak 2–5); also elderly", "Bone pain + fevers + lymphadenopathy + blasts; CNS spread; tdT+, Philadelphia chromosome worst", "Multi-agent chemo with CNS prophylaxis; CR rates >90% in kids"],
          ["AML", "Adults; t(15;17) APL: Auer rods + DIC", "Anemia, thrombocytopenia, blasts >20% with Auer rods", "Cytarabine + anthracycline; APL → ATRA + arsenic"],
          ["CLL", "Elderly", "Smudge cells; lymphocytosis; warm AIHA; hypogammaglobulinemia", "Observe early; ibrutinib or chemoimmunotherapy for symptoms"],
          ["CML", "Adults 40–60", "Philadelphia chromosome (BCR-ABL t(9;22)); leukocytosis with left shift; basophilia + splenomegaly", "Imatinib (tyrosine kinase inhibitor) — dramatic response"],
          ["Hairy cell leukemia", "Middle-aged men", "Pancytopenia + splenomegaly; TRAP+ cells with hair-like projections", "Cladribine (single course)"],
        ],
      },
      {
        caption: "Lymphomas",
        headers: ["Type", "Features", "Treatment"],
        rows: [
          ["Hodgkin", "Painless cervical LAD + B symptoms (fever, night sweats, weight loss) + Reed-Sternberg cells (owl eyes); EBV association; bimodal age", "ABVD chemo ± RT; usually curable"],
          ["Non-Hodgkin (NHL)", "Many subtypes; nodal or extranodal; B-cell most; t(14;18) follicular = BCL-2; Burkitt = starry sky + t(8;14) c-MYC", "R-CHOP for DLBCL; rituximab if CD20+"],
          ["Mycosis fungoides", "Cutaneous T-cell lymphoma; patches/plaques/tumors; Sezary syndrome = leukemic phase", "Topical, phototherapy, systemic"],
        ],
      },
      {
        caption: "Plasma cell dyscrasias",
        headers: ["Disease", "Features", "Treatment"],
        rows: [
          ["Multiple myeloma", "CRAB: hyperCalcemia + Renal failure + Anemia + Bone lesions (lytic, 'punched out'); M-spike on SPEP; Bence Jones proteins (light chains in urine); rouleaux", "Bortezomib + dexamethasone ± lenalidomide; auto stem cell transplant"],
          ["MGUS", "Asymptomatic M-spike <3 g/dL; 1%/yr → MM", "Observation"],
          ["Waldenström", "IgM hyperviscosity (blurry vision, headache, mucosal bleeding); lymphoplasmacytic lymphoma", "Plasmapheresis acute; rituximab"],
        ],
      },
    ],
    pearls: [
      "Auer rods = AML (especially M3 APL — risk of DIC)",
      "Philadelphia chromosome: GOOD in CML (imatinib responds), BAD in ALL",
      "Reed-Sternberg cells = Hodgkin",
      "Burkitt 'starry sky' + t(8;14) c-MYC; tumor lysis risk → IV fluids + allopurinol + rasburicase",
      "Tumor lysis syndrome: hyperK + hyperphosphatemia + hyperuricemia + hypocalcemia + AKI",
      "Smudge cells + lymphocytosis in elderly = CLL",
    ],
  },

  {
    id: "rheumatology",
    session: 1,
    category: "Rheumatology",
    title: "Rheumatologic Diseases",
    summary: "RA, SLE, scleroderma, Sjögren, polymyositis/dermatomyositis, spondyloarthropathies, gout.",
    sections: [
      {
        heading: "Rheumatoid arthritis",
        bullets: [
          "Symmetric small joint polyarthritis (MCP, PIP, wrists) + morning stiffness >1 hr + spares DIP",
          "Anti-CCP (specific) + RF (sensitive)",
          "Extra-articular: rheumatoid nodules, pulmonary fibrosis, pleuritis, anemia of chronic disease, Felty (RA + splenomegaly + neutropenia), atlantoaxial subluxation",
          "Treat: methotrexate first-line; biologics (TNF-α inhibitors, rituximab, tocilizumab); steroids for flares",
          "Pre-DMARD workup: TB screen, hepatitis B/C",
        ],
      },
      {
        heading: "Systemic lupus erythematosus (SLE)",
        bullets: [
          "Young Black women; multi-system; ACR criteria (4 of 11)",
          "Malar rash + discoid rash + photosensitivity + oral ulcers + arthritis + serositis + renal + neuro + heme + ANA + immunologic (anti-dsDNA, anti-Smith)",
          "Anti-dsDNA = specific + correlates with disease activity (esp. nephritis)",
          "Anti-Smith = most specific",
          "Anti-histone = drug-induced (hydralazine, procainamide, isoniazid, minocycline)",
          "Antiphospholipid syndrome (lupus anticoagulant, anti-cardiolipin, anti-β2-GP1): thromboses + recurrent miscarriage",
          "Treat: hydroxychloroquine (baseline + retinal exams); steroids for flares; cyclophosphamide/MMF for nephritis",
          "Neonatal lupus: anti-Ro (SSA) + heart block",
        ],
      },
      {
        heading: "Scleroderma (systemic sclerosis)",
        bullets: [
          "Diffuse: anti-Scl-70 (anti-topoisomerase); rapid progression; renal crisis (ACEi)",
          "Limited (CREST): anti-centromere; Calcinosis + Raynaud + Esophageal dysmotility + Sclerodactyly + Telangiectasias; pulmonary HTN",
          "Treat: organ-specific (PPI, CCB for Raynaud, ACEi for renal crisis, etc.)",
        ],
      },
      {
        heading: "Sjögren syndrome",
        bullets: [
          "Dry eyes + dry mouth (sicca) + parotid enlargement",
          "Anti-Ro (SSA) + anti-La (SSB)",
          "Schirmer test; lip biopsy gold standard",
          "↑Risk MALT lymphoma",
          "Treat: artificial tears/saliva; pilocarpine; immunosuppression for systemic",
        ],
      },
      {
        heading: "Polymyositis / Dermatomyositis",
        bullets: [
          "Symmetric proximal muscle weakness + ↑CK + ↑aldolase",
          "Dermatomyositis: + heliotrope rash (eyelids) + Gottron papules (knuckles) + shawl sign + ↑malignancy risk (screen for occult cancer)",
          "Anti-Jo-1 (most specific) → interstitial lung disease",
          "Muscle biopsy: polymyositis = endomysial; dermatomyositis = perimysial inflammation",
          "Treat: high-dose steroids + methotrexate/azathioprine",
        ],
      },
      {
        heading: "Spondyloarthropathies (seronegative)",
        bullets: [
          "HLA-B27 association; absence of RF",
          "Ankylosing spondylitis: young men; back pain improves with activity; bamboo spine; ↓chest expansion; uveitis",
          "Psoriatic arthritis: 'sausage digits' (dactylitis) + nail pitting; treat methotrexate, anti-TNF",
          "Reactive arthritis (Reiter): 'can't see, can't pee, can't climb a tree' (uveitis + urethritis + arthritis) after Chlamydia or GI infection",
          "IBD-associated arthritis",
        ],
      },
      {
        heading: "Gout vs pseudogout",
        bullets: [
          "Gout: monosodium urate crystals — NEEDLE-shaped, negatively birefringent; podagra (1st MTP); risks include red meat, alcohol, diuretics, CKD, obesity",
          "Acute: NSAIDs > colchicine > steroids; do NOT start allopurinol acutely",
          "Chronic: allopurinol (xanthine oxidase inhibitor); febuxostat alternative; probenecid (uricosuric)",
          "Pseudogout (CPPD): calcium pyrophosphate; RHOMBOID, positively birefringent; chondrocalcinosis on X-ray; treat NSAIDs/steroids; check Mg, Ca, ferritin, PTH (associations)",
        ],
      },
      {
        heading: "Osteoarthritis",
        bullets: [
          "Mechanical wear; DIP (Heberden) + PIP (Bouchard); morning stiffness <30 min; pain worse with activity",
          "Treat: weight loss + PT + acetaminophen → NSAIDs → intra-articular steroids → joint replacement",
        ],
      },
      {
        heading: "Fibromyalgia",
        bullets: [
          "Widespread musculoskeletal pain + fatigue + tender points + sleep disturbance + no inflammation",
          "Diagnosis of exclusion",
          "Treat: exercise + CBT + duloxetine/milnacipran/pregabalin",
        ],
      },
    ],
    pearls: [
      "Drug-induced lupus: anti-HISTONE antibodies (HIPP — Hydralazine, INH, Procainamide, Phenytoin/sulfasalazine)",
      "Antiphospholipid: paradoxical ↑PTT due to lupus anticoagulant; treat with warfarin (INR 2–3)",
      "Felty triad: RA + splenomegaly + neutropenia",
      "Dermatomyositis + anti-Jo-1 = ILD risk; screen for malignancy at diagnosis",
      "Allopurinol HLA-B*5801 (Asian) → SJS risk; start low + slow",
      "Scleroderma renal crisis: ACEi (only time you give ACEi in AKI without holding)",
    ],
  },

  {
    id: "dermatology-step2",
    session: 2,
    category: "Dermatology",
    title: "Dermatology — High-yield Conditions",
    summary: "Skin cancers, infections, autoimmune skin diseases, life-threatening eruptions.",
    sections: [
      {
        heading: "Skin cancer",
        bullets: [
          "Basal cell: pearly papule + telangiectasias; sun-exposed; rarely metastasizes; Mohs surgery for face",
          "Squamous cell: scaly/ulcerative on sun-exposed; arises from actinic keratosis or Bowen disease (in situ); metastasis more than BCC; excision",
          "Melanoma: ABCDE; Breslow depth predicts prognosis; sentinel lymph node biopsy if >1 mm; targeted (BRAF V600E → vemurafenib) + immunotherapy (nivolumab/ipilimumab) for advanced",
          "Mycosis fungoides: CTCL; patches → plaques → tumors; Sezary syndrome = leukemic phase",
          "Kaposi sarcoma: HHV-8; AIDS or transplant; purple plaques",
        ],
      },
      {
        heading: "Life-threatening skin reactions",
        bullets: [
          "Stevens-Johnson syndrome / TEN: mucocutaneous + epidermal detachment; SJS <10% BSA, TEN >30%, overlap 10–30%; Nikolsky sign +; causes: sulfa, allopurinol, NSAIDs, lamotrigine, anticonvulsants; STOP drug + burn unit care",
          "DRESS syndrome: drug rash + eosinophilia + systemic (fever, LAD, hepatitis); 2–8 weeks after drug; stop drug + steroids",
          "Erythema multiforme: target lesions; HSV most common trigger",
          "Staphylococcal scalded skin syndrome (SSSS): infants; exfoliative toxin from S. aureus; Nikolsky +; spares mucous membranes; nafcillin",
          "Necrotizing fasciitis: rapid + pain out of proportion + crepitus + 'dishwater pus'; Group A Strep or polymicrobial; emergent surgical debridement + IV broad-spectrum abx",
        ],
      },
      {
        heading: "Autoimmune blistering",
        bullets: [
          "Pemphigus vulgaris: intra-epidermal (suprabasal); Nikolsky +; flaccid bullae + mucosal involvement; anti-desmoglein 1 + 3; net-like IgG on IF; steroids + rituximab",
          "Bullous pemphigoid: subepidermal; Nikolsky NEGATIVE; tense bullae; elderly; anti-BPAg1/2; linear IgG/C3 along BM; topical/systemic steroids",
          "Dermatitis herpetiformis: celiac association; intensely pruritic vesicles on extensor surfaces; granular IgA in dermal papillae; gluten-free diet + dapsone",
        ],
      },
      {
        heading: "Common infections / inflammatory",
        bullets: [
          "Cellulitis: warm, red, tender; β-hemolytic Strep or Staph; cephalexin/dicloxacillin (or clinda); MRSA → TMP-SMX or doxycycline",
          "Erysipelas: well-demarcated, raised; usually Group A Strep",
          "Impetigo: honey-crusted; topical mupirocin",
          "Tinea (corporis, pedis, capitis, cruris): topical antifungal; oral terbinafine/griseofulvin for capitis",
          "Pityriasis rosea: 'herald patch' → Christmas tree on trunk; self-limiting",
          "Psoriasis: salmon plaques with silvery scale; nail pitting + onycholysis; Auspitz sign (bleeding when scale removed); topical steroids/vit D analog; biologics for severe",
          "Atopic dermatitis (eczema): flexural in kids; emollients + topical steroids",
          "Seborrheic dermatitis: greasy scale on scalp/face; Malassezia; topical antifungal + steroid",
          "Acne: comedones + papules + pustules; topical retinoids + benzoyl peroxide + abx; isotretinoin for severe (teratogenic — iPLEDGE)",
          "Rosacea: facial flushing + papules + telangiectasias; topical metronidazole/ivermectin",
        ],
      },
      {
        heading: "Other key conditions",
        bullets: [
          "Erythema nodosum: tender red nodules on shins; sarcoid, IBD, strep, OCPs, coccidioides, TB",
          "Pyoderma gangrenosum: rapidly enlarging painful ulcer with violaceous border; IBD, RA association",
          "Acanthosis nigricans: dark velvety skin on neck/axilla; insulin resistance OR underlying malignancy (gastric)",
          "Lichen planus: 6 P's — Purple, Polygonal, Pruritic, Planar, Papules, Plaques; Wickham striae; HCV association",
        ],
      },
    ],
    pearls: [
      "Nikolsky + : SJS/TEN, pemphigus, SSSS. Nikolsky - : bullous pemphigoid",
      "DRESS: think Drug Rash + Eosinophilia + Systemic + Sustained (weeks after start)",
      "Isotretinoin: 2 forms of contraception + monthly pregnancy tests (iPLEDGE)",
      "Acanthosis nigricans new onset in older patient → look for visceral malignancy (gastric)",
      "Erythema nodosum + bilateral hilar LAD = Löfgren syndrome (sarcoidosis)",
    ],
  },

  {
    id: "obgyn-extended",
    session: 3,
    category: "OB/GYN",
    title: "Obstetric Emergencies & Common Issues",
    summary: "Preeclampsia, eclampsia, gestational diabetes, ectopic, placental abruption vs previa.",
    sections: [
      {
        heading: "Hypertensive disorders of pregnancy",
        bullets: [
          "Gestational HTN: >140/90 after 20 weeks, no proteinuria, no end-organ damage",
          "Preeclampsia: HTN + proteinuria OR end-organ damage (renal, liver, neuro, hemato, pulm edema)",
          "Severe features: BP ≥160/110, ↑Cr, ↑LFTs 2×, ↓plt <100K, pulm edema, neuro symptoms, RUQ pain",
          "HELLP: Hemolysis + Elevated Liver + Low Platelets — variant of severe preeclampsia",
          "Eclampsia: seizures",
          "Treatment: magnesium for seizure prophylaxis; labetalol/hydralazine/nifedipine for severe BP; deliver if severe features or ≥37 weeks",
          "Magnesium toxicity: loss of DTRs → respiratory depression; reverse with IV calcium",
        ],
      },
      {
        heading: "Antepartum bleeding (3rd trimester)",
        bullets: [
          "Placenta previa: painless bright red bleeding; placenta over cervical os; transvaginal US safe; CESAREAN delivery; NO digital exam",
          "Placental abruption: painful bleeding + tetanic uterus + DIC; risk: cocaine, HTN, trauma; emergent delivery",
          "Vasa previa: fetal bleeding (Apt test +); fetal demise quickly without C-section",
          "Uterine rupture: prior C-section + sudden severe pain + loss of fetal station; emergency",
        ],
      },
      {
        heading: "Routine prenatal care",
        bullets: [
          "First visit (8–10 wk): labs (CBC, blood type/Rh, antibody screen, HIV, syphilis, HBsAg, rubella, varicella, UA/culture); Pap if due",
          "10–13 wk: nuchal translucency + PAPP-A + β-hCG (first trimester screen)",
          "15–20 wk: quad screen (AFP, β-hCG, estriol, inhibin A) OR cell-free DNA",
          "18–20 wk: anatomy scan",
          "24–28 wk: 1-hr glucose challenge (GDM screen); repeat antibody screen if Rh-",
          "28 wk: RhoGAM if Rh-",
          "36 wk: GBS culture",
          "Tdap each pregnancy 27–36 wk; flu vaccine any trimester",
        ],
      },
      {
        heading: "Prenatal screening abnormalities",
        bullets: [
          "↑ AFP: NTDs (anencephaly, spina bifida), abdominal wall defects, multiple gestation, wrong dates",
          "↓ AFP: trisomy 21, 18 (with ↑β-hCG/inhibin in T21; ↓ all in T18)",
          "Cell-free DNA: highly sensitive for trisomy 13/18/21 from 10 weeks",
          "If anomaly: amniocentesis (after 15 wk) or CVS (10–13 wk) — diagnostic",
        ],
      },
      {
        heading: "Postpartum hemorrhage",
        bullets: [
          "4 T's: Tone (atony — most common) + Trauma + Tissue (retained placenta) + Thrombin (coagulopathy)",
          "Atony: massage + oxytocin → tranexamic acid → methylergonovine (NOT in HTN) → carboprost (NOT in asthma) → misoprostol → tamponade (Bakri) → surgery",
          "Risk factors: prolonged labor, multiparity, large baby, multiples, polyhydramnios",
        ],
      },
      {
        heading: "Endometritis (postpartum infection)",
        bullets: [
          "Fever, foul lochia, uterine tenderness (usually 2–10 days postpartum)",
          "Polymicrobial; treat clindamycin + gentamicin until afebrile 24–48 hr",
        ],
      },
    ],
    pearls: [
      "Always RhoGAM at 28 weeks AND postpartum for Rh- mom with Rh+ baby (or any sensitizing event: bleeding, trauma, amniocentesis)",
      "Mg toxicity → IV calcium gluconate",
      "Don't do digital cervical exam in suspected placenta previa",
      "Tdap each pregnancy (passive immunity to newborn)",
      "Pregnant + UTI → always treat (asymptomatic bacteriuria → pyelo + preterm labor)",
    ],
    relatedCaseIds: ["pph-atony", "hsv-pregnancy"],
  },

  {
    id: "geriatrics-elder",
    session: 1,
    category: "Geriatrics",
    title: "Geriatrics — Common Issues",
    summary: "Falls, delirium, dementia, polypharmacy, pressure ulcers.",
    sections: [
      {
        heading: "Falls",
        bullets: [
          "Comprehensive evaluation: medications (anticholinergics, benzos, antihypertensives), vision, gait/balance, vit D, home safety",
          "Get up and go test: <12 seconds normal",
          "Best intervention: multifactorial — PT (strength + balance) + vit D + medication review + home modifications",
        ],
      },
      {
        heading: "Delirium",
        bullets: [
          "Acute fluctuating attention/consciousness + cognitive disturbance",
          "Causes: infection (UTI, pneumonia), metabolic, medications, hypoxia, withdrawal",
          "First-line non-pharmacologic: reorientation, sleep hygiene, mobilization, family presence, sensory aids",
          "AVOID benzodiazepines (worsen) except for alcohol/benzo withdrawal",
          "Low-dose antipsychotic (haloperidol or quetiapine) for severe agitation",
        ],
      },
      {
        heading: "Polypharmacy",
        bullets: [
          "Beers criteria: drugs to avoid in elderly",
          "Anticholinergics (diphenhydramine, oxybutynin, TCAs) → falls, AMS, urinary retention",
          "Long-acting benzos → falls",
          "First-gen antihistamines → confusion",
          "Antipsychotics in dementia → ↑mortality (FDA boxed warning)",
        ],
      },
      {
        heading: "Pressure ulcers",
        bullets: [
          "Stage 1: non-blanchable erythema; Stage 2: partial-thickness skin loss; Stage 3: full-thickness skin loss (subQ visible); Stage 4: muscle/bone exposed",
          "Prevention: turn q2h, off-loading mattress, nutrition (protein, vitamins), moisture management",
          "Treat: debride necrotic tissue; appropriate dressings; antibiotics only if cellulitis or osteomyelitis",
        ],
      },
      {
        heading: "Advance directives",
        bullets: [
          "Living will: written wishes for end-of-life",
          "Durable power of attorney: surrogate decision-maker",
          "POLST: portable medical orders for serious illness",
          "If no directive: surrogate hierarchy (spouse → adult children → parents → siblings, etc.) varies by state",
        ],
      },
    ],
    pearls: [
      "Acute change in mental status in elderly → think UTI or pneumonia FIRST",
      "Don't use diphenhydramine in elderly (anticholinergic)",
      "Cholinesterase inhibitors can cause syncope (bradycardia) — caution in elderly with falls",
      "Mini-Cog for cognitive screening; MoCA more sensitive for MCI",
    ],
  },

  {
    id: "preventive-vaccines",
    session: 2,
    category: "Preventive Medicine",
    title: "Preventive Medicine & Vaccines",
    summary: "Adult immunizations + cancer screening + lifestyle counseling.",
    sections: [
      {
        heading: "Adult vaccines",
        bullets: [
          "Influenza: annual, age ≥6 months",
          "Tdap once + Td booster q10 years; Tdap each pregnancy",
          "MMR: born after 1957 if no immunity; 2 doses for HCW",
          "Varicella: no immunity; live — avoid in pregnancy and immunocompromised",
          "Zoster (Shingrix): age ≥50, even if prior shingles or Zostavax; 2 doses",
          "Pneumococcal: PCV20 (single dose) OR PCV15 followed by PPSV23 — age ≥65 OR younger with high risk (DM, asplenia, chronic disease)",
          "HPV: all 11–12 (catch-up to 26; shared decision 27–45)",
          "Meningococcal: age 11–12 with booster at 16; high-risk (asplenia, complement deficiency, college dorms, military)",
          "Hep A, Hep B per risk factors; universal HepB now recommended for adults 19–59",
          "RSV (Arexvy, Abrysvo): age ≥60 shared decision; pregnant 32–36 wk",
        ],
      },
      {
        heading: "Cancer screening",
        bullets: [
          "Breast: mammogram q2 yr age 50–74 (USPSTF); now lowered to 40 in 2024 update",
          "Cervical: Pap age 21 q3y; 30–65 Pap + HPV q5y or Pap q3y",
          "Colorectal: age 45+ colonoscopy q10y or alternatives",
          "Lung: LDCT age 50–80, ≥20 pack-years, current or quit <15 years",
          "Prostate: shared decision PSA age 55–69",
          "Skin: clinical exam; no specific routine",
          "AAA: one-time US in men 65–75 who ever smoked",
          "Osteoporosis: DEXA at age 65 women (younger if risk factors); men 70+",
        ],
      },
      {
        heading: "Lifestyle counseling",
        bullets: [
          "Smoking cessation: ask, advise, assess, assist (varenicline, NRT, bupropion), arrange",
          "Alcohol: USPSTF screens age ≥18",
          "Diet/exercise: 150 min moderate aerobic + 2 days strength training/week",
          "Aspirin for primary prevention: NO longer routinely recommended in adults ≥60 (USPSTF 2022)",
        ],
      },
    ],
    pearls: [
      "Live vaccines (MMR, varicella, zoster — Zostavax, yellow fever, oral polio, BCG, nasal flu) — avoid in pregnancy + immunocompromised",
      "Shingrix is recombinant (not live) — safe in immunocompromised",
      "Avoid live vaccines for 4 weeks before pregnancy",
      "Anaphylactic egg allergy: avoid yellow fever; flu vaccine is now considered safe even with egg allergy",
    ],
  },

  {
    id: "biostatistics",
    session: 2,
    category: "Biostatistics",
    title: "Biostats & Evidence-Based Medicine",
    summary: "Sensitivity, specificity, PPV, NPV, study types, biases.",
    sections: [
      {
        heading: "Diagnostic test statistics",
        bullets: [
          "Sensitivity = TP/(TP+FN) — rules OUT disease when negative (SnNOUT)",
          "Specificity = TN/(TN+FP) — rules IN disease when positive (SpPIN)",
          "PPV = TP/(TP+FP) — depends on prevalence",
          "NPV = TN/(TN+FN) — depends on prevalence",
          "LR+ = sens/(1-spec); LR- = (1-sens)/spec",
          "Pre-test probability × LR = post-test odds",
        ],
      },
      {
        heading: "Study designs (strongest to weakest)",
        bullets: [
          "Meta-analysis > systematic review > RCT > cohort > case-control > cross-sectional > case series/report",
          "RCT: gold standard for causation; randomization eliminates confounding",
          "Cohort: prospective; can calculate INCIDENCE + RELATIVE RISK",
          "Case-control: retrospective; calculates ODDS RATIO; good for rare diseases",
          "Cross-sectional: prevalence; snapshot in time",
        ],
      },
      {
        heading: "Biases",
        bullets: [
          "Selection bias: non-random selection (Berkson, healthy worker)",
          "Recall bias: case-control studies (cases remember exposure better)",
          "Lead-time bias: screening makes disease appear longer just because diagnosed earlier",
          "Length bias: slowly progressing disease over-represented in screening",
          "Confounding: third variable associated with both exposure and outcome",
          "Effect modification: relationship varies across subgroups (NOT a bias)",
          "Hawthorne effect: subjects change behavior because being observed",
          "Pygmalion effect: researcher's expectations affect outcome",
        ],
      },
      {
        heading: "Hypothesis testing",
        bullets: [
          "Type I error (α): false positive — reject true null",
          "Type II error (β): false negative — fail to reject false null; Power = 1-β",
          "Increasing sample size ↑ power",
          "p-value <0.05 = statistically significant by convention",
          "Confidence interval: if it includes 1 (for ratios) or 0 (for differences), result is not significant",
        ],
      },
    ],
    pearls: [
      "Use sensitive test for SCREENING (rule out); specific test for CONFIRMATION (rule in)",
      "Number needed to treat (NNT) = 1/absolute risk reduction (ARR)",
      "Number needed to harm (NNH) = 1/absolute risk increase",
      "Odds ratio approximates relative risk when disease is rare",
    ],
  },

  {
    id: "ethics-step2",
    session: 2,
    category: "Ethics & Professionalism",
    title: "Medical Ethics & Communication",
    summary: "Capacity, consent, confidentiality, end-of-life.",
    sections: [
      {
        heading: "Core principles",
        bullets: [
          "Autonomy: patient's right to decide",
          "Beneficence: act in patient's best interest",
          "Non-maleficence: do no harm",
          "Justice: fair distribution of resources",
        ],
      },
      {
        heading: "Capacity vs competence",
        bullets: [
          "Capacity: clinical decision (any physician); decision-specific; can fluctuate",
          "Competence: legal determination",
          "Capacity requires: understanding, appreciation, reasoning, expression of choice",
        ],
      },
      {
        heading: "Informed consent",
        bullets: [
          "Required elements: diagnosis, treatment options, risks/benefits, alternatives, prognosis without treatment",
          "Exceptions: emergencies, waiver, therapeutic privilege (rarely), incompetent patient",
          "Adolescents: parental consent generally required; EXCEPTIONS: emancipated minors (married, military, financially independent, pregnant); STIs, contraception, prenatal care, substance abuse, mental health (varies by state)",
        ],
      },
      {
        heading: "Confidentiality exceptions (must report)",
        bullets: [
          "Reportable infectious diseases (TB, STIs, HIV varies)",
          "Suspected child or elder abuse",
          "Tarasoff: duty to warn identifiable third party of imminent harm",
          "Gunshot wounds, certain injuries",
          "Imminent suicidal/homicidal risk",
        ],
      },
      {
        heading: "End-of-life",
        bullets: [
          "Living will: document wishes",
          "Healthcare proxy/DPOA: surrogate decision-maker",
          "DNR/DNI: do not resuscitate/intubate",
          "Palliative care: symptom-focused; can be alongside curative",
          "Hospice: life expectancy <6 months; focus on comfort",
          "Physician-assisted death: legal in some states (Oregon, Washington, etc.); patient must be terminal, competent, request multiple times",
          "Euthanasia: not legal in US",
          "Withholding vs withdrawing treatment: ethically equivalent",
          "Surrogate hierarchy: spouse → adult children → parents → siblings (varies)",
        ],
      },
      {
        heading: "Common scenarios",
        bullets: [
          "Pregnant adolescent: don't need parental consent for prenatal care",
          "STI in adolescent: don't need parental consent; don't disclose to parents",
          "Jehovah's Witness refusing blood: respect for competent adult; in pregnant woman, may compel for viable fetus depending on jurisdiction; in minors, court orders may override",
          "Doctor-patient sexual relationship: never appropriate (even after termination of care for some specialties)",
          "Gifts from patients: small acceptable; large or coercive should be declined",
          "Errors: disclose to patient; apologize without admitting liability outside protected discussion",
        ],
      },
    ],
    pearls: [
      "Capacity ≠ Competence (capacity = clinical, competence = legal)",
      "Tarasoff: duty to warn AND protect (e.g., notify police, hospitalize)",
      "Always rule out reversible causes (delirium, depression) before accepting refusal of care",
      "Pregnant minor: most states allow medical decisions for self and child",
      "Death by neurologic criteria = legal death (covered in seizures note)",
    ],
  },
];
