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
];
