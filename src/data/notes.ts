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

  // ═══════════════════════════════════════════════════════════════════
  // APEX 5 — NUTRITION, SCREENING, BIOSTATS, ETHICS
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "nutrition-comprehensive",
    session: 1,
    category: "Nutrition",
    title: "Clinical Nutrition — Comprehensive",
    summary: "Refeeding, micronutrient deficiencies/toxicities, TPN, malnutrition assessment, eating disorders.",
    sections: [
      {
        heading: "Refeeding syndrome",
        bullets: [
          "Trigger: carbohydrate reintroduction in malnourished/starved patient → insulin surge",
          "Insulin drives PO₄, K, Mg INTO cells",
          "HALLMARK: severe HYPOPHOSPHATEMIA → ATP depletion → respiratory failure + arrhythmias",
          "Prevention: thiamine BEFORE feeding, start low-calorie (~25% goal), advance slowly, replete electrolytes",
          "High-risk: severe malnutrition, prolonged starvation, alcohol use disorder, anorexia nervosa, hyperemesis",
        ],
      },
      {
        heading: "Thiamine (B1) deficiency",
        bullets: [
          "Wernicke triad: confusion + ophthalmoplegia/nystagmus + ataxia (REVERSIBLE)",
          "Korsakoff: amnesia + confabulation (PERMANENT)",
          "Always give IV thiamine BEFORE glucose in malnourished",
          "High-risk: alcoholism, hyperemesis gravidarum, anorexia, post-bariatric, starvation",
          "Wet beriberi: high-output HF + edema",
          "Dry beriberi: peripheral neuropathy",
        ],
      },
      {
        heading: "B12 (cobalamin) deficiency",
        bullets: [
          "Causes: pernicious anemia (anti-IF), metformin (impairs Ca-dependent absorption in terminal ileum), chronic PPIs, ileal resection >60 cm (lifelong IM)",
          "Megaloblastic anemia + neuro (subacute combined degeneration of dorsal columns + corticospinal)",
          "↑ MMA + ↑ homocysteine",
          "Folate deficiency: ↑ homocysteine ONLY (no neuro, normal MMA)",
          "Always give B12 BEFORE folate (folate alone worsens neuro symptoms)",
        ],
      },
      {
        heading: "Copper deficiency (post-bariatric, excess zinc)",
        bullets: [
          "Absorbed in stomach + proximal duodenum (bypassed in RYGB)",
          "Mimics B12: posterior column signs (vibration, proprioception, +Romberg)",
          "DISTINGUISHING feature: NEUTROPENIA + anemia",
          "Normal B12 in copper deficiency",
          "Excess zinc supplementation can also cause copper deficiency",
        ],
      },
      {
        heading: "TPN complications",
        bullets: [
          "Hepatic steatosis + cholestasis within 1–4 weeks",
          "Biliary stasis → sludge/stones (no enteral stimulation = ↓ CCK)",
          "CLABSI: most dangerous infection (central line)",
          "Trace element deficiencies emerge with long-term TPN:",
          "  Selenium → dilated cardiomyopathy + skeletal myopathy",
          "  Chromium → refractory hyperglycemia",
          "  Zinc → dermatitis + diarrhea + alopecia (acrodermatitis enteropathica)",
          "Refeeding risk with TPN initiation",
        ],
      },
      {
        heading: "Other micronutrients (high yield)",
        bullets: [
          "Vitamin A: deficiency → night blindness + xerophthalmia + Bitot spots; toxicity → pseudotumor cerebri + hepatotoxicity; teratogenic (isotretinoin → craniofacial/CNS/cardiac)",
          "Vitamin D: deficiency → rickets/osteomalacia; toxicity → hyperCa + hyperphosphate + SUPPRESSED PTH (vs primary hyperparathyroidism: low PO4)",
          "Vitamin E: deficiency → posterior column + spinocerebellar degeneration + hemolytic anemia",
          "Vitamin C: scurvy — bleeding/swollen gums, perifollicular hemorrhages, corkscrew hairs, poor wound healing",
          "Vitamin K: deficiency → bleeding; warfarin interaction — dietary CONSISTENCY, not avoidance",
          "Zinc: acrodermatitis enteropathica, hypogeusia, hypogonadism",
          "Iodine: goiter, hypothyroidism, cretinism (pregnancy)",
          "Selenium: TPN → dilated CM; thyroid dysfunction",
        ],
      },
      {
        heading: "TPN trace element pattern recognition",
        bullets: [
          "TPN + cardiomyopathy → Selenium",
          "TPN + refractory hyperglycemia → Chromium",
          "TPN + dermatitis + diarrhea + alopecia → Zinc",
          "TPN + neuropathy/anemia + neutropenia → Copper",
          "Maternal goiter + hypothyroid infant → Iodine",
          "Refractory hypokalemia → Magnesium",
        ],
      },
      {
        heading: "Drug-nutrient interactions (high-yield)",
        bullets: [
          "PPIs → ↓ Mg, Ca, B12 absorption",
          "Metformin → B12 deficiency",
          "Isoniazid → B6 deficiency (give B6 to prevent peripheral neuropathy + sideroblastic anemia)",
          "Loop diuretics → K + Mg wasting; replete Mg before K",
          "Orlistat → fat-soluble vitamin (A, D, E, K) malabsorption",
          "GLP-1 agonists (semaglutide): CONTRAINDICATED with personal/FHx MTC or MEN 2",
        ],
      },
      {
        heading: "Disease-specific nutrition",
        bullets: [
          "Metabolic syndrome: ≥3 of 5 (waist, TG ≥150, HDL <40/50, BP ≥130/85, FBG ≥100); first-line Mediterranean diet",
          "Heart failure: Na restriction (≤2 g); fluid restriction if Na <130",
          "CKD stages 4–5 (not on dialysis): protein 0.6–0.8 g/kg; once on dialysis 1.0–1.2 g/kg",
          "Cirrhosis: DO NOT restrict protein (1.2–1.5 g/kg) to prevent sarcopenia",
          "MASLD: 7–10% weight loss is most effective",
          "Kidney stones (calcium oxalate): INCREASE dietary calcium (binds oxalate in gut)",
          "Diabetes prevention: metformin if BMI ≥35, age <60, or prior GDM",
        ],
      },
      {
        heading: "Malnutrition assessment & PEM",
        bullets: [
          "Albumin/prealbumin: NEGATIVE acute phase reactants — drop with inflammation; NOT reliable nutrition markers in acute illness",
          "Kwashiorkor: protein deficiency with adequate calories — bilateral pitting edema, distended abdomen, fatty liver",
          "Marasmus: total caloric + protein deprivation — wasting, no edema",
          "Frailty: ≥3 of 5 (weight loss, exhaustion, ↓grip strength, slow gait, low activity)",
          "Significant weight loss in LTC: ≥5% in 1 mo, ≥7.5% in 3 mo, ≥10% in 6 mo",
        ],
      },
    ],
    pearls: [
      "Thiamine before glucose in malnourished",
      "B12 before folate",
      "TPN + cardiomyopathy → Selenium; refractory hyperglycemia → Chromium",
      "Post-bariatric + posterior column signs + normal B12 + neutropenia = Copper deficiency",
      "Anorexia leading cause of death: cardiac arrhythmia",
      "Don't restrict protein in cirrhosis",
    ],
    relatedCaseIds: ["refeeding-syndrome", "wernicke-hg", "b12-metformin", "copper-bariatric", "vitamin-a-toxicity"],
  },

  {
    id: "screening-comprehensive",
    session: 2,
    category: "Preventive Medicine",
    title: "Cancer & Adult Screening — Complete Reference",
    summary: "Age-appropriate screening for all major cancers and conditions.",
    sections: [
      {
        heading: "Colorectal cancer (CRC)",
        bullets: [
          "Average risk: colonoscopy q10 years starting age 45 until 75",
          "Alternatives: FIT annually, sigmoidoscopy q5y + FIT q3y, Cologuard q3y",
          "FHx in 1st-degree relative: start at 40 OR 10 years before relative's dx (whichever earlier)",
          "Relative <60 at dx: repeat q5y; >60: q10y",
          "UC: start 8–10 years after dx, q1–3y",
          "FAP: annual colonoscopy from age 10–12; prophylactic colectomy (100% lifetime CRC risk)",
          "Post-polypectomy: low-risk q5–10y; high-risk (≥3 adenomas, ≥10 mm, villous, HGD, SSP) q3y",
        ],
      },
      {
        heading: "Lung cancer",
        bullets: [
          "Annual low-dose CT (LDCT) for adults 50–80 with ≥20 pack-year history who currently smoke or quit <15 years ago",
          "Stop if: quit ≥15 years ago OR life-expectancy-limiting illness",
          "USPSTF 2021 lowered age from 55→50 and pack-years from 30→20",
        ],
      },
      {
        heading: "Cervical cancer",
        bullets: [
          "Ages 21–29: Pap alone q3 years (no HPV cotesting)",
          "Ages 30–65: Pap + HPV q5 years (preferred) OR Pap alone q3 years",
          "Discontinue at age 65 if adequate prior screening + no high-risk history",
          "HIV+: annual Pap starting at diagnosis or onset of sexual activity",
          "Immunosuppressed (SLE): annual Pap + HPV from sexual activity",
        ],
      },
      {
        heading: "Breast cancer",
        bullets: [
          "Mammography q2 years for average-risk women 50–74 (USPSTF; updated to start at 40 in 2024)",
          "BRCA: genetic counseling if strong FHx; MRI screening if confirmed BRCA mutation",
          "Discontinue when life expectancy <10 years",
        ],
      },
      {
        heading: "Prostate cancer",
        bullets: [
          "Shared decision-making age 55–69 (PSA)",
          "Discuss risks of overdiagnosis + treatment morbidity",
          "Not routinely recommended ≥70",
        ],
      },
      {
        heading: "Cardiovascular / metabolic",
        bullets: [
          "Diabetes T2: all adults ≥45 q3 years; earlier if BMI ≥25 + 1 risk factor (FHx, GDM, HTN, dyslipidemia, certain ethnicities)",
          "Lipid screening: men ≥35, women ≥40–45, q4–6 years; earlier if risk factors",
          "Pediatric lipid screening: once at 9–11 and 17–21",
          "AAA: one-time US for men 65–75 who ever smoked",
        ],
      },
      {
        heading: "General adult",
        bullets: [
          "HCV: all adults 18–79 once (universal); repeat if ongoing IVDU",
          "HBV: chronic dialysis, frequent transfusions",
          "Osteoporosis: DEXA for all women ≥65 (or earlier with risk factors); men ≥70",
          "Hearing: formal audiometry if communication difficulties",
          "IPV: screen all women of childbearing age routinely",
        ],
      },
      {
        heading: "STI screening",
        bullets: [
          "If diagnosed with one STI → screen for HIV, syphilis, gonorrhea, HBV",
          "Sexually active young women: chlamydia + gonorrhea annually",
          "Trichomonas: women only",
          "HSV: only if characteristic lesions present",
          "HIV+ initial: STIs, hepatitis A/B/C, latent TB",
        ],
      },
      {
        heading: "Pregnancy",
        bullets: [
          "Initial: HIV, syphilis, HBsAg, asymptomatic bacteriuria (urine culture)",
          "High-risk (age <25, multiple partners, STI history): gonorrhea + chlamydia at initial + 3rd trimester",
        ],
      },
    ],
    pearls: [
      "Always start CRC screening earlier if FHx (40 or 10 years before relative's dx)",
      "LDCT age 50–80 + ≥20 pack-years + smoking or quit <15 years",
      "Don't continue cancer screening when life expectancy <10 years",
      "BRCA1/2: prophylactic mastectomy + BSO consideration after childbearing",
    ],
  },

  {
    id: "vaccines-comprehensive",
    session: 2,
    category: "Preventive Medicine",
    title: "Adult Vaccination Schedule",
    summary: "Routine, high-risk, and PEP vaccinations for adults.",
    sections: [
      {
        heading: "Routine adult vaccines",
        bullets: [
          "Influenza: annual, age ≥6 months; severe egg allergy NOT a contraindication to inactivated",
          "Tdap once + Td booster q10 years; Tdap each pregnancy at 27–36 weeks",
          "MMR: 2 doses if born after 1957 without immunity",
          "Varicella: 2 doses if no immunity (live — avoid in pregnancy + immunocompromised)",
          "Zoster (Shingrix recombinant): all ≥50 (and immunocompromised ≥19); SAFE in immunocompromised (not live)",
          "HPV: all 11–12 (can start at 9); catch-up to 26 (shared decision 27–45). <15 yrs = 2 doses; ≥15 or immunocompromised = 3 doses",
          "Hepatitis B: universal for adults 19–59",
        ],
      },
      {
        heading: "Pneumococcal (adults)",
        bullets: [
          "19–64 with chronic conditions (heart, lung, liver, DM, smoking): PPSV23 alone",
          "19–64 very high risk (immunocompromised, asplenia, CSF leak, cochlear implant, CKD): PCV15 followed by PPSV23 ≥8 weeks later",
          "≥65 (no prior vaccine): PCV20 alone OR PCV15 then PPSV23 ≥1 year later",
        ],
      },
      {
        heading: "Meningococcal",
        bullets: [
          "Routine: primary dose at 11–12, booster at 16",
          "High-risk (start ≥2 months): asplenia, complement deficiency, HIV, endemic travel",
          "Asplenia: meningococcal + pneumococcal + Hib boosters",
        ],
      },
      {
        heading: "RSV",
        bullets: [
          "Adults ≥60: shared decision",
          "Pregnant: 32–36 weeks (passive antibody to newborn)",
        ],
      },
      {
        heading: "Pregnancy",
        bullets: [
          "GIVE: Tdap (27–36 wks), inactivated influenza, RSV (32–36 wks), RhoGAM 28 wks if Rh-",
          "CONTRAINDICATED (live): MMR, varicella, live-attenuated intranasal influenza",
          "HPV: not given in pregnancy (not because of teratogenicity, but lack of data)",
          "Hepatitis A/B: high-risk OK",
        ],
      },
      {
        heading: "Post-exposure prophylaxis (PEP)",
        bullets: [
          "Tetanus: clean minor — Tdap if <3 doses/unknown OR ≥3 doses + ≥10 yrs; dirty/severe — Tdap + TIG if <3 doses/unknown OR ≥3 doses + ≥5 yrs",
          "Varicella: immunocompetent → vaccine within 5 days; high-risk (pregnant, immunocompromised, infants) → VZIG",
          "Rabies: high-risk animal (bat, raccoon, fox) → vaccine + RIG (DIFFERENT arms); low-risk (rabbits, rodents) → only wound care",
          "Hepatitis B: unvaccinated + HBsAg+ exposure → HBV vaccine + HBIG; vaccinated immune (anti-HBs ≥10) → no PEP",
          "HIV: 3-drug ART within 72 hours × 28 days",
        ],
      },
      {
        heading: "Contraindications",
        bullets: [
          "Rotavirus: history of intussusception, SCID",
          "Pertussis (DTaP): anaphylaxis, encephalopathy, uncontrolled epilepsy",
          "Live vaccines: pregnancy, severe immunocompromise (CD4 <200, transplant, biologics)",
          "Mild illness (low-grade fever, cough): SAFE — only postpone for moderate/severe systemic illness",
        ],
      },
    ],
    pearls: [
      "Shingrix is recombinant — safe in immunocompromised (Zostavax was live)",
      "Egg allergy isn't a contraindication to inactivated flu",
      "Asplenia needs THREE boosters: meningococcal, pneumococcal, Hib",
      "RIG and rabies vaccine: different anatomic sites (prevent neutralization)",
      "Always treat both Mg before K in repletion (low Mg blunts K)",
    ],
  },

  {
    id: "biostats-comprehensive",
    session: 2,
    category: "Biostatistics",
    title: "Biostatistics & Study Design — Complete",
    summary: "Study designs, RR vs OR, sensitivity/specificity, biases, statistical tests.",
    sections: [
      {
        heading: "Study designs (strongest to weakest)",
        bullets: [
          "Meta-analysis > Systematic review > RCT > Cohort > Case-control > Cross-sectional > Case series/report",
          "RCT: gold standard for causation; randomization eliminates confounding",
          "Cohort: prospective; exposure → outcome; calculates incidence + RR",
          "Retrospective cohort: uses past records (both exposure and outcome already occurred)",
          "Case-control: starts with disease, looks back for exposure; OR; good for rare diseases; recall bias risk",
          "Cross-sectional: snapshot; measures prevalence; no temporal relationship",
          "Ecological: population-level data; ecological fallacy = main bias",
          "Twin concordance: monozygotic vs dizygotic for heritability",
        ],
      },
      {
        heading: "Clinical trial phases",
        bullets: [
          "Phase I: small group of HEALTHY volunteers — SAFETY + pharmacokinetics",
          "Phase II: patients with disease — efficacy + side effects + dosing",
          "Phase III: large RCT — confirms efficacy, compares to standard or placebo, FDA approval",
          "Phase IV: post-marketing surveillance — long-term/rare side effects",
        ],
      },
      {
        heading: "Risk measures",
        bullets: [
          "Relative Risk (RR) = Incidence in exposed / Incidence in unexposed (cohort/RCT)",
          "Odds Ratio (OR) = ad/bc (case-control)",
          "Relative Risk Reduction (RRR) = 1 − (Rt/Rc)",
          "Absolute Risk Reduction (ARR) = Rc − Rt",
          "Number Needed to Treat (NNT) = 1 / ARR (round UP)",
          "Number Needed to Harm (NNH) = 1 / ARI",
          "Attributable Risk = Ie − Iu",
        ],
      },
      {
        heading: "Diagnostic test characteristics",
        bullets: [
          "Sensitivity = TP / (TP + FN) — rules OUT (SnNout); intrinsic test property",
          "Specificity = TN / (TN + FP) — rules IN (SpPin); intrinsic test property",
          "PPV = TP / (TP + FP) — depends on prevalence",
          "NPV = TN / (TN + FN) — depends on prevalence",
          "LR+ = Sn / (1 − Sp) — large value (>10) rules IN",
          "LR− = (1 − Sn) / Sp — small value (<0.1) rules OUT",
          "Likelihood ratios: independent of prevalence",
        ],
      },
      {
        heading: "Cutoff effects (lower threshold)",
        bullets: [
          "Lower cutoff: ↑ Sn, ↑ NPV, ↓ Sp, ↓ PPV — more false positives",
          "Higher cutoff: ↑ Sp, ↑ PPV, ↓ Sn, ↓ NPV — more false negatives",
          "Screening test: lower cutoff (want high sensitivity)",
          "Confirmatory test: raise cutoff (want high specificity)",
        ],
      },
      {
        heading: "Biases",
        bullets: [
          "Selection bias: Berkson (hospital controls), healthy worker, attrition (loss to follow-up)",
          "Recall bias: case-control inaccurate memory",
          "Observer bias: researcher expectation; prevent with double-blinding",
          "Hawthorne effect: behavior change from being observed",
          "Confounding: 3rd variable linked to both; address with randomization, matching, stratification, regression",
          "Effect modification: NOT a bias — true difference in effect across subgroups",
          "Lead-time bias: earlier diagnosis without survival benefit",
          "Length-time bias: screening preferentially detects indolent disease",
          "ITT (intention-to-treat) analysis: addresses attrition bias",
        ],
      },
      {
        heading: "Statistical tests by data type",
        bullets: [
          "2 means, normal distribution → t-test (paired or independent)",
          "≥3 means → ANOVA",
          "Categorical × categorical → chi-square (or Fisher exact if cells <5)",
          "Paired categorical → McNemar",
          "Continuous × continuous (linear) → Pearson correlation",
          "Non-normal small samples → Mann-Whitney (2 groups), Kruskal-Wallis (≥3)",
          "Survival data → Kaplan-Meier curves; log-rank test for comparison",
        ],
      },
      {
        heading: "Hypothesis testing",
        bullets: [
          "Null hypothesis: NO effect/difference",
          "Type I error (α, false positive): rejecting a TRUE null; usually 0.05",
          "Type II error (β, false negative): failing to reject a FALSE null",
          "Power = 1 − β (probability of correctly rejecting false null)",
          "Increase power: ↑ sample size, ↑ effect size, ↓ variability, ↑ α",
          "P-value: probability of observing data if null is true; p < α → reject null",
          "Confidence interval: if CI includes null value (0 for differences, 1 for ratios) = NOT significant",
        ],
      },
      {
        heading: "Distributions & central tendency",
        bullets: [
          "Normal distribution: 68% ±1 SD, 95% ±2 SD, 99.7% ±3 SD",
          "Right-skewed: mean > median > mode",
          "Left-skewed: mean < median < mode",
          "Outliers pull MEAN; median is robust",
          "Standard error (SE) = SD / √n",
        ],
      },
    ],
    pearls: [
      "Cohort → RR; Case-control → OR",
      "NNT = 1/ARR (round UP)",
      "Sn/Sp don't depend on prevalence; PPV/NPV do",
      "Power = 1 − β; increase n to increase power",
      "Lead-time bias: 🕒 earlier clock; Length-time bias: 🐢 turtle (slow) cancers",
    ],
  },

  {
    id: "ethics-comprehensive",
    session: 2,
    category: "Ethics & Professionalism",
    title: "Medical Ethics — Boards-Style Scenarios",
    summary: "Capacity, consent, confidentiality, surrogates, end-of-life, professionalism.",
    sections: [
      {
        heading: "Four principles & priority",
        bullets: [
          "Autonomy (gold standard; overrides everything else for competent adult)",
          "Beneficence (best interest)",
          "Nonmaleficence (do no harm)",
          "Justice (fair distribution)",
          "On boards: AUTONOMY always wins for competent adult",
        ],
      },
      {
        heading: "Decision-making capacity",
        bullets: [
          "4 components: Understanding + Appreciation + Reasoning + Communication of choice",
          "ANY physician can assess (don't need psychiatry)",
          "Decision-SPECIFIC and can fluctuate",
          "Dementia, mental illness, intoxication do NOT automatically mean incapacity",
          "Schizophrenia patient who can explain dx, tx, risks, reasoning → has capacity even if odd",
          "Intoxication acutely → wait for sobriety (unless life-threatening, then emergency consent)",
        ],
      },
      {
        heading: "Informed consent — required elements",
        bullets: [
          "Diagnosis",
          "Risks + benefits",
          "Alternatives",
          "RISK of refusing (could they die?)",
          "Person performing procedure should obtain consent",
          "Telephone consent OK with witness",
          "Pregnant women can refuse anything (fetus not legally a person)",
        ],
      },
      {
        heading: "Exceptions to informed consent",
        bullets: [
          "Emergency: life-threatening + cannot consent + no surrogate → treat",
          "Therapeutic privilege: rarely correct — only if disclosure causes severe psychological harm",
          "Waiver: patient voluntarily declines info",
          "Implied: routine low-risk procedures (blood draw)",
        ],
      },
      {
        heading: "Minors",
        bullets: [
          "Generally cannot consent; emergencies = always treat",
          "FULL emancipation: marriage, military, financially independent, minor parent",
          "PARTIAL (specific conditions): contraception, prenatal care, STI testing, substance abuse, mental health (varies by state)",
          "Parents can NOT refuse life-saving treatment for child based on religion (Jehovah's Witnesses) → court order if time permits; transfuse if not",
          "Judicial bypass for parental-consent abortion laws",
        ],
      },
      {
        heading: "Confidentiality — exceptions (mandatory disclosure)",
        bullets: [
          "Suspected child abuse OR elder abuse (suspicion alone, no proof needed)",
          "Gunshot wounds",
          "Reportable infections: HIV/AIDS, syphilis, TB, gonorrhea, measles, mumps",
          "Tarasoff: identifiable target + imminent harm → warn AND protect (police + victim)",
          "Impaired drivers (some states)",
          "SPOUSAL abuse: cannot report without consent of competent adult victim",
        ],
      },
      {
        heading: "Confidentiality — protected",
        bullets: [
          "Minors STI/contraception/prenatal: do NOT disclose to parents",
          "Spouse cannot demand records or HIV results",
          "Police without warrant: do NOT disclose",
          "HIPAA: no chart access without treatment/payment/operations purpose",
        ],
      },
      {
        heading: "Surrogate decision-making hierarchy",
        bullets: [
          "1. Living will (patient's documented wishes)",
          "2. Healthcare proxy (DPOA): overrides default family",
          "3. Spouse → Adult children → Parents → Siblings → Friends",
          "Substituted judgment: 'what would the patient want?'",
          "Best interest standard: only for patients who NEVER had capacity",
          "Disagreement: encourage consensus → ethics committee (last resort)",
        ],
      },
      {
        heading: "End-of-life",
        bullets: [
          "Withholding = withdrawing (ethically equivalent)",
          "Double effect: ethical to give high-dose opioids if intent is pain relief (even if hastens death)",
          "DNR/DNAR: applies only to CPR; doesn't preclude ICU, surgery, dialysis",
          "DNR + surgery: discuss preoperatively",
          "Brain death = legal death; any physician can declare; EEG NOT required",
          "Organ donation: separate physician (not transplant team) declares brain death",
          "Physician-assisted death: legal in Oregon, WA, etc. (capacity, repeated requests, self-administered)",
          "Euthanasia (physician administers): ILLEGAL everywhere in US",
        ],
      },
      {
        heading: "Professionalism",
        bullets: [
          "Sexual contact with current patients: ALWAYS prohibited",
          "Psychiatrists: never with current OR former patients",
          "Gifts: small from patients OK; industry <$100 educational only",
          "Impaired colleague: mandatory report (resident → program director; attending → dept chair or state board)",
          "Good Samaritan: no obligation to start; once start, must transfer to EMS",
          "Errors: disclose to patient; apology + transparency",
          "'I'm sorry' laws in many states protect expressions of sympathy",
          "Wrong-site surgery, retained foreign body = NEVER events → full disclosure + RCA",
        ],
      },
      {
        heading: "Research ethics",
        bullets: [
          "IRB approval REQUIRED before enrolling subjects",
          "Patient can withdraw at any time without penalty",
          "Clinical equipoise: genuine uncertainty required for randomization",
          "Placebo arm unethical if effective standard exists (Declaration of Helsinki)",
          "Financial COI: mandatory disclosure",
          "Prisoners: identical rights; no coercion with promises of release",
          "Organ donation request: separate from treating team",
        ],
      },
      {
        heading: "Pregnant patients",
        bullets: [
          "Right to refuse C-section even with fetal distress (fetus not a legal person)",
          "Spousal consent NEVER required",
          "Brain dead + pregnant: somatic support to allow fetal maturation if family requests",
        ],
      },
      {
        heading: "Quality improvement",
        bullets: [
          "Value = Quality / Cost",
          "Lean methodology: optimize workflow, eliminate waste",
          "PDSA cycle: Plan-Do-Study-Act",
          "Measures: structural, process, outcome, balancing",
          "SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound",
          "Root-cause analysis (RCA): RETROSPECTIVE after sentinel event",
          "FMEA: PROSPECTIVE, identifies how processes could fail",
          "Strong actions: forcing functions; weak: training, double-checks",
          "Active errors: sharp end (operator); latent: blunt end (system flaws)",
        ],
      },
    ],
    pearls: [
      "AUTONOMY > Beneficence on boards — competent adult can refuse anything",
      "Capacity ≠ Competence (clinical vs legal)",
      "Tarasoff: duty to warn AND protect",
      "Brain death = legal death; no EEG required",
      "Spousal abuse: cannot report without consent (vs child/elder = mandatory)",
      "PROXY > family hierarchy",
      "Pregnant women can refuse C-section regardless of fetal outcome",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // APEX OBGYN — COMPREHENSIVE OB/GYN
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "pregnancy-physiology",
    session: 2,
    category: "OB/GYN",
    title: "Physiologic Changes of Pregnancy",
    summary: "Cardiovascular, renal, hematologic, endocrine, respiratory adaptations.",
    sections: [
      {
        heading: "Cardiovascular",
        bullets: [
          "↑ Plasma volume (50%) + ↑ RBC mass (30%) → DILUTIONAL anemia (↓ hematocrit)",
          "↑ Preload + ↑ HR → ↑ Cardiac output (~30–50%)",
          "↑ Progesterone → ↓ SVR → ↓ BP in first 20 weeks",
          "Supine position + IVC compression → ↓ preload → SUPINE HYPOTENSION SYNDROME → LEFT LATERAL DECUBITUS",
          "Physiologic S3 (3rd trimester) — benign",
        ],
      },
      {
        heading: "Renal/urinary",
        bullets: [
          "↑ GFR + ↑ renal blood flow → ↓ BUN and ↓ creatinine (elevated = concerning)",
          "Progesterone → ureteral dilation + stasis → ↑ risk asymptomatic bacteriuria + pyelonephritis",
          "Always treat asymptomatic bacteriuria in pregnancy",
        ],
      },
      {
        heading: "Hematologic",
        bullets: [
          "Hypercoagulable state (↑ clotting factors) → ↑ VTE risk; protective against postpartum hemorrhage",
          "↑ Fibrinogen, ↑ factors VII, VIII, IX, X",
          "Decreased protein S",
        ],
      },
      {
        heading: "Endocrine/respiratory",
        bullets: [
          "Estrogen → ↑ TBG → ↑ TOTAL T4 (free T4 normal)",
          "Progesterone → ↑ tidal volume → respiratory ALKALOSIS (facilitates CO₂ transfer from fetus)",
          "Pituitary doubles in size → Sheehan syndrome risk if massive PPH",
          "Prolactin rises throughout pregnancy",
        ],
      },
    ],
    pearls: [
      "Hypotension supine → left lateral decubitus",
      "Asymptomatic bacteriuria → always treat (nitrofurantoin, amox, cefalexin)",
      "Total T4 ↑ but free T4 normal in pregnancy",
      "Physiologic anemia from plasma volume expansion (not iron deficiency)",
    ],
  },

  {
    id: "antepartum-bleeding",
    session: 2,
    category: "OB/GYN",
    title: "Antepartum Bleeding — Differential",
    summary: "Placenta previa vs abruption vs uterine rupture vs vasa previa.",
    tables: [
      {
        caption: "Antepartum bleeding patterns",
        headers: ["Condition", "Pain", "Bleeding", "Uterus", "Contractions", "Key clue"],
        rows: [
          ["Placenta previa", "PAINLESS", "Bright red", "Soft", "Absent", "Painless bleeding + soft uterus + previa on US"],
          ["Placental abruption", "PAINFUL", "Variable (often dark)", "RIGID/tetanic", "Present", "HTN, cocaine, trauma; risk of DIC"],
          ["Uterine rupture", "PAINFUL", "Variable", "Variable", "Contractions CEASE", "Prior C/S + loss of fetal station"],
          ["Vasa previa", "PAINLESS (after ROM)", "Fetal blood", "Soft", "—", "Bleeding immediately after ROM + sudden fetal bradycardia, mom stable"],
        ],
      },
    ],
    sections: [
      {
        heading: "Quick differentiator rules",
        bullets: [
          "Painful bleeding = mom's problem (abruption, rupture)",
          "Painless bleeding = baby's problem (previa, vasa previa)",
          "Contractions present? Yes → abruption; No → rupture or previa",
          "Loss of fetal station → uterine rupture until proven otherwise",
          "Bleeding right after ROM + fetal bradycardia + stable mom → vasa previa",
        ],
      },
      {
        heading: "Placenta previa management",
        bullets: [
          "Confirm with transabdominal US",
          "NEVER digital cervical exam (risk of severe hemorrhage)",
          "Pelvic rest (no intercourse)",
          "Scheduled C-section at 36–37 weeks",
          "If actively bleeding hemodynamically unstable → emergent C-section",
        ],
      },
      {
        heading: "Placental abruption management",
        bullets: [
          "Stabilize mother (IV fluids, transfusion as needed)",
          "Continuous fetal monitoring",
          "Delivery if maternal/fetal instability — vaginal if stable, C/S if not",
          "DIC workup (fibrinogen, platelets, PT/PTT)",
        ],
      },
      {
        heading: "Uterine rupture management",
        bullets: [
          "Emergent ex-lap + C-section (NO time for imaging)",
          "Strongest RF: prior cesarean (especially classical incision)",
          "TOLAC carries small but real rupture risk",
        ],
      },
      {
        heading: "Vasa previa management",
        bullets: [
          "If diagnosed antenatally on US/Doppler: scheduled C-section at 34–37 weeks",
          "If ROM occurs + bleeding: emergent crash C-section",
          "Fetal exsanguination within minutes",
        ],
      },
      {
        heading: "Placental adherence (accreta spectrum)",
        bullets: [
          "Accreta: adherent to myometrium",
          "Increta: invades myometrium",
          "Percreta: invades through into bladder",
          "RFs: prior C/S + previa overlying scar",
          "Manage with planned cesarean hysterectomy",
        ],
      },
    ],
    pearls: [
      "Loss of fetal station during labor = uterine rupture",
      "Painful + rigid uterus + cocaine/HTN = abruption",
      "Painless bright-red + soft uterus = previa (NEVER do digital exam)",
      "After ROM + fetal bradycardia + stable mom = vasa previa",
    ],
    relatedCaseIds: ["uterine-rupture-tolac", "placental-abruption", "placenta-previa-classic", "vasa-previa"],
  },

  {
    id: "aneuploidy-screening",
    session: 2,
    category: "OB/GYN",
    title: "Prenatal Aneuploidy Screening",
    summary: "First/second trimester screens and diagnostic testing.",
    tables: [
      {
        caption: "Screening patterns",
        headers: ["Test", "Timing", "Components", "T21 pattern", "T18 pattern"],
        rows: [
          ["First trimester", "10–13 weeks", "β-hCG + PAPP-A + nuchal translucency (NT)", "↑ hCG, ↓ PAPP-A, ↑ NT", "↓ hCG, ↓ PAPP-A, ↑ NT"],
          ["Quad screen", "15–20 weeks", "AFP + β-hCG + estriol + inhibin A", "↑ hCG, ↑ inhibin, ↓ AFP, ↓ estriol", "All LOW (and ↓/normal inhibin)"],
          ["Cell-free fetal DNA (NIPT)", "≥10 weeks", "Fetal DNA in maternal blood", "Positive screen", "Positive screen"],
        ],
      },
    ],
    sections: [
      {
        heading: "Diagnostic testing",
        bullets: [
          "CVS: 10–13 weeks (chorionic villus sampling)",
          "Amniocentesis: ≥15 weeks",
          "NEVER skip directly to termination counseling without confirmatory testing",
        ],
      },
      {
        heading: "AFP interpretation",
        bullets: [
          "↑ AFP causes:",
          "  Open neural tube defects (anencephaly, spina bifida)",
          "  Abdominal wall defects (gastroschisis, omphalocele)",
          "  Multiple gestation",
          "  Incorrect dating (most common cause)",
          "↑ AFP is NOT a sign of T21 (T21 has LOW AFP)",
          "MSAFP + acetylcholinesterase in amniotic fluid → NTD confirmation",
        ],
      },
      {
        heading: "Anatomy ultrasound",
        bullets: [
          "18–20 weeks",
          "Major structural anomalies, NTD, cardiac, renal, abdominal wall, limbs",
        ],
      },
    ],
    pearls: [
      "T21 quad: ↑hCG + ↑inhibin + ↓AFP + ↓estriol (only hCG/inhibin up)",
      "T18 quad: all LOW",
      "↑ AFP = open defect (NTD or abdominal wall), NOT T21",
      "Cell-free DNA is highly accurate but still a SCREEN — confirm with CVS or amnio",
    ],
    relatedCaseIds: ["first-trimester-screen"],
  },

  {
    id: "prenatal-care-timeline",
    session: 2,
    category: "OB/GYN",
    title: "Routine Prenatal Care Timeline",
    summary: "Visit-by-visit prenatal labs and screening.",
    sections: [
      {
        heading: "Initial visit (8–10 weeks)",
        bullets: [
          "Labs: CBC, blood type + Rh + antibody screen, HIV, syphilis (RPR/VDRL), HBsAg, anti-HCV, rubella IgG, varicella IgG, urine culture (asymptomatic bacteriuria), urinalysis (protein)",
          "STIs (chlamydia + gonorrhea) if <25 or high-risk",
          "Pap if due",
          "Confirm dating with US",
          "Naegele rule: LMP + 7 days − 3 months + 1 year",
        ],
      },
      {
        heading: "10–13 weeks",
        bullets: [
          "Nuchal translucency + PAPP-A + β-hCG (first trimester aneuploidy screen)",
          "Cell-free DNA option from 10 weeks",
          "CVS if diagnostic indicated",
        ],
      },
      {
        heading: "15–20 weeks",
        bullets: [
          "Quad screen (AFP + β-hCG + estriol + inhibin A)",
          "Amniocentesis if diagnostic needed",
        ],
      },
      {
        heading: "18–20 weeks",
        bullets: [
          "Anatomy ultrasound",
        ],
      },
      {
        heading: "24–28 weeks",
        bullets: [
          "1-hour 50 g glucose challenge (GDM screen); if ≥140 → 3-hr 100 g OGTT",
          "Repeat antibody screen if Rh-negative",
        ],
      },
      {
        heading: "27–36 weeks",
        bullets: [
          "Tdap (each pregnancy)",
          "RSV vaccine (32–36 weeks)",
        ],
      },
      {
        heading: "28 weeks",
        bullets: [
          "RhoGAM (Rh-negative + unsensitized)",
        ],
      },
      {
        heading: "35–37 weeks",
        bullets: [
          "Group B Strep (GBS) rectovaginal swab",
        ],
      },
      {
        heading: "3rd trimester repeat (if high-risk)",
        bullets: [
          "Repeat STIs (chlamydia, gonorrhea, HIV, syphilis) if <25 or high-risk",
        ],
      },
    ],
    pearls: [
      "Naegele rule for EDC",
      "GTPAL: Gravidity, Term, Preterm, Abortion, Living",
      "β-hCG doubles q48h in early IUP; lagging = ectopic",
      "Discriminatory zone: β-hCG >1500–2000 + empty uterus → ectopic",
      "Tdap each pregnancy 27–36 weeks; passive antibody transfer",
    ],
  },

  {
    id: "labor-management",
    session: 2,
    category: "OB/GYN",
    title: "Labor Management & Dystocia",
    summary: "Stages of labor, arrest disorders, shoulder dystocia.",
    sections: [
      {
        heading: "Stages of labor",
        bullets: [
          "First stage: onset of labor → 10 cm",
          "  Latent phase: 0–6 cm (slow)",
          "  Active phase: 6–10 cm (faster)",
          "Second stage: 10 cm → delivery of fetus",
          "Third stage: delivery of placenta (<30 min)",
          "Fourth stage: first hour postpartum (recovery)",
        ],
      },
      {
        heading: "Arrest disorders",
        bullets: [
          "Latent arrest (0–5 cm): prolonged but doesn't mandate C/S; supportive",
          "ACTIVE phase arrest (≥6 cm + ROM + no change ≥4 h with adequate contractions OR ≥6 h with inadequate) → C-section",
          "Adequate contractions: ≥200 Montevideo units in 10 min, or 3–5 contractions/10 min",
          "Second stage arrest: head low (≥+2 station) → operative vaginal; high → C/S",
          "Augment first with OXYTOCIN if contractions inadequate",
        ],
      },
      {
        heading: "Operative vaginal delivery",
        bullets: [
          "Indications: prolonged 2nd stage, maternal exhaustion, non-reassuring tracing, maternal cardiac condition limiting Valsalva",
          "Forceps vs vacuum (similar success; vacuum easier to use but ↑ cephalohematoma)",
          "Prerequisites: fully dilated, ROM, head at ≥+2, no malposition",
        ],
      },
      {
        heading: "Cesarean delivery indications",
        bullets: [
          "Maternal: arrest of labor, severe preeclampsia (sometimes), HSV active lesions, placenta previa",
          "Fetal: non-reassuring tracing, malpresentation, multi-gestation (often), prior classical C/S",
          "VL ≥1000 in HIV+ mom",
        ],
      },
      {
        heading: "Shoulder dystocia",
        bullets: [
          "Head delivered but anterior shoulder fails to deliver",
          "RFs: macrosomia, GDM, prolonged 2nd stage, prior dystocia",
          "HELPERR: Help, Episiotomy, Legs (McRoberts — hyperflex thighs to abdomen), Pressure (suprapubic), Enter rotational (Rubin, Wood's screw), Remove posterior arm, Roll patient (Gaskin/all-fours)",
          "AVOID fundal pressure (impacts shoulder further)",
          "Complications: brachial plexus injury, clavicle/humerus fracture, hypoxia",
        ],
      },
      {
        heading: "Tocolysis (preterm labor)",
        bullets: [
          "Nifedipine (CCB): first-line for most",
          "Indomethacin: <32 weeks (premature ductus closure if used later)",
          "Magnesium sulfate: <32 weeks for neuroprotection",
          "Terbutaline: short-term only",
          "Goal: buy 48 hours for steroids",
          "Antenatal corticosteroids (betamethasone or dex) <34 weeks reduce NRDS, IVH, NEC",
          "GBS prophylaxis with PCN G if unknown or positive",
        ],
      },
      {
        heading: "Induction of labor",
        bullets: [
          "Cervical ripening if unfavorable Bishop score: misoprostol (PGE1) or dinoprostone (PGE2), or mechanical (Foley)",
          "Oxytocin for augmentation",
          "Amniotomy as appropriate",
          "Contraindications: prior classical C/S, transverse lie, placenta previa, vasa previa",
        ],
      },
    ],
    pearls: [
      "≥6 cm + ROM + no change ≥4 h with adequate contractions = active phase arrest = C/S",
      "Inadequate contractions → augment with oxytocin FIRST",
      "Shoulder dystocia first move: McRoberts + suprapubic pressure",
      "Indomethacin contraindicated >32 weeks (premature ductus closure)",
      "Oxytocin → SIADH risk (ADH-like)",
    ],
    relatedCaseIds: ["active-phase-arrest", "preterm-labor-management", "shoulder-dystocia"],
  },

  {
    id: "ob-hypertensive-comprehensive",
    session: 2,
    category: "OB/GYN",
    title: "Hypertensive Disorders of Pregnancy",
    summary: "Chronic HTN, gestational, preeclampsia (mild/severe), HELLP, eclampsia.",
    tables: [
      {
        caption: "Classification of HTN in pregnancy",
        headers: ["Disorder", "Timing", "BP", "Proteinuria/end-organ"],
        rows: [
          ["Chronic HTN", "Pre-pregnancy or <20 wks", ">140/90", "No"],
          ["Gestational HTN", ">20 wks", ">140/90", "No"],
          ["Preeclampsia", ">20 wks", ">140/90", "YES (proteinuria or end-organ dysfunction)"],
          ["Preeclampsia w/ severe features", ">20 wks", "≥160/110", "+ severe features"],
          ["Eclampsia", "Any after 20 wks (or postpartum)", "Variable", "+ SEIZURE"],
          ["HELLP", "3rd trim or postpartum", "Often normal", "Hemolysis + ↑LFTs + ↓platelets"],
        ],
      },
    ],
    sections: [
      {
        heading: "Severe features (any one mandates delivery)",
        bullets: [
          "BP ≥160 systolic or ≥110 diastolic",
          "Platelets <100,000",
          "AST/ALT ≥2× ULN + RUQ/epigastric pain",
          "Cr >1.1 or doubling",
          "Pulmonary edema",
          "Persistent headache or visual changes (scotomata)",
          "Seizures (eclampsia)",
        ],
      },
      {
        heading: "Treatment by stage",
        bullets: [
          "<37 weeks + NO severe features: expectant management with monitoring",
          "≥37 weeks OR ANY severe features: DELIVER",
          "BP control: labetalol, hydralazine, nifedipine (NOT methyldopa for acute — slow onset)",
          "Magnesium sulfate for seizure prophylaxis in severe preeclampsia + eclampsia",
          "Continue Mg 24 hours postpartum",
        ],
      },
      {
        heading: "Magnesium toxicity",
        bullets: [
          "Loss of DTRs first → respiratory depression → cardiac arrest",
          "Rescue: IV calcium gluconate",
        ],
      },
      {
        heading: "Eclampsia management",
        bullets: [
          "First-line: IV magnesium sulfate (NOT benzos)",
          "Add benzos if refractory",
          "Stabilize mother first, then deliver",
          "Can occur up to 6 weeks postpartum",
        ],
      },
      {
        heading: "HELLP",
        bullets: [
          "Hemolysis + Elevated LFTs + Low Platelets",
          "May have NORMAL BP (atypical preeclampsia)",
          "Severe feature → DELIVER regardless of GA",
          "Postpartum HELLP can occur up to 7 days after delivery",
        ],
      },
      {
        heading: "Antihypertensives in pregnancy",
        bullets: [
          "Safe: 'Hypertensive moms Love nifedipine' — Hydralazine, methyldopa (chronic), Labetalol, Nifedipine",
          "TERATOGENIC: ACE inhibitors, ARBs (renal agenesis, Potter sequence, oligohydramnios)",
          "Avoid diuretics in preeclampsia (volume-depleted state)",
        ],
      },
      {
        heading: "Preeclampsia prevention",
        bullets: [
          "Low-dose aspirin (81 mg) starting 12–28 weeks in high-risk women",
          "High-risk: prior preeclampsia, chronic HTN, DM, autoimmune (SLE, APS), multiple gestation, renal disease",
        ],
      },
    ],
    pearls: [
      "Preeclampsia BEFORE 20 weeks → MOLE or APS",
      "Severe features at any GA = deliver",
      "Mg toxicity → calcium gluconate",
      "ACE/ARB CONTRAINDICATED in pregnancy",
      "ASA 81 mg prevents preeclampsia in high-risk",
      "HELLP can have normal BP",
    ],
    relatedCaseIds: ["preeclampsia-severe-features", "eclampsia-mgmt"],
  },

  {
    id: "pregnancy-teratogens",
    session: 2,
    category: "OB/GYN",
    title: "Teratogens & Medications in Pregnancy",
    summary: "High-yield teratogenic patterns.",
    tables: [
      {
        caption: "Classic teratogens",
        headers: ["Drug", "Effect"],
        rows: [
          ["ACE inhibitors / ARBs", "Renal agenesis → Potter sequence, oligohydramnios"],
          ["Warfarin", "Nasal hypoplasia + stippled epiphyses (fetal warfarin syndrome)"],
          ["Isotretinoin (vit A)", "Severe craniofacial + CNS + cardiac (use iPLEDGE)"],
          ["Methotrexate", "Aminopterin syndrome — limb + craniofacial defects"],
          ["Lithium", "Ebstein anomaly (tricuspid valve)"],
          ["Methimazole (1st trim)", "Cutis aplasia (absence of skin); choanal/esophageal atresia"],
          ["Phenytoin", "Fetal hydantoin syndrome (cleft lip/palate, cardiac defects)"],
          ["Valproate", "Neural tube defects (highest risk anticonvulsant)"],
          ["Carbamazepine", "Neural tube defects + craniofacial"],
          ["Tetracyclines", "Tooth discoloration + bone growth inhibition"],
          ["Fluoroquinolones", "Cartilage damage"],
          ["Aminoglycosides", "Ototoxicity (CN VIII)"],
          ["NSAIDs (3rd trim)", "Premature ductus arteriosus closure + oligohydramnios"],
          ["Thalidomide", "Phocomelia (limb defects)"],
          ["DES (historical)", "Clear cell adenocarcinoma of vagina in daughters"],
          ["Alcohol", "Fetal alcohol syndrome (FAS) — facial dysmorphism, growth restriction, neuro"],
          ["Cocaine", "Placental abruption, IUGR, neonatal stroke"],
          ["Tobacco", "IUGR, preterm birth, placental abruption"],
        ],
      },
    ],
    sections: [
      {
        heading: "Hyperthyroidism in pregnancy",
        bullets: [
          "1st trimester: PTU (methimazole = cutis aplasia)",
          "2nd/3rd trimester: methimazole (long-term PTU = hepatotoxicity)",
          "Radioactive iodine: ABSOLUTELY CONTRAINDICATED",
          "Propranolol for symptoms",
        ],
      },
      {
        heading: "DVT/PE in pregnancy",
        bullets: [
          "LMWH preferred (does not cross placenta)",
          "AVOID warfarin and DOACs",
          "Switch to UFH near delivery",
        ],
      },
      {
        heading: "Hypertension in pregnancy",
        bullets: [
          "Safe: 'HMLN' — Hydralazine, Methyldopa, Labetalol, Nifedipine",
          "Avoid: ACEi, ARBs, atenolol, diuretics (preeclampsia)",
        ],
      },
      {
        heading: "Vaccines",
        bullets: [
          "SAFE: inactivated influenza, Tdap (27–36 wks), Hep A/B (high-risk), RSV (32–36 wks)",
          "CONTRAINDICATED (live): MMR, varicella, intranasal flu",
          "HPV: not given in pregnancy",
        ],
      },
    ],
    pearls: [
      "ACEi/ARB → Potter sequence",
      "Methimazole 1st trim → cutis aplasia (use PTU)",
      "Lithium → Ebstein anomaly",
      "Valproate → highest NTD risk among anticonvulsants",
      "NSAIDs 3rd trim → premature ductus closure",
      "Mom on isotretinoin: 2 forms of contraception + monthly pregnancy tests",
    ],
    relatedCaseIds: ["teratogen-methimazole"],
  },

  {
    id: "postpartum-comprehensive",
    session: 2,
    category: "OB/GYN",
    title: "Postpartum Complications",
    summary: "Endometritis, PPH, sepsis, peripartum CM, depression.",
    sections: [
      {
        heading: "Postpartum hemorrhage (PPH)",
        bullets: [
          "Definition: >500 mL after vaginal, >1000 mL after C/S, OR symptomatic blood loss",
          "Early (<24h) vs late (>24h, up to 6 weeks)",
          "4 T's: Tone (atony, MOST common) + Trauma + Tissue (retained placenta) + Thrombin (coagulopathy)",
          "Step ladder: massage + oxytocin → tranexamic acid → methylergonovine (avoid HTN) → carboprost (avoid asthma) → misoprostol",
          "Mechanical: bimanual compression, Bakri balloon",
          "Surgical: B-Lynch suture, uterine artery ligation/embolization, hysterectomy",
        ],
      },
      {
        heading: "Endometritis",
        bullets: [
          "Most common cause of postpartum fever days 2–10",
          "Biggest RF: cesarean delivery (×5–10 risk vs vaginal)",
          "Triad: fever + uterine tenderness + foul lochia",
          "Empiric: IV clindamycin + gentamicin (no cultures needed first)",
          "Polymicrobial — E. coli most common single",
          "Continue until afebrile 24–48 hours",
        ],
      },
      {
        heading: "Postpartum fever differential",
        bullets: [
          "Endometritis: uterine tenderness, foul lochia",
          "Surgical site infection: incision erythema/discharge",
          "Mastitis: breast pain/erythema (dicloxacillin; continue breastfeeding)",
          "Pyelonephritis: flank pain, CVA tenderness",
          "Septic pelvic thrombophlebitis: persistent fever despite abx",
          "Atelectasis: post-anesthesia, low-grade",
          "DVT/PE: chest pain, dyspnea, swelling",
        ],
      },
      {
        heading: "Mastitis vs breast abscess",
        bullets: [
          "Mastitis: unilateral erythema + induration + fever; S. aureus (also continuing to nurse helps)",
          "Treat: dicloxacillin or cephalexin × 10–14 days; continue breastfeeding",
          "Abscess: fluctuant mass — needs I&D + abx",
          "Inflammatory breast cancer: rapidly progressive, peau d'orange (DDx)",
        ],
      },
      {
        heading: "Peripartum cardiomyopathy",
        bullets: [
          "Last month of pregnancy or within 5 months postpartum",
          "Dilated cardiomyopathy, EF <45%",
          "Treat like HFrEF: diuretics + β-blocker + ACEi/ARB (POSTPARTUM only)",
          "During pregnancy: avoid ACEi/ARB, use hydralazine + nitrate",
          "Anticoagulate if EF <30% (LV thrombus risk)",
          "Recurrence risk in subsequent pregnancy is high if EF doesn't recover",
        ],
      },
      {
        heading: "Sheehan syndrome",
        bullets: [
          "Postpartum hemorrhage → pituitary infarction (pituitary doubles in pregnancy)",
          "First sign: failure to lactate (prolactin)",
          "Then: amenorrhea, hypothyroid symptoms, adrenal insufficiency",
          "Replace: hydrocortisone FIRST, then levothyroxine, then estrogen",
        ],
      },
      {
        heading: "Postpartum mood disorders",
        bullets: [
          "Postpartum blues: 2–3 days to <2 weeks; mild; reassurance",
          "Postpartum depression: 4 weeks to 12 months; SSRI + CBT",
          "Postpartum psychosis: days–weeks; delusions, hallucinations, infanticide risk → EMERGENCY hospitalization",
          "#1 RF for postpartum depression: prior history of depression",
        ],
      },
      {
        heading: "Postpartum DVT/PE",
        bullets: [
          "Highest VTE risk in 6-week postpartum period (vs nonpregnant)",
          "LMWH for treatment",
          "Prophylaxis after C/S in high-risk",
        ],
      },
      {
        heading: "Normal postpartum lochia",
        bullets: [
          "Lochia rubra: days 1–4 (red/dark)",
          "Lochia serosa: days 4–10 (pink/brown)",
          "Lochia alba: days 11–6 weeks (white/yellow)",
        ],
      },
    ],
    pearls: [
      "Postpartum fever + uterine tenderness = endometritis (clinda + gent)",
      "PPH first step: massage + oxytocin",
      "Mastitis: keep nursing + dicloxacillin",
      "Peripartum CM: ACEi after delivery only",
      "Sheehan: failure to lactate is first sign; replace cortisol BEFORE thyroid",
      "Postpartum psychosis = psychiatric emergency",
    ],
    relatedCaseIds: ["chorioamnionitis", "endometritis-postcs", "pph-atony-management", "peripartum-cardiomyopathy"],
  },

  {
    id: "ob-fetal-surveillance",
    session: 2,
    category: "OB/GYN",
    title: "Antepartum Fetal Surveillance",
    summary: "NST, BPP, CST, Doppler; oligohydramnios, post-term, IUGR.",
    sections: [
      {
        heading: "Non-stress test (NST)",
        bullets: [
          "First-line for decreased fetal movement",
          "Reactive (normal): ≥2 accelerations of ≥15 bpm × 15 sec in 20 minutes",
          "Nonreactive → proceed to BPP",
          "Acceleration confirms fetal autonomic nervous system intact",
        ],
      },
      {
        heading: "Biophysical profile (BPP)",
        bullets: [
          "5 components × 2 points = 10 max",
          "NST (reactive)",
          "Fetal breathing movements",
          "Gross body movements",
          "Fetal tone",
          "Amniotic fluid volume",
          "8–10: reassuring; 6: equivocal; ≤4: deliver",
        ],
      },
      {
        heading: "Contraction stress test (CST)",
        bullets: [
          "If BPP equivocal",
          "Late decelerations → uteroplacental insufficiency",
        ],
      },
      {
        heading: "Umbilical artery Doppler",
        bullets: [
          "End-diastolic flow: normal forward",
          "Reduced flow → placental insufficiency",
          "Absent or REVERSED end-diastolic flow → severe insufficiency → consider delivery",
        ],
      },
      {
        heading: "Oligohydramnios",
        bullets: [
          "Amniotic fluid index (AFI) <5 cm or single deepest pocket <2 cm",
          "Causes: uteroplacental insufficiency (HTN), renal agenesis (Potter), NSAIDs (indomethacin), post-term, PROM",
          "Complications: cord compression → variable decels, meconium aspiration",
          "Management: depends on cause; deliver if term and unresolving",
        ],
      },
      {
        heading: "Polyhydramnios",
        bullets: [
          "AFI >24 cm",
          "Causes: fetal swallowing/GI obstruction (esophageal/duodenal atresia, TEF), GDM, multiple gestation, anencephaly, fetal anemia",
          "Complications: preterm labor, malpresentation, cord prolapse",
        ],
      },
      {
        heading: "IUGR / Fetal growth restriction",
        bullets: [
          "Symmetric (early insult): TORCH, chromosomal, drugs/alcohol — entire body small",
          "Asymmetric (late insult): uteroplacental insufficiency — brain-sparing, smaller abdomen/liver",
          "Surveillance: serial growth US, Doppler, BPP/NST",
        ],
      },
      {
        heading: "Post-term pregnancy (>42 weeks)",
        bullets: [
          "Placental aging → ↓ perfusion → oligohydramnios + fetal distress",
          "Risks: macrosomia, meconium aspiration, stillbirth",
          ">41 weeks: increased monitoring",
          ">42 weeks: INDUCE labor",
        ],
      },
      {
        heading: "Fetal heart rate patterns",
        bullets: [
          "Normal baseline: 110–160 bpm",
          "Moderate variability (6–25 bpm): reassuring",
          "Accelerations: reassuring (autonomic intact)",
          "Early decels: head compression — benign",
          "Late decels: uteroplacental insufficiency — concerning (deliver if recurrent)",
          "Variable decels: cord compression — amnioinfusion if recurrent",
          "Category I: normal; Category II: indeterminate; Category III: abnormal (sinusoidal, absent variability + decels) → emergent delivery",
        ],
      },
    ],
    pearls: [
      "Decreased fetal movement → NST first",
      "NST nonreactive → BPP",
      "Late decels = uteroplacental insufficiency",
      "Variable decels = cord compression",
      "Sinusoidal pattern = severe fetal anemia (consider Kleihauer-Betke)",
      "Oligohydramnios → renal/placental; Polyhydramnios → swallowing/obstruction",
    ],
    relatedCaseIds: ["decreased-fetal-movement", "oligohydramnios-htn", "postterm-induction"],
  },

  {
    id: "ob-multiple-gestation",
    session: 2,
    category: "OB/GYN",
    title: "Multiple Gestation & Special Twin Topics",
    summary: "Chorionicity types, TTTS, MoMo twin management.",
    tables: [
      {
        caption: "Twin types",
        headers: ["Type", "Mechanism", "Risk profile", "Delivery"],
        rows: [
          ["Dichorionic-diamniotic (DCDA)", "Dizygotic or early MZ split <3d", "Lowest risk", "38 weeks"],
          ["Monochorionic-diamniotic (MCDA)", "MZ split day 4–8", "TTTS risk", "36–37 weeks"],
          ["Monochorionic-monoamniotic (MoMo)", "MZ split day 8–13", "Cord entanglement risk", "32–34 weeks C/S"],
          ["Conjoined", "MZ split day 13+", "Various", "Individualized"],
        ],
      },
    ],
    sections: [
      {
        heading: "Twin-twin transfusion syndrome (TTTS)",
        bullets: [
          "Only in MCDA (shared placenta with anastomoses)",
          "Donor twin: small, anemic, oligohydramnios",
          "Recipient twin: large, polycythemic, polyhydramnios, hydrops",
          "Treatment: laser ablation of placental anastomoses",
        ],
      },
      {
        heading: "Complications of multiples",
        bullets: [
          "Preterm labor (most common)",
          "Hyperemesis gravidarum (↑ β-hCG)",
          "Preeclampsia",
          "Gestational diabetes",
          "Anemia",
          "Malpresentation",
          "PPH (uterine atony from overdistention)",
        ],
      },
    ],
    pearls: [
      "MoMo twins: deliver C/S at 32–34 weeks (cord entanglement)",
      "MCDA: monitor for TTTS",
      "MZ split timing determines chorionicity (earlier = more separate)",
      "Multiples = ↑ risk of every OB complication",
    ],
    relatedCaseIds: ["twin-pregnancy-mc-mc"],
  },

  {
    id: "gyn-amenorrhea-pcos",
    session: 2,
    category: "OB/GYN",
    title: "PCOS & Amenorrhea Workup",
    summary: "Primary vs secondary amenorrhea; PCOS management.",
    sections: [
      {
        heading: "Primary amenorrhea (no menses by 15)",
        bullets: [
          "Breasts present (estrogen working):",
          "  Uterus absent: Müllerian agenesis (46,XX) vs androgen insensitivity (46,XY)",
          "  Uterus present: outflow obstruction (imperforate hymen, vaginal septum)",
          "Breasts absent:",
          "  Low FSH: hypothalamic/pituitary (Kallmann)",
          "  High FSH: gonadal failure (Turner 45,XO)",
        ],
      },
      {
        heading: "Secondary amenorrhea (cessation ≥3 months)",
        bullets: [
          "First: pregnancy test (β-hCG)",
          "Then: TSH, prolactin",
          "If prolactin high: MRI pituitary (prolactinoma)",
          "If normal: FSH",
          "  High FSH: premature ovarian failure",
          "  Low FSH: hypothalamic amenorrhea (anorexia, athletes, stress)",
          "  Normal FSH: PCOS, Asherman, outflow",
          "Progesterone challenge: withdrawal bleed = anovulation; no bleed = hypoestrogenic OR outflow",
        ],
      },
      {
        heading: "PCOS (Rotterdam criteria — 2 of 3)",
        bullets: [
          "Oligo/anovulation",
          "Hyperandrogenism (clinical or biochemical)",
          "Polycystic ovaries on US",
          "Associated: insulin resistance, metabolic syndrome, T2DM, OSA, NAFLD",
          "Endometrial cancer risk from chronic anovulation",
        ],
      },
      {
        heading: "PCOS management",
        bullets: [
          "Not pregnant: COCs (first-line — menstrual regulation + anti-androgen)",
          "Spironolactone for hirsutism/acne",
          "Metformin for insulin resistance",
          "Weight loss + lifestyle",
          "Pregnant: letrozole first-line (over clomiphene)",
          "Acanthosis nigricans suggests insulin resistance",
        ],
      },
    ],
    pearls: [
      "Always pregnancy test first in secondary amenorrhea",
      "Müllerian agenesis: 46,XX, normal T, no uterus, normal breast",
      "Androgen insensitivity: 46,XY, high T, no uterus, no axillary/pubic hair, female phenotype",
      "PCOS endometrial cancer risk → progestin to protect",
      "Letrozole > clomiphene for PCOS infertility (less multiples, better live birth)",
    ],
    relatedCaseIds: ["pcos-management"],
  },

  {
    id: "gyn-cancers",
    session: 2,
    category: "OB/GYN",
    title: "Gynecologic Cancers",
    summary: "Endometrial, ovarian, cervical, vulvar cancers.",
    sections: [
      {
        heading: "Endometrial cancer",
        bullets: [
          "Most common gynecologic malignancy in developed countries",
          "Postmenopausal bleeding = endometrial cancer until proven otherwise → endometrial biopsy",
          "RFs: unopposed estrogen, obesity, PCOS, nulliparity, late menopause, tamoxifen, Lynch syndrome",
          "Type I (endometrioid): estrogen-driven, better prognosis",
          "Type II (serous, clear cell): older, aggressive, p53",
          "TVUS endometrial stripe ≤4 mm in postmenopausal: reassuring",
          "Tx: total hysterectomy + BSO ± lymph node dissection",
        ],
      },
      {
        heading: "Ovarian cancer",
        bullets: [
          "5th leading cause of cancer death in women",
          "'Silent killer' — usually advanced at diagnosis",
          "Symptoms: bloating, pelvic pain, early satiety, urinary symptoms",
          "RFs: family history (BRCA), age, nulliparity, infertility, Lynch",
          "Protective: OCPs, breastfeeding, pregnancy",
          "Markers: CA-125 (elevated but not specific), HE4, alpha-fetoprotein (yolk sac), β-hCG (choriocarcinoma), LDH (dysgerminoma)",
          "Tx: surgical debulking + platinum-based chemo",
          "BRCA1/2: consider prophylactic BSO after childbearing complete",
        ],
      },
      {
        heading: "Cervical cancer",
        bullets: [
          "Caused by high-risk HPV (16, 18, others)",
          "Vaccine: 11–12 (catch-up to 26)",
          "Screening: Pap 21–29 q3y; 30–65 Pap+HPV q5y",
          "Squamous cell most common (HPV); adenocarcinoma less common",
          "Tx: cone biopsy for early → radical hysterectomy ± chemoradiation",
        ],
      },
      {
        heading: "Vulvar cancer",
        bullets: [
          "Postmenopausal women",
          "Mostly squamous cell (HPV-related or lichen sclerosus background)",
          "Biopsy any persistent lesion",
          "Tx: wide local excision ± vulvectomy + LN dissection",
        ],
      },
      {
        heading: "Gestational trophoblastic disease (GTD)",
        bullets: [
          "Spectrum: complete mole → partial mole → invasive mole → choriocarcinoma → placental site trophoblastic tumor",
          "Choriocarcinoma: hematogenous spread (lungs); very chemo-sensitive (methotrexate)",
          "Persistent ↑ β-hCG after mole evacuation → suspect malignant GTD",
        ],
      },
    ],
    pearls: [
      "Postmenopausal bleeding = endometrial biopsy",
      "Ovarian 'silent killer' — vague abdominal symptoms",
      "BRCA: consider prophylactic BSO after childbearing",
      "Cervical cancer: HPV vaccine + screening prevents most",
      "Choriocarcinoma: highly chemosensitive (methotrexate)",
    ],
    relatedCaseIds: ["endometrial-cancer-bleeding"],
  },

  {
    id: "gyn-benign",
    session: 2,
    category: "OB/GYN",
    title: "Benign Gynecologic Conditions",
    summary: "Fibroids, endometriosis, adenomyosis, ovarian cysts, lichen sclerosus.",
    sections: [
      {
        heading: "Uterine leiomyomas (fibroids)",
        bullets: [
          "Most common pelvic tumor in reproductive-age women",
          "Symptoms: heavy menstrual bleeding, bulk symptoms (urinary frequency, pelvic pressure)",
          "Enlarged irregular uterus on bimanual exam",
          "Confirm with TVUS",
          "Tx: NSAIDs, OCPs, LNG-IUD, GnRH agonists; UAE; myomectomy; hysterectomy",
        ],
      },
      {
        heading: "Adenomyosis",
        bullets: [
          "Endometrial glands within myometrium",
          "Boggy, ENLARGED, tender uterus",
          "Menorrhagia + dysmenorrhea",
          "MRI confirms (vs fibroids: discrete masses)",
          "Tx: NSAIDs, hormonal therapy, hysterectomy",
        ],
      },
      {
        heading: "Endometriosis",
        bullets: [
          "Endometrial tissue OUTSIDE uterus",
          "Classic triad: chronic pelvic pain + dysmenorrhea + deep dyspareunia",
          "Dyschezia (rectal), infertility",
          "Gold standard dx: laparoscopy with biopsy",
          "Tx: NSAIDs + COCs → progestins → GnRH agonists → laparoscopic excision",
          "Letrozole or IVF for fertility",
        ],
      },
      {
        heading: "Ovarian cysts",
        bullets: [
          "Functional: follicular (most common), corpus luteum",
          "Dermoid (mature cystic teratoma): hair, teeth, sebum",
          "Endometrioma ('chocolate cyst'): endometriosis",
          "Management depends on size + characteristics + age",
          "Simple cyst <5 cm in premenopausal: observe",
          "Complex or postmenopausal: surgical evaluation",
        ],
      },
      {
        heading: "Ovarian torsion",
        bullets: [
          "Sudden severe unilateral pain + N/V + adnexal mass",
          "RFs: ovarian mass >5 cm, pregnancy, fertility treatment",
          "Doppler may show ↓ flow (but normal flow doesn't rule out)",
          "Emergent laparoscopy with detorsion ± cystectomy",
          "Right > left (sigmoid protects)",
        ],
      },
      {
        heading: "PID (pelvic inflammatory disease)",
        bullets: [
          "Lower abd pain + CMT + adnexal tenderness",
          "Treat empirically (don't wait for cultures)",
          "Outpatient: ceftriaxone IM + doxycycline ± metronidazole",
          "Inpatient: cefoxitin/cefotetan + doxycycline (if pregnant, severe, TOA, no response)",
          "Complications: infertility, ectopic, chronic pain, Fitz-Hugh-Curtis (perihepatitis)",
        ],
      },
      {
        heading: "Lichen sclerosus",
        bullets: [
          "Postmenopausal vulvar pruritus + atrophic white patches in figure-of-eight",
          "Risk of vulvar SCC (biopsy if suspicious)",
          "Treat: high-potency topical corticosteroid (clobetasol)",
        ],
      },
      {
        heading: "Bartholin gland cyst/abscess",
        bullets: [
          "Vulvar swelling, may be tender if abscess",
          "Cyst: observation if asymptomatic",
          "Abscess: I&D + Word catheter or marsupialization",
          "If recurrent or postmenopausal: biopsy (rule out cancer)",
        ],
      },
    ],
    pearls: [
      "Endometriosis triad: chronic pelvic pain + dysmenorrhea + deep dyspareunia",
      "Adenomyosis: ENLARGED boggy uterus + menorrhagia",
      "Fibroids: enlarged IRREGULAR uterus",
      "Ovarian torsion: emergent surgery to preserve fertility",
      "Lichen sclerosus: clobetasol + biopsy if suspicious",
    ],
    relatedCaseIds: ["uterine-fibroids", "endometriosis-classic", "ovarian-torsion", "pid-diagnosis", "lichen-sclerosus"],
  },

  // ═══════════════════════════════════════════════════════════════════
  // APEX 5 + 6 — RHEUM, DERM, HEME / ONC, ENDO
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "rheum-comprehensive",
    session: 2,
    category: "Rheumatology",
    title: "Connective tissue diseases — comprehensive",
    summary:
      "SLE, Sjögren, scleroderma/CREST, polymyalgia rheumatica, dermatomyositis, polymyositis, fibromyalgia.",
    sections: [
      {
        heading: "SLE (systemic lupus erythematosus)",
        bullets: [
          "Young women, especially Black/Hispanic/Asian",
          "Classic features: malar rash sparing nasolabial folds, oral ulcers, photosensitivity, serositis, arthritis, nephritis",
          "ANA highly sensitive (98%); anti-dsDNA + anti-Smith are specific; low complement (C3/C4) during flares",
          "Antiphospholipid syndrome (lupus anticoagulant, anti-β2-GP1) → thromboses, miscarriage",
          "Lupus nephritis: classes I–VI; class III/IV (proliferative) need biopsy + immunosuppression",
          "Treatment: hydroxychloroquine ALWAYS; steroids for flares; MMF/cyclophosphamide for severe nephritis",
        ],
      },
      {
        heading: "Sjögren syndrome",
        bullets: [
          "Dry eyes (keratoconjunctivitis sicca) + dry mouth (xerostomia) + parotid enlargement",
          "Anti-Ro (SSA) and anti-La (SSB) antibodies",
          "Schirmer test + lip biopsy (focal lymphocytic infiltrate) confirm",
          "Associations: RA, SLE, primary biliary cholangitis",
          "↑ risk of B-cell lymphoma (MALT in salivary glands)",
          "Treatment: artificial tears, pilocarpine for xerostomia, hydroxychloroquine for arthralgias",
        ],
      },
      {
        heading: "Systemic sclerosis (scleroderma)",
        bullets: [
          "Diffuse: rapid skin thickening (trunk + proximal extremities), interstitial lung disease (ILD), renal crisis — anti-Scl-70 (topoisomerase I)",
          "Limited (CREST): Calcinosis, Raynaud, Esophageal dysmotility, Sclerodactyly, Telangiectasias — anti-centromere antibody",
          "Pulmonary hypertension is the leading cause of death in CREST",
          "ILD is the leading cause of death in diffuse scleroderma",
          "Scleroderma renal crisis: severe HTN + AKI → ACE-INHIBITORS first-line (one of the few times ACE-I is used in scleroderma)",
          "No disease-modifying therapy; symptom-targeted: PPIs for GERD, CCBs for Raynaud, sildenafil/bosentan for PAH",
        ],
      },
      {
        heading: "Polymyositis & dermatomyositis",
        bullets: [
          "Symmetric proximal weakness over weeks-months; difficulty climbing stairs, brushing hair",
          "Dermatomyositis adds: heliotrope rash (eyelids), Gottron papules (MCPs), shawl sign, mechanic hands",
          "CK markedly elevated; anti-Jo-1 (antisynthetase syndrome with ILD), anti-Mi-2 (DM with classic skin), anti-SRP (severe necrotizing)",
          "Strong association with malignancy in DM > PM — screen at diagnosis",
          "Treatment: high-dose steroids + MTX or azathioprine; IVIG for severe; rituximab refractory",
        ],
      },
      {
        heading: "Polymyalgia rheumatica & fibromyalgia",
        bullets: [
          "PMR: age >50, bilateral proximal stiffness >30 min, ↑ ESR (often >50), NORMAL CK; rapid response to low-dose prednisone",
          "PMR coexists with GCA in 40–50% — always screen for headache/jaw claudication/visual",
          "Fibromyalgia: widespread pain >3 months, multiple tender points, NORMAL labs, sleep disturbance, fatigue",
          "Fibro management: aerobic exercise, CBT, amitriptyline, duloxetine, pregabalin — NOT opioids, NOT steroids",
        ],
      },
    ],
    tables: [
      {
        caption: "Autoantibody quick reference",
        headers: ["Antibody", "Disease"],
        rows: [
          ["Anti-dsDNA", "SLE (specific; correlates with nephritis)"],
          ["Anti-Smith", "SLE (highly specific)"],
          ["Anti-Ro/SSA, anti-La/SSB", "Sjögren (also neonatal lupus, subacute cutaneous SLE)"],
          ["Anti-centromere", "Limited scleroderma (CREST)"],
          ["Anti-Scl-70 (topoisomerase)", "Diffuse scleroderma"],
          ["Anti-Jo-1", "Antisynthetase syndrome (PM/DM with ILD)"],
          ["Anti-Mi-2", "Dermatomyositis (classic skin findings)"],
          ["Anti-U1 RNP", "Mixed connective tissue disease"],
          ["c-ANCA (anti-PR3)", "GPA (Wegener)"],
          ["p-ANCA (anti-MPO)", "MPA, EGPA"],
        ],
      },
    ],
    pearls: [
      "Hydroxychloroquine for ALL SLE — reduces flares and mortality",
      "Scleroderma renal crisis is the one time you reach for an ACE-I (captopril) immediately",
      "Sjögren has the highest B-cell (MALT) lymphoma risk of any rheum disease",
      "DM + new diagnosis → age-appropriate cancer screening (ovarian, lung, GI)",
      "Fibromyalgia diagnosis is clinical with NORMAL labs — exclude RA, hypothyroid, vitamin D deficiency first",
    ],
    relatedCaseIds: ["pmr-gca", "dermatomyositis", "polymyalgia-rheumatica", "behcet-syndrome"],
  },

  {
    id: "derm-comprehensive-skin",
    session: 2,
    category: "Dermatology",
    title: "Dermatology — high-yield patterns",
    summary:
      "Tinea, scabies, eczema herpeticum, skin cancers, SJS/TEN, drug eruptions, vitiligo, burns.",
    sections: [
      {
        heading: "Superficial infections",
        bullets: [
          "Tinea corporis: annular scaly plaque with central clearing, KOH-positive hyphae — TOPICAL antifungal (terbinafine, clotrimazole)",
          "Tinea capitis: scaly alopecic patch with black dots in children — ORAL griseofulvin or terbinafine (topical doesn't penetrate hair shaft)",
          "Pityriasis versicolor: hypo/hyperpigmented trunk patches, KOH 'spaghetti and meatballs' — topical selenium sulfide or topical antifungal",
          "Scabies: severe nocturnal itch, web spaces / flexor wrists / waist papules — topical permethrin for patient AND household, wash linens",
          "Impetigo: honey-colored crusts in children — topical mupirocin (or oral cephalexin for extensive); Group A Strep / S. aureus",
        ],
      },
      {
        heading: "Eczema spectrum",
        bullets: [
          "Atopic dermatitis: chronic itchy flexural rash; associated with asthma, allergic rhinitis (atopic triad)",
          "Treatment: emollients, topical steroids (low potency face/folds), topical calcineurin inhibitors (tacrolimus, pimecrolimus), dupilumab for severe",
          "Eczema herpeticum: sudden vesicular eruption with punched-out erosions on eczema — IV acyclovir; ophthalmology if periocular",
          "Contact dermatitis (type IV): linear/geometric pattern matching exposure (nickel, poison ivy) — avoid trigger, topical steroids",
        ],
      },
      {
        heading: "Skin cancers",
        bullets: [
          "Basal cell carcinoma: pearly papule, telangiectasias, rolled borders, slow growing, rare metastasis — Mohs surgery for face/recurrent",
          "Squamous cell carcinoma: hyperkeratotic, ulcerated; sun-exposed; transplant patients — surgical excision; can metastasize",
          "Actinic keratosis: rough scaly precursor to SCC — cryotherapy or topical 5-FU/imiquimod",
          "Melanoma: ABCDE — Asymmetry, Border irregular, Color varied, Diameter >6 mm, Evolution; thickness (Breslow depth) determines prognosis",
          "Melanoma: wide local excision + sentinel lymph node biopsy if depth ≥0.8 mm; immunotherapy for metastatic (anti-PD1, anti-CTLA4)",
        ],
      },
      {
        heading: "Severe drug eruptions",
        bullets: [
          "SJS / TEN: lamotrigine, allopurinol, sulfa, anticonvulsants, NSAIDs — stop drug, burn unit, supportive care",
          "DRESS: drug rash + eosinophilia + systemic sx (fever, LFTs, kidney) — 2–8 weeks after drug; stop drug, steroids",
          "Erythema multiforme: target lesions, HSV-triggered most common — supportive; treat HSV trigger",
          "AGEP: acute generalized exanthematous pustulosis — antibiotics; self-limited",
        ],
      },
      {
        heading: "Other classic findings",
        bullets: [
          "Vitiligo: sharply demarcated depigmented patches, Wood lamp accentuation, autoimmune associations (thyroid, T1DM) — topical steroids, calcineurin inhibitors, UV phototherapy",
          "Erythema nodosum: tender red nodules on shins; sarcoidosis, IBD, strep, OCPs, TB — find trigger, NSAIDs, treat cause",
          "Pyoderma gangrenosum: rapidly enlarging painful ulcer with violaceous edge; IBD, RA — steroids; do NOT debride (pathergy)",
          "Lipoma: soft mobile painless subcutaneous mass; observe unless symptomatic",
          "Sister Mary Joseph nodule: periumbilical metastatic node — GI/GU malignancy",
        ],
      },
      {
        heading: "Burns",
        bullets: [
          "Superficial (1st): erythema only, painful — supportive (aloe, NSAIDs)",
          "Partial-thickness (2nd): blisters, painful — wound care, topical antibiotics (silver sulfadiazine — NOT in sulfa allergy/face)",
          "Full-thickness (3rd): leathery, painless, white/charred — surgical excision + skin grafting",
          "Parkland formula: 4 mL × kg × % BSA burned (lactated Ringers) over 24 hours, half in first 8 hours",
          "Burns >20% BSA or to face/hands/perineum → transfer to burn center",
          "Inhalation injury (carbonaceous sputum, hoarseness, facial burns) → early intubation",
        ],
      },
    ],
    pearls: [
      "Pearly papule + telangiectasia + sun-exposed face = BCC — Mohs surgery",
      "Punched-out vesicles on eczema = eczema herpeticum → IV acyclovir, NOT steroids",
      "Severe nocturnal pruritus + household members itching = scabies → permethrin for everyone, wash bedding",
      "Tinea CAPITIS needs ORAL antifungal (topical can't penetrate hair shaft)",
      "Sudden eruption of many seborrheic keratoses (Leser-Trélat sign) → think GI malignancy",
    ],
    relatedCaseIds: ["sjs-ten-anticonvulsant", "necrotizing-fasciitis", "eczema-herpeticum"],
  },

  {
    id: "heme-anemia-comprehensive",
    session: 2,
    category: "Hematology",
    title: "Anemia — by MCV, comprehensively",
    summary:
      "Microcytic, normocytic, macrocytic causes — and the smear findings that nail each one.",
    sections: [
      {
        heading: "Microcytic (MCV < 80)",
        bullets: [
          "Iron deficiency: ↓ ferritin (most specific), ↑ TIBC, ↓ transferrin saturation; pica; blood loss until proven otherwise",
          "Anemia of chronic disease: ↑ ferritin (acute-phase), ↓ TIBC, normal-low serum iron; treat underlying inflammation",
          "Thalassemia: target cells, basophilic stippling; trait → microcytic with NORMAL iron studies; α has 4 alleles, β has 2",
          "Sideroblastic anemia: ringed sideroblasts on marrow; causes: lead, alcohol, isoniazid (give B6), copper deficiency, MDS",
          "Lead poisoning: basophilic stippling, microcytic anemia, abdominal pain, neuropathy; check serum lead; chelate with succimer (peds) or EDTA",
        ],
      },
      {
        heading: "Normocytic (MCV 80–100)",
        bullets: [
          "Anemia of chronic kidney disease: ↓ EPO; treat with EPO replacement when Hb <10, iron stores adequate",
          "Hemolysis: ↑ LDH, ↑ indirect bili, ↓ haptoglobin, ↑ reticulocytes",
          "Hereditary spherocytosis: NORTHERN European, family history, ↑ MCHC, NEGATIVE Coombs, splenomegaly; splenectomy if severe",
          "G6PD deficiency: oxidative stress (sulfa, antimalarials, fava beans, infections) → bite cells + Heinz bodies; check level after acute episode resolves",
          "Warm AIHA: IgG, spherocytes, POSITIVE direct Coombs; SLE, CLL, drugs (methyldopa); steroids first-line",
          "Cold AIHA: IgM, Mycoplasma, EBV; cold avoidance; rituximab refractory",
          "MAHA: schistocytes; TTP/HUS/DIC/HELLP/malignant HTN/mechanical valves",
        ],
      },
      {
        heading: "Macrocytic (MCV > 100)",
        bullets: [
          "B12 deficiency: ↑ MMA + ↑ homocysteine; neuro symptoms (subacute combined degeneration); pernicious anemia (autoimmune anti-IF), strict vegan, ileal disease",
          "Folate deficiency: ↑ homocysteine + NORMAL MMA; no neuro symptoms; alcoholics, methotrexate, pregnancy",
          "Non-megaloblastic: alcohol, liver disease, hypothyroidism, MDS, drugs (hydroxyurea, zidovudine)",
          "Reticulocytosis: any cause of hemolysis or recent bleeding can cause apparent macrocytosis",
        ],
      },
      {
        heading: "Special situations",
        bullets: [
          "Sickle cell disease: vaso-occlusive crisis, acute chest syndrome, splenic sequestration in kids, aplastic crisis (parvovirus B19)",
          "Hydroxyurea reduces SCD crises; transfusions for severe; vaccinations critical (Pneumococcus, Hib, Meningococcus due to functional asplenia)",
          "Paroxysmal nocturnal hemoglobinuria: morning dark urine + thrombosis + pancytopenia; CD55/CD59 deficiency; eculizumab",
          "Aplastic anemia: pancytopenia + hypocellular marrow + NO hepatosplenomegaly; idiopathic, drugs (chloramphenicol, sulfa), viruses; stem cell transplant",
          "Pure red cell aplasia: only RBC line affected; parvovirus B19 (esp in immunocompromised) or thymoma",
        ],
      },
    ],
    tables: [
      {
        caption: "Smear findings ↔ diagnosis",
        headers: ["Smear finding", "Diagnosis"],
        rows: [
          ["Target cells", "Thalassemia, HbC, liver disease, asplenia"],
          ["Schistocytes", "MAHA (TTP/HUS/DIC/HELLP)"],
          ["Spherocytes", "Hereditary spherocytosis, warm AIHA"],
          ["Bite cells / Heinz bodies", "G6PD deficiency"],
          ["Basophilic stippling", "Lead poisoning, thalassemia"],
          ["Howell-Jolly bodies", "Asplenia (functional or surgical)"],
          ["Ringed sideroblasts", "Sideroblastic anemia, MDS"],
          ["Tear drop cells", "Myelofibrosis"],
          ["Hypersegmented neutrophils", "B12 / folate deficiency"],
          ["Auer rods", "AML (APL has the most)"],
        ],
      },
    ],
    pearls: [
      "B12 deficiency: ↑ MMA AND ↑ homocysteine; folate deficiency only ↑ homocysteine (MMA normal)",
      "↑ ferritin + ↓ TIBC in chronic inflammation = anemia of chronic disease (not iron deficiency)",
      "Microcytic anemia + NORMAL iron studies + ↑ HbA2 = β-thalassemia trait — DO NOT give iron",
      "Negative Coombs + spherocytes + family history = hereditary spherocytosis (not warm AIHA)",
      "Mechanical valve + chronic anemia + schistocytes = valve hemolysis → echo to assess paravalvular leak",
    ],
    relatedCaseIds: ["iron-deficiency-pica", "g6pd-deficiency", "ttp", "hus-pediatric", "acute-chest-syndrome"],
  },

  {
    id: "heme-onc-comprehensive",
    session: 2,
    category: "Hematology",
    title: "Leukemias, lymphomas & oncologic emergencies",
    summary:
      "Acute & chronic leukemias, Hodgkin vs NHL, plus tumor lysis / febrile neutropenia / cord compression / SVC syndrome.",
    sections: [
      {
        heading: "Acute leukemias",
        bullets: [
          "ALL: kids, pancytopenia, hepatosplenomegaly, bone pain, mediastinal mass (T-cell) — treat with combination chemo + CNS prophylaxis",
          "AML: adults, Auer rods, gum hypertrophy (M5), DIC (M3 = APL)",
          "APL (M3): t(15;17), Auer rods bundles, DIC — start ATRA empirically (don't wait for genetics)",
          "AML risk: prior chemo (alkylators), radiation, MDS, Down syndrome, benzene",
          "Diagnosis: ≥20% blasts in marrow",
        ],
      },
      {
        heading: "Chronic leukemias & myeloproliferative",
        bullets: [
          "CLL: elderly, smudge cells, indolent, often asymptomatic — observation if early; treat with ibrutinib / venetoclax / chemoimmunotherapy when symptomatic",
          "CLL complications: hypogammaglobulinemia (infections), AIHA, Richter transformation to DLBCL",
          "CML: BCR-ABL t(9;22), massive splenomegaly, basophilia — imatinib (TKI); monitor BCR-ABL PCR",
          "Hairy cell leukemia: middle-aged men, massive splenomegaly, pancytopenia, hairy cells with TRAP positivity — cladribine",
          "Polycythemia vera: JAK2 V617F, pruritus after hot showers, erythromelalgia — phlebotomy + ASA",
          "Essential thrombocythemia: platelets >450k, JAK2/CALR/MPL — ASA + hydroxyurea if high-risk",
          "Myelofibrosis: tear drop cells, leukoerythroblastic blood, massive splenomegaly — ruxolitinib, allogeneic SCT in young fit",
        ],
      },
      {
        heading: "Lymphomas",
        bullets: [
          "Hodgkin: Reed-Sternberg cells (CD15+ CD30+), bimodal age, B symptoms, contiguous nodal spread, EBV-associated — ABVD chemo, highly curable",
          "Hodgkin alcohol-induced node pain (rare but classic)",
          "NHL: more common than HD, NON-contiguous spread, extranodal involvement common",
          "DLBCL: most common NHL, aggressive but curable — R-CHOP",
          "Follicular: indolent, t(14;18) BCL-2 — watchful waiting if asymptomatic; rituximab + chemo when symptomatic",
          "Burkitt: c-MYC t(8;14), highest mitotic rate, starry sky — aggressive curative chemo, TLS prophylaxis essential",
          "MALT lymphoma (stomach): H. pylori → triple therapy can be curative if low-grade",
        ],
      },
      {
        heading: "Plasma cell disorders",
        bullets: [
          "MGUS: M-spike < 3 g/dL, marrow <10% plasma cells, NO end-organ damage — observe, ~1%/yr to myeloma",
          "Multiple myeloma: CRAB (Calcium ↑, Renal failure, Anemia, Bone lytic), M-spike, ≥10% clonal plasma cells",
          "MM workup: SPEP, UPEP, serum free light chains, X-rays (NOT bone scan), bone marrow",
          "Waldenström: IgM monoclonal gammopathy, hyperviscosity syndrome (headache, blurry vision, retinal vein engorgement)",
        ],
      },
      {
        heading: "Oncologic emergencies",
        bullets: [
          "Tumor lysis: high cell-turnover tumors post-chemo (Burkitt, ALL); ↑ K, ↑ PO4, ↓ Ca, AKI — IV fluids + rasburicase",
          "Febrile neutropenia: ANC <500 + fever >38.3 once or >38.0 sustained → cultures + empiric pip-tazo/cefepime within 1 hour",
          "Spinal cord compression: back pain + neurologic deficits + known malignancy → emergent MRI + IV dexamethasone + radiation/surgery",
          "SVC syndrome: facial/upper extremity edema, JVD, dyspnea; lung cancer (small cell), lymphoma → CT, biopsy, radiation, stenting",
          "Hypercalcemia of malignancy: PTH suppressed, PTHrP elevated → IV fluids + bisphosphonate (zoledronic acid) + calcitonin for acute",
          "Hyperleukocytosis: WBC >100k in AML → leukapheresis + induction; risk of leukostasis (CNS, lung)",
        ],
      },
    ],
    tables: [
      {
        caption: "Translocations to know",
        headers: ["Translocation", "Disease"],
        rows: [
          ["t(9;22) BCR-ABL", "CML (Philadelphia chromosome); also ALL"],
          ["t(15;17) PML-RARA", "APL (M3 AML)"],
          ["t(8;14) c-MYC", "Burkitt lymphoma"],
          ["t(14;18) BCL-2", "Follicular lymphoma"],
          ["t(11;14) cyclin D1", "Mantle cell lymphoma"],
          ["t(8;21), inv(16)", "Favorable AML"],
        ],
      },
    ],
    pearls: [
      "Auer rods + DIC + bleeding = APL → start ATRA IMMEDIATELY",
      "CLL is the most common adult leukemia in Western countries — smudge cells are pathognomonic",
      "Elderly patient + lytic skull lesions + hypercalcemia + renal failure = multiple myeloma (CRAB)",
      "Burkitt and high-grade NHL → high tumor lysis risk; pre-hydrate + rasburicase",
      "Febrile neutropenia: get cultures BUT start antibiotics within 60 min — don't wait",
    ],
    relatedCaseIds: ["apl-emergency", "cml-imatinib", "burkitt-lymphoma", "hodgkin-lymphoma", "multiple-myeloma", "tumor-lysis-syndrome", "polycythemia-vera", "febrile-neutropenia"],
  },

  {
    id: "endo-secondary-htn-adrenal",
    session: 2,
    category: "Endocrinology",
    title: "Secondary HTN & adrenal disorders",
    summary:
      "When to look beyond essential HTN — Conn, Cushing, pheo, renovascular, CAH, adrenal insufficiency.",
    sections: [
      {
        heading: "When to suspect secondary HTN",
        bullets: [
          "Onset before age 30 or after 55",
          "Resistant HTN on ≥3 drugs at max doses",
          "Severe HTN with end-organ damage",
          "Spontaneous hypokalemia (think hyperaldosteronism)",
          "Episodic HTN with headache/palpitations/sweating (think pheo)",
          "Abdominal bruit (think renovascular)",
          "Differential arm/leg BP (think coarctation)",
        ],
      },
      {
        heading: "Primary hyperaldosteronism (Conn)",
        bullets: [
          "HTN + hypoK + metabolic alkalosis (some patients are normokalemic)",
          "Aldosterone:renin ratio (ARR) >20–30 → screen positive",
          "Confirm: saline suppression test (failure to suppress aldosterone)",
          "Adrenal CT → adrenal vein sampling to lateralize",
          "Unilateral adenoma → adrenalectomy; bilateral hyperplasia → spironolactone or eplerenone",
        ],
      },
      {
        heading: "Cushing syndrome",
        bullets: [
          "Central obesity, moon facies, buffalo hump, purple striae, easy bruising, proximal weakness, hyperglycemia, HTN",
          "Screen: 24-h urine cortisol, late-night salivary cortisol, OR 1-mg overnight dexamethasone suppression",
          "If positive → ACTH level. Low ACTH = adrenal (CT adrenals). High ACTH = pituitary (MRI) or ectopic (chest/CT)",
          "High-dose dexamethasone suppression: pituitary tumor suppresses, ectopic does not",
          "Treatment: surgical resection of tumor; ketoconazole / metyrapone bridge",
        ],
      },
      {
        heading: "Pheochromocytoma",
        bullets: [
          "Episodic HTN + headache + palpitations + diaphoresis (the 5 P's: pressure, pain, palpitations, perspiration, pallor)",
          "Screen: plasma free metanephrines (most sensitive) OR 24-h urine metanephrines",
          "Confirm + localize: CT/MRI adrenals; MIBG scan if extra-adrenal suspected",
          "Pre-op: α-blockade (phenoxybenzamine) FIRST, then β-blocker — never reverse order",
          "Surgical resection curative; check for MEN-2 (medullary thyroid CA + parathyroid)",
        ],
      },
      {
        heading: "Renovascular HTN",
        bullets: [
          "Atherosclerotic (older, smoking, CVD risk) vs Fibromuscular dysplasia (young women, 'string of beads')",
          "Clues: abdominal bruit, asymmetric kidneys, AKI on ACE-I (bilateral disease)",
          "Screen: renal artery Doppler, CTA, or MRA",
          "Treat: ACE-I/ARB if unilateral disease (NEVER bilateral); angioplasty for FMD; medical management for atherosclerotic (revasc doesn't improve outcomes in most)",
        ],
      },
      {
        heading: "Adrenal insufficiency",
        bullets: [
          "Primary (Addison): adrenal destruction → ↑ ACTH → hyperpigmentation, hypoglycemia, hyperK, hypoNa, hypotension",
          "Secondary: pituitary failure → normal K (mineralocorticoid intact), no hyperpigmentation",
          "Test: AM cortisol < 3 = deficient; > 15 = excludes; intermediate → cosyntropin stim test",
          "Acute (Addisonian crisis): hypotension + AMS + electrolyte chaos → STRESS-dose hydrocortisone 100 mg IV, fluids",
          "Chronic: replace hydrocortisone (or prednisone) + fludrocortisone (if primary)",
        ],
      },
      {
        heading: "Congenital adrenal hyperplasia",
        bullets: [
          "21-hydroxylase deficiency (most common): salt-wasting crisis + ambiguous genitalia in girls, virilization; ↑ 17-OH progesterone",
          "11β-hydroxylase deficiency: HTN + virilization (excess 11-deoxycortisol has mineralocorticoid activity)",
          "17α-hydroxylase deficiency: HTN + hypoK + no virilization + lack of secondary sex characteristics",
          "Treat: hydrocortisone (+ fludrocortisone for salt-wasting); surgical correction of genitalia",
        ],
      },
    ],
    tables: [
      {
        caption: "Secondary HTN pattern recognition",
        headers: ["Clinical clue", "Diagnosis"],
        rows: [
          ["HTN + hypoK + alkalosis", "Primary hyperaldosteronism"],
          ["Central obesity + striae + HTN", "Cushing syndrome"],
          ["Episodic HTN + headache + palpitations", "Pheochromocytoma"],
          ["Abdominal bruit + young woman", "FMD (renovascular HTN)"],
          ["BP differential arm vs leg", "Coarctation of aorta"],
          ["HTN + virilization", "11β-hydroxylase CAH"],
          ["HTN + hypoK + no virilization", "17α-hydroxylase CAH"],
          ["Hyperpigmentation + hyperK + hypotension", "Primary adrenal insufficiency (Addison)"],
        ],
      },
    ],
    pearls: [
      "Pheo: α-blockade BEFORE β-blockade (or unopposed α causes hypertensive crisis)",
      "Acute adrenal crisis: don't wait for labs — give IV hydrocortisone 100 mg + IV fluids",
      "HTN + hypokalemia in a young patient is the classic Conn syndrome clue",
      "Bilateral renal artery stenosis + ACE-I → AKI (the canonical pre-renal AZOTEMIA scenario)",
      "MEN-2 = medullary thyroid CA + pheo + parathyroid; screen for pheo BEFORE thyroid surgery",
    ],
    relatedCaseIds: ["primary-hyperaldosteronism", "fibromuscular-dysplasia"],
  },

  // ═══════════════════════════════════════════════════════════════════
  // PHARMACOLOGY — HIGH-YIELD DRUG CLASSES
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "pharm-anticoagulants",
    session: 2,
    category: "Pharmacology",
    title: "Anticoagulants — warfarin, heparin, LMWH, DOACs",
    summary: "Mechanism, monitoring, reversal, and when to pick which agent.",
    sections: [
      {
        heading: "Mechanism & monitoring",
        bullets: [
          "Unfractionated heparin (UFH): activates antithrombin → inhibits IIa + Xa; monitor aPTT (or anti-Xa); reversed by protamine",
          "Low molecular weight heparin (LMWH, enoxaparin): inhibits Xa >> IIa; monitor anti-Xa (only in renal failure, pregnancy, extremes of weight); partial reversal with protamine",
          "Warfarin: inhibits vitamin K epoxide reductase → ↓ factors II, VII, IX, X (and proteins C, S); monitor INR (target 2–3, or 2.5–3.5 for mechanical mitral valve)",
          "DOACs: apixaban, rivaroxaban, edoxaban (anti-Xa); dabigatran (anti-IIa); no routine monitoring; renal clearance matters",
        ],
      },
      {
        heading: "Reversal agents",
        bullets: [
          "Warfarin: vitamin K (PO/IV) + 4-factor PCC (immediate) or FFP (slower)",
          "Heparin: protamine sulfate (1 mg per 100 units UFH)",
          "Dabigatran: idarucizumab",
          "Apixaban / rivaroxaban: andexanet alfa (or 4-factor PCC if not available)",
        ],
      },
      {
        heading: "When to pick which",
        bullets: [
          "Acute DVT/PE, hemodynamically stable: DOAC (apixaban or rivaroxaban) → continue ≥3 mo (longer if unprovoked)",
          "Pregnancy: LMWH (preferred); NEVER warfarin (teratogen) or DOACs (no data, placenta-crossing)",
          "Mechanical heart valve: WARFARIN only (DOACs failed RE-ALIGN trial)",
          "Severe renal failure (CrCl <15–30): warfarin or UFH; DOACs/LMWH require dose adjustment or avoidance",
          "Active cancer-associated VTE: DOAC (apixaban) or LMWH",
          "AFib + valvular (moderate–severe MS): WARFARIN; DOACs in non-valvular only",
        ],
      },
      {
        heading: "Heparin-induced thrombocytopenia (HIT)",
        bullets: [
          "Suspect: platelet drop >50% from baseline OR <100,000 between days 5–14 of heparin (sooner if prior exposure)",
          "Paradoxical thrombosis (arterial or venous) despite low platelets",
          "Stop ALL heparin (including LMWH and flushes); start argatroban or fondaparinux (no platelet effect)",
          "Do NOT give warfarin until platelets recover and on alternative anticoag (risk of skin necrosis)",
          "4Ts score for pretest probability; confirm with anti-PF4 ELISA → serotonin release assay if equivocal",
        ],
      },
      {
        heading: "Other key warnings",
        bullets: [
          "Warfarin skin necrosis: paradoxical clotting in first 5 days (protein C deficiency unmasked) — bridge with heparin",
          "Warfarin teratogen: fetal warfarin syndrome (nasal hypoplasia, stippled epiphyses), CNS abnormalities",
          "Long-term warfarin: hair loss, purple toe syndrome (cholesterol embolization), osteoporosis",
          "DOACs: do not crush enteric-coated formulations; check for drug interactions (CYP3A4 inducers ↓ levels)",
        ],
      },
    ],
    tables: [
      {
        caption: "Anticoagulant comparison",
        headers: ["Drug", "Reversal / monitoring"],
        rows: [
          ["UFH", "Protamine; aPTT"],
          ["LMWH (enoxaparin)", "Partial protamine; anti-Xa (in special cases)"],
          ["Warfarin", "Vitamin K + 4F-PCC; INR"],
          ["Dabigatran", "Idarucizumab; no routine monitoring"],
          ["Apixaban / rivaroxaban", "Andexanet alfa or 4F-PCC; no routine monitoring"],
        ],
      },
    ],
    pearls: [
      "Pregnant + VTE → LMWH (NEVER warfarin in 1st trimester or DOACs ever)",
      "Mechanical mitral valve → warfarin only (target INR 2.5–3.5)",
      "HIT: stop heparin, start argatroban; do NOT give warfarin until platelet count recovers",
      "Warfarin + amiodarone, fluoroquinolones, TMP-SMX, metronidazole → ↑↑ INR (CYP inhibition)",
      "Rifampin, carbamazepine, phenytoin, St John's wort → ↓ warfarin/DOAC effect (CYP induction)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-diabetes",
    session: 2,
    category: "Pharmacology",
    title: "Diabetes drugs — insulin & orals",
    summary: "Pick the right agent by comorbidity. Know the killers (DKA, lactic acid, hypoglycemia, MTC).",
    sections: [
      {
        heading: "Metformin (first-line for T2DM)",
        bullets: [
          "Mechanism: ↓ hepatic gluconeogenesis; ↑ peripheral insulin sensitivity",
          "Side effects: GI upset (titrate slowly), B12 deficiency (check yearly), LACTIC ACIDOSIS",
          "Contraindications: eGFR <30 (caution 30–45); hold for contrast, surgery, acute illness",
          "Does NOT cause hypoglycemia by itself; weight neutral or modest loss",
        ],
      },
      {
        heading: "GLP-1 agonists (semaglutide, liraglutide, dulaglutide, tirzepatide)",
        bullets: [
          "Mechanism: ↑ glucose-dependent insulin secretion, ↓ glucagon, slows gastric emptying, ↑ satiety",
          "Big wins: weight loss, ↓ CV mortality (semaglutide, liraglutide), renal protection",
          "Side effects: nausea/vomiting, pancreatitis, gallstones",
          "BLACK BOX: medullary thyroid cancer (avoid in MEN-2, personal/family hx of MTC)",
        ],
      },
      {
        heading: "SGLT-2 inhibitors (-flozin: empagliflozin, dapagliflozin, canagliflozin)",
        bullets: [
          "Mechanism: ↓ glucose reabsorption in PCT → glucosuria",
          "Big wins: ↓ CV mortality, ↓ HF hospitalizations, ↓ progression of CKD (independent of glycemic effect)",
          "Side effects: euglycemic DKA, mycotic GU infections, volume depletion, Fournier gangrene (rare)",
          "Hold for surgery, illness, fasting; restart when eating normally",
          "Now first-line add-on for T2DM + HFrEF or CKD",
        ],
      },
      {
        heading: "Other orals",
        bullets: [
          "Sulfonylureas (glipizide, glyburide): ↑ insulin release → HYPOGLYCEMIA (esp glyburide in elderly); weight gain",
          "DPP-4 inhibitors (-gliptin: sitagliptin): mild A1c lowering, weight neutral; pancreatitis risk (small), arthralgia",
          "TZDs (pioglitazone): insulin sensitizer; CONTRAINDICATED in CHF (fluid retention), bladder cancer (controversial), fractures",
          "α-glucosidase inhibitors (acarbose): GI side effects, mild A1c effect (less used)",
        ],
      },
      {
        heading: "Insulin",
        bullets: [
          "Rapid (lispro, aspart, glulisine): onset 15 min, peak 1 hr, duration 3–5 hr — with meals",
          "Short (regular): onset 30 min, peak 2 hr, duration 6–8 hr — IV in DKA",
          "Intermediate (NPH): onset 1–2 hr, peak 6–10 hr — basal in cheaper regimens",
          "Long (glargine, detemir, degludec): peakless, 18–24+ hr — true basal",
          "Total daily dose start: 0.4–0.5 units/kg, split 50% basal / 50% prandial",
          "Insulin requirement DOUBLES in DKA recovery; HALVES during illness or fasting",
        ],
      },
    ],
    tables: [
      {
        caption: "Diabetes drug picker by comorbidity",
        headers: ["Comorbidity", "Preferred add-on"],
        rows: [
          ["ASCVD", "GLP-1 (sema, lira) or SGLT-2"],
          ["HFrEF", "SGLT-2 inhibitor"],
          ["CKD (eGFR < 60)", "SGLT-2 (if eGFR > 20) or GLP-1"],
          ["Obesity", "GLP-1 (tirzepatide best)"],
          ["Cost / minimal disease", "Sulfonylurea or NPH insulin"],
        ],
      },
    ],
    pearls: [
      "Metformin + IV contrast → hold 48 hr; check creatinine before restarting",
      "Euglycemic DKA on SGLT-2 → blood glucose may be ~200 with massive ketosis; check ketones",
      "GLP-1 + personal/family history of medullary thyroid cancer or MEN-2 → DON'T use",
      "Pioglitazone + CHF = NO (fluid retention worsens HF)",
      "Glyburide is the riskiest sulfonylurea for hypoglycemia in elderly — use glipizide instead",
    ],
    relatedCaseIds: ["glp1-mtc", "b12-metformin"],
  },

  {
    id: "pharm-beta-blockers",
    session: 2,
    category: "Pharmacology",
    title: "β-blockers — selectivity, ISA, ABCs of side effects",
    summary: "Cardioselective vs non-selective, with the indications and contraindications that matter.",
    sections: [
      {
        heading: "Classes",
        bullets: [
          "β1-selective (cardioselective): metoprolol, atenolol, bisoprolol, esmolol, nebivolol — preferred in COPD, DM, PAD",
          "Non-selective (β1+β2): propranolol, nadolol, timolol — useful in migraine, essential tremor, performance anxiety",
          "Mixed α+β: labetalol, carvedilol — labetalol for hypertensive emergency (incl pregnancy), carvedilol for HFrEF",
          "ISA (intrinsic sympathomimetic activity): pindolol, acebutolol — less bradycardia; avoid post-MI",
        ],
      },
      {
        heading: "Major indications",
        bullets: [
          "HFrEF: carvedilol, metoprolol succinate (NOT tartrate), bisoprolol → mortality benefit",
          "Post-MI: any β-blocker × at least 1 yr",
          "Rate control AFib: metoprolol or atenolol",
          "Migraine prophylaxis: propranolol, metoprolol",
          "Essential tremor: propranolol",
          "Performance anxiety: propranolol PRN (short-acting)",
          "Hyperthyroidism (until antithyroid takes effect): propranolol",
          "Variceal bleeding prophylaxis (cirrhosis): nadolol, propranolol",
          "Pheochromocytoma: AFTER α-blockade (phenoxybenzamine) — never first",
        ],
      },
      {
        heading: "Side effects (ABCDE)",
        bullets: [
          "Asthma / bronchospasm (especially non-selective)",
          "Bradycardia, heart block",
          "Claudication / cold extremities (worsen PAD)",
          "Depression, fatigue, sexual dysfunction",
          "Erectile dysfunction; masks hypoglycemia symptoms (sweating preserved; tachycardia masked) in diabetics",
        ],
      },
      {
        heading: "Contraindications / caveats",
        bullets: [
          "Asthma: avoid non-selective; cardioselective at low dose OK in COPD",
          "Decompensated HF: hold; restart slowly when euvolemic",
          "2nd/3rd degree AV block (without pacer)",
          "Cocaine intoxication: unopposed α → AVOID β-blockers; use benzos, phentolamine if HTN crisis",
          "Pheochromocytoma: phenoxybenzamine first, then β-blocker",
        ],
      },
      {
        heading: "Overdose",
        bullets: [
          "Bradycardia + hypotension; hypoglycemia, seizures",
          "Treatment: IV fluids, atropine, glucagon (drug of choice), high-dose insulin / euglycemia, calcium, lipid emulsion in severe",
          "Pacing if refractory bradycardia",
        ],
      },
    ],
    pearls: [
      "HFrEF: only carvedilol, metoprolol SUCCINATE, and bisoprolol have mortality benefit",
      "Cocaine chest pain: NO β-blocker (use benzos + nitrate); 'unopposed α' risk historically taught — modern evidence less clear, board answer = avoid",
      "Pheochromocytoma needs α-blockade FIRST (phenoxybenzamine), then β to prevent hypertensive crisis",
      "Glucagon is the antidote for β-blocker AND calcium-channel blocker overdose (via cAMP)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-ace-arb",
    session: 2,
    category: "Pharmacology",
    title: "ACE inhibitors & ARBs",
    summary: "First-line in HFrEF, post-MI, CKD with proteinuria, HTN with DM. Know the kidney and the cough.",
    sections: [
      {
        heading: "Mechanism",
        bullets: [
          "ACE-I (-pril: lisinopril, enalapril, captopril): block ACE → ↓ angiotensin II + ↑ bradykinin (responsible for cough/angioedema)",
          "ARBs (-sartan: losartan, valsartan, candesartan): block AT1 receptor → no bradykinin effect → no cough; lower angioedema risk",
          "ARNI (sacubitril-valsartan): adds neprilysin inhibition → ↑ natriuretic peptides; first-line for HFrEF NYHA II–III",
        ],
      },
      {
        heading: "Indications",
        bullets: [
          "HTN with DM or proteinuria (renal-protective)",
          "HFrEF (mortality benefit)",
          "Post-MI (esp. with reduced EF)",
          "Diabetic nephropathy (microalbuminuria)",
          "Non-diabetic CKD with proteinuria",
        ],
      },
      {
        heading: "Side effects",
        bullets: [
          "Dry cough (ACE-I only) — 10–20%, weeks to months after start; switch to ARB",
          "Angioedema (ACE-I > ARB; higher in Black patients) — discontinue immediately, do NOT switch within class without caution",
          "Hyperkalemia (be careful with K-sparing diuretics, NSAIDs, K supplements)",
          "Acute kidney injury — esp. with bilateral renal artery stenosis or volume depletion",
          "First-dose hypotension (esp. in volume-depleted patients)",
          "PREGNANCY CATEGORY X: oligohydramnios, fetal renal failure, skull defects, hypotension",
        ],
      },
      {
        heading: "Monitoring",
        bullets: [
          "Check BMP within 1–2 weeks of starting or dose change",
          "Expect Cr rise up to 30% (acceptable due to ↓ intraglomerular pressure)",
          "Hold if Cr rises >30%, K >5.5, or symptomatic hypotension",
        ],
      },
    ],
    pearls: [
      "ACE-I + ARB combo = MORE harm than benefit (hyperK, AKI, hypotension); never combine",
      "Bilateral renal artery stenosis on ACE-I → AKI; classic vignette: HTN + flash pulmonary edema + asymmetric kidneys",
      "Pregnant patient on ACE-I → STOP immediately, switch to labetalol/methyldopa/nifedipine",
      "ARB tolerance better than ACE-I for cough; if angioedema with ACE-I, ARBs are USUALLY but not always safe",
      "Sacubitril-valsartan: 36-hr washout from ACE-I before starting (combined = high angioedema risk)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-diuretics",
    session: 2,
    category: "Pharmacology",
    title: "Diuretics — loop, thiazide, K-sparing",
    summary: "Where they act in the nephron, what they do to electrolytes, what they cause.",
    sections: [
      {
        heading: "Loop diuretics (furosemide, bumetanide, torsemide, ethacrynic acid)",
        bullets: [
          "Site: thick ascending limb (NKCC2 blocker)",
          "Effects: ↑↑ Na, K, Cl, Ca, Mg, H+ excretion; massive diuresis",
          "Indications: HF, pulmonary edema, severe HTN, hypercalcemia, refractory edema",
          "Side effects: hypokalemia, hypomagnesemia, hypocalcemia, metabolic alkalosis, hyperuricemia (→ gout), ototoxicity (esp. with aminoglycosides)",
          "Ethacrynic acid: only loop usable in true sulfa allergy",
        ],
      },
      {
        heading: "Thiazides (HCTZ, chlorthalidone, indapamide)",
        bullets: [
          "Site: distal convoluted tubule (NCC blocker)",
          "Effects: moderate diuresis; HOLDS calcium (treats hypercalciuria, stones)",
          "Indications: essential HTN (first-line), CHF (less effective than loop), calcium-stone prophylaxis, nephrogenic DI",
          "Side effects: 'hyperGLUC' = HYPERglycemia, HYPERlipidemia, HYPERuricemia (gout), HYPERcalcemia; HYPOnatremia, HYPOkalemia, HYPOmagnesemia",
          "Chlorthalidone preferred over HCTZ (longer half-life, better BP control)",
        ],
      },
      {
        heading: "K-sparing (spironolactone, eplerenone, amiloride, triamterene)",
        bullets: [
          "Spironolactone, eplerenone: aldosterone receptor antagonists",
          "Amiloride, triamterene: ENaC blockers (collecting duct)",
          "Indications: HFrEF mortality benefit (spironolactone, eplerenone), hyperaldosteronism, cirrhosis with ascites, refractory HTN, acne in women, PCOS",
          "Side effects: HYPERkalemia, gynecomastia (spironolactone, NOT eplerenone), metabolic acidosis",
          "Monitor K every 1–2 weeks initially, then every 3 months",
        ],
      },
      {
        heading: "Other",
        bullets: [
          "Mannitol (osmotic): ↑ ICP, glaucoma; CAN cause pulmonary edema",
          "Acetazolamide (CA inhibitor): altitude sickness prophylaxis, glaucoma, idiopathic intracranial HTN; causes metabolic acidosis",
        ],
      },
    ],
    tables: [
      {
        caption: "Diuretic electrolyte effects at a glance",
        headers: ["Drug", "Effect"],
        rows: [
          ["Furosemide", "↓ K, Mg, Ca; metabolic alkalosis"],
          ["HCTZ", "↓ K, Na; ↑ Ca, glucose, uric acid"],
          ["Spironolactone", "↑ K; gynecomastia (men)"],
          ["Acetazolamide", "↓ K, HCO₃; metabolic acidosis"],
          ["Mannitol", "Volume shift; risk of pulm edema"],
        ],
      },
    ],
    pearls: [
      "Calcium stones → THIAZIDE (lowers urine Ca via DCT reabsorption)",
      "Cirrhosis ascites → SPIRONOLACTONE first-line (high aldosterone in cirrhosis)",
      "HCTZ + lithium → ↑ lithium levels (renal reabsorption)",
      "Loop + aminoglycoside → ototoxicity",
      "Spironolactone gynecomastia → switch to ELPERENONE (selective MR antagonist)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-statins-lipids",
    session: 2,
    category: "Pharmacology",
    title: "Statins & lipid drugs",
    summary: "Pick the right intensity, know the myopathy, when to add ezetimibe or PCSK9.",
    sections: [
      {
        heading: "Statin intensity (ACC/AHA)",
        bullets: [
          "High-intensity (LDL ↓ ≥ 50%): atorvastatin 40–80, rosuvastatin 20–40",
          "Moderate-intensity (LDL ↓ 30–49%): atorvastatin 10–20, rosuvastatin 5–10, simvastatin 20–40, pravastatin 40–80",
          "Low-intensity: rarely indicated; only for intolerance",
        ],
      },
      {
        heading: "Who needs a statin",
        bullets: [
          "Clinical ASCVD (prior MI, stroke, PAD): HIGH intensity (or moderate if >75)",
          "LDL ≥ 190: high intensity",
          "Diabetes age 40–75: moderate (high if other ASCVD risk factors)",
          "Primary prevention 40–75 + 10-yr ASCVD ≥ 7.5%: discuss; ≥20% start moderate-high intensity",
        ],
      },
      {
        heading: "Side effects",
        bullets: [
          "Myalgia (5–10%) — usually benign, check CK if severe",
          "Rhabdomyolysis (rare, <0.1%) — CK >10× ULN, dark urine, weakness; stop drug",
          "Statin-induced autoimmune myopathy (anti-HMGCR antibodies) — persistent weakness despite stopping",
          "Hepatic dysfunction — minor LFT bumps common; only stop if >3× ULN",
          "New-onset DM (slight ↑ risk; benefits outweigh in most)",
          "Drug interactions: simvastatin + amiodarone, fibrates, macrolides, fluconazole, cyclosporine → ↑ myopathy risk",
        ],
      },
      {
        heading: "When statin alone isn't enough",
        bullets: [
          "Add EZETIMIBE first (cheap, oral, additional ~20% LDL drop, modest CV benefit)",
          "Then PCSK9 inhibitors (evolocumab, alirocumab) — injectable, very expensive, big LDL drops, CV mortality benefit",
          "Bempedoic acid — alternative if statin intolerant, ↓ LDL ~15–20%, modest CV benefit",
          "Inclisiran — siRNA against PCSK9, q6mo injection",
        ],
      },
      {
        heading: "Other lipid agents",
        bullets: [
          "Fibrates (fenofibrate, gemfibrozil): ↓ TG; use for TG >500 to prevent pancreatitis",
          "Niacin: rarely used; flushing, hyperglycemia, gout",
          "Omega-3 (icosapent ethyl): ↓ TG; CV benefit at high doses (REDUCE-IT)",
          "Bile acid sequestrants (cholestyramine): rarely first-line; GI side effects, drug binding interactions",
        ],
      },
    ],
    pearls: [
      "Simvastatin max dose 20 mg with amiodarone (or 10 mg with verapamil/diltiazem) — myopathy risk",
      "Pregnancy: STOP statins (category X officially, but emerging data less concerning)",
      "ALT 3× ULN or unexplained myalgia → hold statin, work up",
      "Niacin + simvastatin: no incremental benefit in CV outcomes (AIM-HIGH), more harm",
      "Statin + grapefruit juice → ↑ levels (simvastatin, atorvastatin; pravastatin/rosuvastatin OK)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-antibiotics",
    session: 2,
    category: "Pharmacology",
    title: "Antibiotics — pick the right one",
    summary: "Class-by-class with coverage, side effects, and the test-worthy gotchas.",
    sections: [
      {
        heading: "Penicillins / β-lactams",
        bullets: [
          "Penicillin G/V: strep, Treponema, Listeria, susceptible enterococcus",
          "Amoxicillin / amox-clav: otitis media, sinusitis, dental, +H. influenzae, +anaerobes (clav)",
          "Antipseudomonal pens (piperacillin-tazobactam): broad gram-neg + anaerobes + Pseudomonas",
          "Cephalosporins: 1st gen (cefazolin) skin/preop; 3rd gen (ceftriaxone) CAP/meningitis; 4th gen (cefepime) Pseudomonas; 5th gen (ceftaroline) MRSA",
          "Carbapenems (meropenem, imipenem): broadest gram-neg/anaerobic; reserve for resistant; seizure risk (imipenem)",
          "Side effects: rash, anaphylaxis, C. diff; cefepime → neurotoxicity in renal failure",
        ],
      },
      {
        heading: "Macrolides (azithro, clarithro, erythro)",
        bullets: [
          "Atypical pneumonia (Mycoplasma, Legionella, Chlamydia), pertussis, H. pylori (clarithro)",
          "Side effects: QT prolongation, GI motility (erythro = pro-kinetic), hearing loss with high dose",
        ],
      },
      {
        heading: "Fluoroquinolones (cipro, levo, moxi)",
        bullets: [
          "Cipro: UTI, GI, Pseudomonas; weak gram-positive",
          "Levo, moxi: 'respiratory FQ' for CAP",
          "BOXED warnings: tendon rupture (esp Achilles + steroids), QT prolongation, aortic aneurysm/dissection, peripheral neuropathy, C. diff",
          "Avoid in pregnancy and children (cartilage); avoid with steroids in elderly",
        ],
      },
      {
        heading: "Aminoglycosides (gentamicin, tobramycin, amikacin)",
        bullets: [
          "Gram-negative; synergy with β-lactam for endocarditis (enterococcus)",
          "Side effects: NEPHROTOXICITY, OTOTOXICITY (irreversible), neuromuscular blockade",
          "Once-daily dosing safer; monitor peaks/troughs; avoid with loops",
        ],
      },
      {
        heading: "Vancomycin (IV)",
        bullets: [
          "MRSA, severe gram-positive infections",
          "Side effects: red man syndrome (rate-related infusion reaction; pre-treat with antihistamine, slow infusion), nephrotoxicity, ototoxicity",
          "PO vancomycin: C. diff (NOT absorbed)",
        ],
      },
      {
        heading: "Other key agents",
        bullets: [
          "TMP-SMX (Bactrim): UTI, MRSA skin, PCP, toxoplasmosis prophylaxis; hyperK, photosensitivity, Stevens-Johnson, kernicterus in neonates",
          "Tetracyclines (doxy): atypicals, Lyme, rickettsia, acne; PHOTOSENSITIVITY, tooth discoloration in kids/preg, esophagitis",
          "Metronidazole: anaerobes, C. diff, BV, trichomonas, H. pylori; disulfiram-like with alcohol, peripheral neuropathy",
          "Clindamycin: anaerobes, MRSA; C. DIFF (classic), pseudomembranous colitis",
          "Linezolid: MRSA, VRE; serotonin syndrome, lactic acidosis, bone marrow suppression",
          "Daptomycin: MRSA, VRE; CANNOT use in pneumonia (inactivated by surfactant); rhabdo, eosinophilic pneumonia",
        ],
      },
    ],
    tables: [
      {
        caption: "Antibiotic gotchas",
        headers: ["Drug", "Test-worthy warning"],
        rows: [
          ["FQ (cipro/levo)", "Tendon rupture, QT, aorta, neuropathy"],
          ["Aminoglycosides", "Nephro + irreversible ototoxicity"],
          ["TMP-SMX", "HyperK, SJS, kernicterus in newborns"],
          ["Tetracyclines", "Photosensitivity; not in kids/pregnancy"],
          ["Metronidazole", "Disulfiram with alcohol"],
          ["Clindamycin", "C. difficile colitis"],
          ["Daptomycin", "Doesn't work for pneumonia"],
          ["Linezolid", "Serotonin syndrome with SSRIs"],
        ],
      },
    ],
    pearls: [
      "Empiric meningitis in adults: vancomycin + ceftriaxone (+ ampicillin if >50 or immunocompromised for Listeria)",
      "Empiric CAP (outpatient): amoxicillin or doxycycline (or azithro if no comorbidities); inpatient ICU: β-lactam + macrolide OR β-lactam + FQ",
      "C. diff treatment: ORAL vancomycin OR oral fidaxomicin (first-line, replacing metronidazole)",
      "MRSA skin/soft tissue: TMP-SMX, doxycycline, clindamycin; serious infections: vancomycin or linezolid",
      "Pseudomonas: pip-tazo, cefepime, ceftazidime, meropenem, FQs (cipro best), aminoglycosides",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-psych",
    session: 2,
    category: "Pharmacology",
    title: "Psych meds — SSRIs, mood stabilizers, antipsychotics",
    summary: "Pick by indication; know the deadly side effects (serotonin syndrome, NMS, lithium tox).",
    sections: [
      {
        heading: "SSRIs (fluoxetine, sertraline, escitalopram, citalopram, paroxetine)",
        bullets: [
          "First-line: depression, anxiety (GAD, OCD, panic, PTSD, social), PMDD",
          "Side effects: sexual dysfunction, GI upset, weight neutral or modest gain (paroxetine = most weight gain)",
          "QT prolongation: citalopram (dose-dependent), escitalopram",
          "Withdrawal: especially paroxetine (short half-life) — taper",
          "Pregnancy: sertraline preferred; paroxetine TERATOGENIC (cardiac defects) — avoid",
          "Serotonin syndrome with MAOI/tramadol/linezolid/triptans: clonus, hyperthermia, autonomic instability, AMS",
        ],
      },
      {
        heading: "Other antidepressants",
        bullets: [
          "SNRIs (venlafaxine, duloxetine): depression + neuropathic pain; HTN, sweating",
          "Bupropion: no sexual side effects, smoking cessation, ADHD adjunct; LOWERS SEIZURE THRESHOLD (avoid in seizure disorder, eating disorders)",
          "Mirtazapine: weight gain + sedation (good for elderly with depression + insomnia + low appetite)",
          "Trazodone: sleep (low-dose) > antidepressant; priapism",
          "TCAs (amitriptyline, nortriptyline): neuropathic pain, migraine prophylaxis; anticholinergic, orthostatic, CARDIAC TOXICITY in overdose (wide QRS — give bicarb)",
          "MAOIs (phenelzine, tranylcypromine): rarely used; hypertensive crisis with tyramine; serotonin syndrome with serotonergic drugs",
        ],
      },
      {
        heading: "Mood stabilizers",
        bullets: [
          "Lithium: bipolar mania prophylaxis; narrow therapeutic index (0.6–1.2); tremor, polyuria (nephrogenic DI), hypothyroidism, weight gain, EBSTEIN anomaly in pregnancy; toxicity at >1.5 → confusion, seizures, arrhythmia",
          "Valproate: bipolar, seizures; hepatotoxicity, pancreatitis, weight gain, thrombocytopenia, NEURAL TUBE DEFECTS, alopecia",
          "Lamotrigine: bipolar depression, seizures; STEVENS-JOHNSON syndrome (titrate slowly)",
          "Carbamazepine: seizures, trigeminal neuralgia; SJS, agranulocytosis, SIADH, neural tube defects",
        ],
      },
      {
        heading: "Antipsychotics",
        bullets: [
          "Typical (haloperidol, fluphenazine, chlorpromazine): D2 blockade; high EPS, tardive dyskinesia, hyperprolactinemia",
          "Atypical (risperidone, quetiapine, olanzapine, aripiprazole, ziprasidone, clozapine): lower EPS; METABOLIC syndrome (weight, DM, lipids — esp olanzapine)",
          "Clozapine: refractory schizophrenia ONLY; AGRANULOCYTOSIS (weekly ANC × 6 mo), myocarditis, seizures, sialorrhea, ileus; lowest EPS, best for negative symptoms",
          "Quetiapine: sleep-friendly, low EPS; orthostasis",
          "Aripiprazole: partial agonist; activating",
          "Neuroleptic Malignant Syndrome (NMS): rigidity, hyperthermia, AMS, autonomic instability; days to weeks after start; stop drug, supportive, dantrolene/bromocriptine",
        ],
      },
      {
        heading: "Anxiolytics & hypnotics",
        bullets: [
          "Benzos (lorazepam, clonazepam): rapid anxiety relief, alcohol withdrawal, seizures; ADDICTIVE, fall risk in elderly; reverse with flumazenil (rarely used — seizure risk)",
          "Buspirone: GAD; non-addictive; takes 2–4 weeks",
          "Z-drugs (zolpidem): sleep; sleep-driving/eating; tolerance",
        ],
      },
    ],
    tables: [
      {
        caption: "Psych toxidromes",
        headers: ["Syndrome", "Features / antidote"],
        rows: [
          ["Serotonin syndrome", "Clonus, hyperthermia, hyperreflexia; stop drug, cyproheptadine"],
          ["Neuroleptic Malignant Syndrome", "Rigidity, hyperthermia, AMS; stop drug, dantrolene/bromocriptine"],
          ["Lithium toxicity", "Tremor, AMS, seizures; hydration, dialysis if severe"],
          ["TCA overdose", "Wide QRS, hypotension, seizures; IV bicarb"],
          ["Tyramine + MAOI", "Hypertensive crisis; phentolamine"],
        ],
      },
    ],
    pearls: [
      "Pregnancy + bipolar → lamotrigine or low-dose lithium (avoid valproate, carbamazepine; avoid lithium 1st trimester if possible)",
      "SSRI in pregnancy → sertraline preferred; AVOID paroxetine",
      "Wellbutrin (bupropion) → AVOID in eating disorders + seizure disorders",
      "Clozapine starts → weekly CBC × 6 mo, then biweekly × 6, then monthly",
      "Lithium + NSAID/ACE-I/thiazide → ↑ lithium level (toxicity)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-steroids",
    session: 2,
    category: "Pharmacology",
    title: "Corticosteroids — chronic use, withdrawal, stress dose",
    summary: "What chronic steroids do to a body, when to taper, when to stress-dose.",
    sections: [
      {
        heading: "Equivalent doses (rough)",
        bullets: [
          "Hydrocortisone 20 mg = prednisone 5 mg = methylprednisolone 4 mg = dexamethasone 0.75 mg",
          "Hydrocortisone has the most mineralocorticoid effect; dexamethasone has the least",
        ],
      },
      {
        heading: "Side effects of chronic use",
        bullets: [
          "Iatrogenic Cushing syndrome: central obesity, moon facies, striae, buffalo hump",
          "Osteoporosis: give Ca + vit D, consider bisphosphonate if >5 mg prednisone × 3+ months",
          "Hyperglycemia / new-onset DM",
          "HTN, fluid retention",
          "Cataracts, glaucoma",
          "Avascular necrosis (esp femoral head)",
          "Mood changes: insomnia, mania, psychosis",
          "Skin: thinning, easy bruising, poor wound healing",
          "Infection susceptibility (bacterial, fungal, reactivated TB)",
          "PUD risk (esp with NSAIDs)",
          "Adrenal suppression with prolonged use → cannot stop abruptly",
        ],
      },
      {
        heading: "Withdrawal",
        bullets: [
          "Suppression occurs after ~3 weeks of >20 mg/day prednisone (or equivalent)",
          "TAPER over weeks-months; abrupt stop → adrenal crisis (hypotension, hyponatremia, hyperkalemia, hypoglycemia)",
          "After taper, may need stress-dose steroids for surgery/illness × 6–12 months",
        ],
      },
      {
        heading: "Stress dosing",
        bullets: [
          "Minor surgery / mild illness: continue usual dose or double × 24 hr",
          "Moderate surgery: hydrocortisone 50 mg IV pre-op, then taper over 1–2 days",
          "Major surgery / critical illness: hydrocortisone 100 mg IV q8h × 24–48 hr then taper",
          "Septic shock with relative adrenal insufficiency: hydrocortisone 200 mg/day",
        ],
      },
      {
        heading: "Special situations",
        bullets: [
          "Asthma exacerbation: short course (5 days) prednisone — no taper needed",
          "Giant cell arteritis (temporal): high-dose prednisone START before biopsy (vision-saving)",
          "Bell's palsy: prednisone within 72 hr improves outcomes",
          "Pneumocystis pneumonia: add steroids if PaO2 < 70 or A-a gradient ≥ 35",
          "Severe alcoholic hepatitis (MDF > 32): prednisolone reduces 28-day mortality",
        ],
      },
    ],
    pearls: [
      "Chronic prednisone > 5 mg × 3 mo → check DEXA + start Ca/vit D + consider bisphosphonate",
      "Never stop chronic high-dose steroids abruptly → adrenal crisis",
      "Stress dose: triple usual dose for sick day; hydrocortisone IV for major stress",
      "Steroid + NSAID = ↑ PUD risk — add PPI",
      "Latent TB on chronic steroids → treat to prevent reactivation",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-aeds",
    session: 2,
    category: "Pharmacology",
    title: "Antiepileptic drugs (AEDs)",
    summary: "Pick by seizure type; know pregnancy safety and the dirty toxicities.",
    sections: [
      {
        heading: "By seizure type",
        bullets: [
          "Focal seizures: carbamazepine, oxcarbazepine, lamotrigine, levetiracetam, lacosamide",
          "Generalized tonic-clonic: valproate, lamotrigine, levetiracetam, topiramate",
          "Absence: ETHOSUXIMIDE first-line; valproate alternative",
          "Status epilepticus: lorazepam IV → phenytoin/fosphenytoin or levetiracetam → midazolam/propofol/pentobarbital infusion",
          "Myoclonic / Juvenile myoclonic epilepsy: valproate (or levetiracetam in women)",
        ],
      },
      {
        heading: "Pregnancy",
        bullets: [
          "AVOID: valproate (neural tube defects, ↓ IQ), carbamazepine (NTD), phenytoin (fetal hydantoin syndrome), topiramate (cleft palate)",
          "Safer: lamotrigine, levetiracetam — preferred in women of childbearing age",
          "All pregnant women on AEDs: high-dose folic acid (4 mg/day) preconception and 1st trimester",
        ],
      },
      {
        heading: "Major side effects to know",
        bullets: [
          "Phenytoin: gingival hyperplasia, hirsutism, ataxia, nystagmus, megaloblastic anemia, drug-induced lupus, SJS, osteopenia, zero-order kinetics",
          "Carbamazepine: SIADH, agranulocytosis, aplastic anemia, SJS (HLA-B*1502 in Asians), hepatotoxic, induces CYP",
          "Valproate: hepatotoxicity, pancreatitis, weight gain, alopecia, hyperammonemia, thrombocytopenia, NTD in pregnancy",
          "Lamotrigine: Stevens-Johnson syndrome (titrate slowly — esp with valproate)",
          "Levetiracetam: irritability, behavioral changes, depression",
          "Topiramate: word-finding difficulty, weight loss, kidney stones, oligohidrosis",
          "Phenobarbital: sedation, dependence, induces CYP",
        ],
      },
      {
        heading: "Monitoring",
        bullets: [
          "Phenytoin: total + free (free is what matters in low albumin / uremia)",
          "Valproate: levels + LFTs + ammonia if AMS",
          "Carbamazepine: levels + CBC + Na",
          "Lamotrigine: usually not needed; rash → STOP",
        ],
      },
    ],
    pearls: [
      "Lamotrigine + valproate → SJS risk ↑↑ (valproate inhibits lamotrigine metabolism); titrate very slowly",
      "Phenytoin + tube feeds → ↓ absorption; hold feeds 1–2 hr around dose",
      "Childbearing woman on AED → lamotrigine or levetiracetam + folic acid 4 mg",
      "Status epilepticus first line: IV lorazepam (or buccal midazolam if no IV)",
      "Carbamazepine for Asian patients → HLA-B*1502 test (SJS risk)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-asthma-copd",
    session: 2,
    category: "Pharmacology",
    title: "Asthma & COPD inhalers — stepwise therapy",
    summary: "SABA, ICS, LABA, LAMA, biologics — when each gets added.",
    sections: [
      {
        heading: "Asthma stepwise (GINA-ish)",
        bullets: [
          "Step 1: low-dose ICS + formoterol PRN (preferred to SABA-only)",
          "Step 2: daily low-dose ICS + SABA or ICS/formoterol PRN",
          "Step 3: low-dose ICS-LABA (formoterol or salmeterol) + SABA",
          "Step 4: medium-dose ICS-LABA",
          "Step 5: high-dose ICS-LABA + LAMA (tiotropium) + consider biologic",
          "Biologics: omalizumab (anti-IgE — allergic asthma), mepolizumab/benralizumab (anti-IL-5 — eosinophilic), dupilumab (anti-IL-4/13 — type 2 inflammation)",
        ],
      },
      {
        heading: "COPD stepwise (GOLD)",
        bullets: [
          "Group A (low risk, few sx): SABA or SAMA PRN",
          "Group B (low risk, more sx): LABA or LAMA",
          "Group E (high risk regardless): LABA + LAMA; add ICS if eos ≥ 300 or frequent exacerbations",
          "DON'T use ICS monotherapy in COPD (no benefit, increased pneumonia risk)",
          "Roflumilast for severe COPD with chronic bronchitis + frequent exacerbations",
          "Pulmonary rehab + smoking cessation + vaccines (influenza, pneumococcal, COVID) — biggest non-drug interventions",
        ],
      },
      {
        heading: "Acute exacerbations",
        bullets: [
          "Asthma exacerbation: O2, nebulized albuterol + ipratropium, systemic steroids (PO if mild–moderate, IV if severe), IV magnesium if severe",
          "Asthma escalation: BiPAP if respiratory failure; intubate if AMS, exhaustion, hypercapnia worsening",
          "COPD exacerbation: O2 (target SpO2 88–92%), bronchodilators, steroids (prednisone 40 mg × 5 days), antibiotics (if purulent sputum, increased dyspnea, mechanical ventilation)",
          "COPD severe: BiPAP if pH < 7.35 with hypercapnia and respiratory acidosis (decreases intubation rate)",
        ],
      },
      {
        heading: "Side effects",
        bullets: [
          "SABA (albuterol): tachycardia, tremor, hypokalemia, hyperglycemia",
          "LAMA (tiotropium): dry mouth, urinary retention (caution in BPH); paradoxical bronchospasm",
          "ICS: oral candidiasis (rinse mouth), dysphonia, ↑ pneumonia in COPD, growth velocity slightly slowed in kids (catches up)",
          "Theophylline (rare use): narrow therapeutic index, arrhythmia, seizures, GI",
        ],
      },
    ],
    pearls: [
      "Asthma + β-blocker → use cardioselective only (or avoid); non-selective can trigger bronchospasm",
      "Asthma + aspirin sensitivity + nasal polyps = Samter's triad → use leukotriene modifier (montelukast) or biologics",
      "COPD goal O2 sat 88–92% (avoid V/Q mismatch and CO2 retention)",
      "BiPAP saves intubation in COPD exacerbation with hypercapnic respiratory acidosis (pH < 7.35)",
      "ICS in COPD only when eosinophils ≥ 300 or frequent exacerbations on dual bronchodilator",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-ob-drugs",
    session: 2,
    category: "Pharmacology",
    title: "OB pharmacology — magnesium, oxytocics, tocolytics, RhoGAM",
    summary: "The OB drugs Step 2 hammers — dosing windows and contraindications.",
    sections: [
      {
        heading: "Magnesium sulfate",
        bullets: [
          "Preeclampsia with severe features → seizure prophylaxis (IV loading + maintenance)",
          "Eclampsia → treat active seizure",
          "Neuroprotection in preterm labor < 32 weeks (reduces cerebral palsy)",
          "Toxicity: hyporeflexia → respiratory depression → cardiac arrest; antidote = CALCIUM GLUCONATE",
          "Monitor: deep tendon reflexes, urine output, respirations, serum Mg",
        ],
      },
      {
        heading: "Tocolytics (preterm labor)",
        bullets: [
          "Indomethacin (NSAID): < 32 weeks (closes PDA + oligohydramnios after 32 wks)",
          "Nifedipine: any GA; first-line if > 32 wks",
          "Terbutaline: short-term only (FDA warning for >48-72 hr — maternal cardiac toxicity); avoid in DM, cardiac disease",
          "Magnesium: also tocolytic but mainly for neuroprotection now",
          "Don't tocolyze: chorioamnionitis, IUFD, abruption with hemodynamic instability, severe preeclampsia, lethal fetal anomaly",
          "Always give: betamethasone (lung maturity) + Mg (if <32 wks) + GBS prophylaxis",
        ],
      },
      {
        heading: "Postpartum hemorrhage uterotonics",
        bullets: [
          "Oxytocin: first-line, given IV/IM after delivery",
          "Methylergonovine: 2nd line; CONTRAINDICATED in HTN (incl preeclampsia) — vasoconstriction",
          "Carboprost (PGF2α): CONTRAINDICATED in asthma — bronchospasm",
          "Misoprostol (PGE1): rectal; bronchospasm OK but no methyl/carbo",
          "Tranexamic acid: within 3 hr of PPH onset (WOMAN trial)",
          "Sequence: bimanual massage → oxytocin → 2nd uterotonic → balloon → uterine artery embolization → hysterectomy",
        ],
      },
      {
        heading: "Cervical ripening / induction",
        bullets: [
          "Misoprostol (PGE1, off-label): vaginal/oral; AVOID in prior C-section (uterine rupture)",
          "Dinoprostone (PGE2): vaginal insert",
          "Mechanical: Foley balloon — safe in prior C-section",
          "Oxytocin: titrate; risk of hyperstimulation and rupture",
        ],
      },
      {
        heading: "Rh isoimmunization (RhoGAM)",
        bullets: [
          "Rh-negative mother + Rh-positive fetus risk → give anti-D IG (RhoGAM)",
          "Timing: 28 weeks routinely; within 72 hr postpartum if baby Rh+; after any antepartum bleeding, ECV, amniocentesis, abortion",
          "Kleihauer-Betke for massive fetomaternal hemorrhage → may need higher RhoGAM dose",
        ],
      },
      {
        heading: "Other key OB drugs",
        bullets: [
          "Betamethasone: lung maturity, give 24–34 weeks at risk of preterm delivery (also up to 36+6 in late preterm)",
          "Indomethacin: closes PDA in newborns; also tocolytic",
          "Methotrexate: ectopic pregnancy (unruptured, β-hCG < 5000, no fetal cardiac activity)",
          "Mifepristone + misoprostol: medical abortion < 70 days",
          "Pre-pregnancy folate 400 µg (4 mg if prior NTD or on AEDs)",
        ],
      },
    ],
    tables: [
      {
        caption: "OB drug contraindications",
        headers: ["Drug", "Don't give if…"],
        rows: [
          ["Methylergonovine", "Hypertension / preeclampsia"],
          ["Carboprost", "Asthma"],
          ["Indomethacin tocolysis", "> 32 wks (PDA closure)"],
          ["Misoprostol induction", "Prior C-section"],
          ["Terbutaline", "Beyond 48–72 hr; maternal cardiac disease"],
          ["Magnesium toxicity", "Antidote = calcium gluconate"],
        ],
      },
    ],
    pearls: [
      "Severe preeclampsia → magnesium for seizure prophylaxis + labetalol/nifedipine/hydralazine for BP",
      "Mg toxicity: lose DTRs first → respiratory depression → arrest. Give CALCIUM",
      "PPH uterotonic sequence: oxytocin → methylergonovine (NOT in HTN) → carboprost (NOT in asthma) → misoprostol",
      "Rh-neg mom: RhoGAM at 28 wks + within 72 hr postpartum if baby Rh+",
      "Pregnant + DVT → LMWH (NEVER warfarin, NEVER DOACs)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "pharm-chemo-classics",
    session: 2,
    category: "Pharmacology",
    title: "Chemo toxicity classics",
    summary: "The drug-side effect pairs Step 2 loves to test.",
    sections: [
      {
        heading: "Cardiotoxicity",
        bullets: [
          "Doxorubicin (anthracycline): dose-dependent cardiomyopathy; monitor with ECHO; dexrazoxane for prevention",
          "Trastuzumab: reversible cardiomyopathy (often); avoid concurrent with anthracycline",
          "5-FU / capecitabine: coronary vasospasm → angina/MI; hold and use diltiazem",
        ],
      },
      {
        heading: "Pulmonary toxicity",
        bullets: [
          "Bleomycin: pulmonary fibrosis (dose-related); monitor DLCO; AVOID supplemental O2 unless needed (potentiates damage)",
          "Methotrexate: hypersensitivity pneumonitis (acute or chronic)",
        ],
      },
      {
        heading: "Nephrotoxicity",
        bullets: [
          "Cisplatin: nephrotoxic + ototoxic + peripheral neuropathy + nausea — hydrate aggressively, give amifostine",
          "Methotrexate: AKI (crystal formation in acid urine) — give leucovorin + alkalinize urine",
          "Ifosfamide: hemorrhagic cystitis — give MESNA (binds acrolein); also neurotoxic",
          "Cyclophosphamide: hemorrhagic cystitis — MESNA",
        ],
      },
      {
        heading: "Neurotoxicity",
        bullets: [
          "Vincristine: peripheral neuropathy (axonal), constipation — never give intrathecally (fatal)",
          "Cisplatin: peripheral neuropathy, ototoxicity",
          "Methotrexate intrathecal: aseptic meningitis, leukoencephalopathy",
          "Ifosfamide: encephalopathy — methylene blue or thiamine",
        ],
      },
      {
        heading: "Other classics",
        bullets: [
          "Tamoxifen: endometrial cancer risk, VTE; hot flashes; agonist effects on bone (protective)",
          "Aromatase inhibitors (anastrozole): osteoporosis, no endometrial risk (postmenopausal only)",
          "Imatinib (CML): GI, fluid retention, hepatotoxicity",
          "Checkpoint inhibitors (nivolumab, pembrolizumab): immune-mediated colitis, pneumonitis, hepatitis, endocrine (hypophysitis, thyroid, T1DM) — treat with steroids",
          "Rituximab: hepatitis B reactivation (screen first), PML, infusion reactions",
          "G-CSF (filgrastim): bone pain (loratadine), Sweet syndrome, splenomegaly",
        ],
      },
    ],
    tables: [
      {
        caption: "Drug ↔ toxicity classics",
        headers: ["Drug", "Hallmark toxicity"],
        rows: [
          ["Doxorubicin", "Cardiomyopathy"],
          ["Bleomycin", "Pulmonary fibrosis (avoid O2)"],
          ["Cisplatin", "Nephro + oto + neuro"],
          ["Cyclophosphamide", "Hemorrhagic cystitis (MESNA)"],
          ["Vincristine", "Peripheral neuropathy"],
          ["Methotrexate", "AKI, pneumonitis (rescue with leucovorin)"],
          ["Tamoxifen", "Endometrial Ca, VTE"],
          ["Imatinib", "Fluid retention, LFT"],
          ["Checkpoint inhibitors", "Autoimmune-anything"],
        ],
      },
    ],
    pearls: [
      "Methotrexate overdose / high-dose → leucovorin rescue; alkalinize urine (NaHCO3) and hydrate",
      "Cisplatin: pre-hydrate + post-hydrate, antiemetic prophylaxis (NK1 + 5HT3 + dex)",
      "Bleomycin pulmonary tox: monitor DLCO; avoid high FiO2 during anesthesia (lifelong)",
      "Tamoxifen + endometrial ca: worsens if duration > 5 yr — postmenopausal switch to AI",
      "Vincristine NEVER intrathecal (always fatal)",
    ],
    relatedCaseIds: [],
  },

  // ═══════════════════════════════════════════════════════════════════
  // EKG — HIGH-YIELD PATTERN RECOGNITION
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "ekg-stemi-localization",
    session: 2,
    category: "EKG",
    title: "STEMI — localization by leads",
    summary:
      "Map the ST-elevation pattern to the infarct territory and the culprit artery.",
    sections: [
      {
        heading: "Recognize a STEMI",
        bullets: [
          "ST elevation ≥1 mm in 2 contiguous limb leads OR ≥2 mm in V2–V3 (men ≥40), ≥2.5 mm (men <40), ≥1.5 mm (women)",
          "New LBBB with chest pain = STEMI equivalent (use Sgarbossa criteria)",
          "Reciprocal ST depression in opposite leads CONFIRMS true STEMI vs early repolarization",
          "Hyperacute T waves precede ST elevation — broad, peaked, symmetric",
        ],
      },
      {
        heading: "Territory by ST-elevation pattern",
        bullets: [
          "Anterior (V1–V4) → LAD; proximal LAD if also lateral V5–V6 + reciprocal in II/III/aVF",
          "Inferior (II, III, aVF) → RCA (80%) or LCx; check V4R for RV involvement",
          "Lateral (I, aVL, V5–V6) → LCx",
          "Posterior (ST depression V1–V3 + tall R V1–V2) → LCx or distal RCA",
          "RV infarct (V4R ST elevation) → proximal RCA — preload-dependent, AVOID nitrates, GIVE fluids",
          "Left main / 3-vessel: ST elevation in aVR > 1 mm with widespread ST depression",
        ],
      },
      {
        heading: "Management (door-to-needle / door-to-balloon)",
        bullets: [
          "PCI within 90 min if PCI-capable center; transfer to PCI center if within 120 min total",
          "Fibrinolytics if PCI not available within 120 min and no contraindications; within 30 min of door",
          "MONA-BASH: O2 if hypoxic, ASA 325 chewed, nitrates (NOT in RV/severe AS/sildenafil), morphine, β-blocker (delay if CHF/shock), ACE-i, statin, heparin",
        ],
      },
    ],
    tables: [
      {
        caption: "STEMI lead-to-artery map",
        headers: ["Lead pattern", "Likely culprit artery"],
        rows: [
          ["V1–V4 (anterior)", "LAD"],
          ["I, aVL, V5–V6 (lateral)", "LCx"],
          ["II, III, aVF (inferior)", "RCA (or LCx)"],
          ["V1–V3 ST depression + tall R V1 (posterior)", "LCx / distal RCA"],
          ["V4R elevation (right ventricular)", "Proximal RCA"],
          ["aVR > 1 mm + diffuse ST depression", "Left main / severe 3-vessel"],
        ],
      },
    ],
    pearls: [
      "Inferior STEMI + bradycardia + hypotension → think RV infarct → fluids first, AVOID nitrates",
      "New LBBB + chest pain = treat as STEMI",
      "aVR elevation with diffuse ST depression → left main occlusion, get to cath lab",
      "Posterior STEMI hides as ST depression in V1–V3 with tall R waves — get posterior leads",
      "Wellens' syndrome: biphasic or deep symmetric T inversion V2–V3 → critical LAD stenosis, even if asymptomatic",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-arrhythmias-narrow",
    session: 2,
    category: "EKG",
    title: "Narrow-complex tachycardias",
    summary:
      "Differentiate sinus tach, AFib, AFlutter, SVT — and pick the right move.",
    sections: [
      {
        heading: "Rapid pattern recognition",
        bullets: [
          "Sinus tach: rate 100–150, P before every QRS, regular — treat the underlying cause",
          "AFib: irregularly irregular, NO discrete P waves, baseline fibrillation — rate control + anticoagulate",
          "Atrial flutter: 'sawtooth' flutter waves (best in II/III/aVF), regular if conduction is constant (often 2:1 at 150 bpm)",
          "AVNRT / AVRT (SVT): regular narrow tach 150–250, NO visible P waves (buried in QRS), abrupt onset/offset",
          "MAT: ≥3 different P-wave morphologies, irregular, rate >100 — associated with COPD; treat hypoxia",
        ],
      },
      {
        heading: "Acute management",
        bullets: [
          "Unstable (hypotension, AMS, chest pain, CHF) → synchronized cardioversion regardless of rhythm",
          "Stable SVT → vagal maneuvers → adenosine 6 mg IV (then 12 → 12)",
          "Stable AFib RVR → β-blocker or non-DHP CCB (diltiazem) for rate control",
          "Stable AFlutter → same rate control; consider cardioversion if recent onset",
          "MAT: treat COPD, give magnesium; AVOID β-blockers (bronchospasm)",
        ],
      },
      {
        heading: "Anticoagulation (AFib / AFlutter)",
        bullets: [
          "CHA₂DS₂-VASc ≥2 (men) or ≥3 (women) → anticoagulate (DOAC preferred over warfarin)",
          "Valvular AFib (mod–severe MS or mechanical valve) → WARFARIN only",
          "Cardioversion: if AFib >48 hr or unknown → 3 weeks anticoag before OR TEE to rule out clot; then 4 weeks after",
        ],
      },
    ],
    tables: [
      {
        caption: "Narrow-complex tachycardia at a glance",
        headers: ["Rhythm", "EKG hallmark"],
        rows: [
          ["Sinus tachycardia", "P before every QRS, rate 100–150"],
          ["AFib", "Irregularly irregular, NO P waves"],
          ["Atrial flutter", "Sawtooth F waves; often 2:1 at exactly 150"],
          ["SVT (AVNRT)", "Regular 150–250, hidden P, abrupt on/off"],
          ["MAT", "≥3 P morphologies, irregular (COPD)"],
        ],
      },
    ],
    pearls: [
      "Regular narrow tach at exactly 150 → think atrial flutter with 2:1 block",
      "Adenosine both treats AND diagnoses — unmasks flutter waves if not SVT",
      "AFib + WPW (wide bizarre irregular tach) → procainamide; AVOID AV nodal blockers (adenosine, β-blocker, CCB, digoxin)",
      "Holiday-heart AFib: ETOH-triggered, often self-terminates",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-arrhythmias-wide",
    session: 2,
    category: "EKG",
    title: "Wide-complex tachycardias & VT/VF",
    summary: "VT vs SVT with aberrancy, torsades, VF — and what to shock vs not.",
    sections: [
      {
        heading: "Assume VT until proven otherwise",
        bullets: [
          "ANY wide-complex tachycardia (QRS >120 ms) in a patient with known CAD or HF = VT until proven otherwise",
          "Monomorphic VT: regular, uniform wide QRS — usually scar-based (post-MI)",
          "Polymorphic VT: changing QRS morphology; if QT long → Torsades de Pointes",
          "VFib: chaotic, no organized QRS — pulseless",
          "Pulseless VT/VFib → defibrillate (UNsynchronized), epinephrine every 3–5 min, amiodarone after 2nd–3rd shock",
        ],
      },
      {
        heading: "Stable vs unstable VT",
        bullets: [
          "Unstable (pulse but hypotensive/AMS/CP) → synchronized cardioversion",
          "Stable VT with pulse → amiodarone or procainamide IV; sotalol alternative",
          "Pulseless VT → defibrillation per ACLS",
        ],
      },
      {
        heading: "Torsades de Pointes",
        bullets: [
          "Polymorphic VT with QT prolongation; sinusoidal 'twisting' baseline",
          "Causes: hypoK, hypoMg, hypoCa, congenital long QT, drugs (Class IA/III antiarrhythmics, macrolides, fluoroquinolones, methadone, ondansetron, antipsychotics)",
          "Treat: IV magnesium sulfate; correct electrolytes; pace or isoproterenol to ↑ HR (shortens QT)",
        ],
      },
    ],
    tables: [
      {
        caption: "Wide-complex tach decoder",
        headers: ["Pattern", "Action"],
        rows: [
          ["Monomorphic VT, stable", "Amiodarone or procainamide IV"],
          ["Monomorphic VT, unstable", "Synchronized cardioversion"],
          ["Pulseless VT / VFib", "Defibrillate (unsynchronized), CPR, epi, amiodarone"],
          ["Torsades (long QT)", "IV magnesium, correct K/Mg, pace if recurrent"],
          ["AFib with WPW", "Procainamide; AVOID AV nodal blockers"],
        ],
      },
    ],
    pearls: [
      "Never treat wide-complex tach with verapamil/diltiazem — could be VT and cause arrest",
      "Magnesium first-line for torsades regardless of serum Mg level",
      "VFib + unwitnessed/unsuccessful resuscitation > 20 min → consider therapeutic hypothermia post-ROSC for neuro protection (32–36°C × 24 hr)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-av-blocks",
    session: 2,
    category: "EKG",
    title: "AV blocks — 1°, Mobitz I/II, complete",
    summary: "Recognize each block by PR pattern and dropped beats; know who needs a pacemaker.",
    sections: [
      {
        heading: "The four blocks",
        bullets: [
          "1° AV block: PR > 200 ms, every P conducts — usually benign, no treatment",
          "Mobitz I (Wenckebach): progressively lengthening PR until a QRS is dropped, then resets — AV node, USUALLY benign (often inferior MI, drugs)",
          "Mobitz II: constant PR, sudden non-conducted P (dropped QRS) — INFRA-nodal (His/Purkinje); high risk of progression to complete block → pacemaker",
          "3° (complete) AV block: P and QRS dissociated, regular at independent rates; narrow QRS = junctional escape, wide QRS = ventricular escape → pacemaker",
        ],
      },
      {
        heading: "Pacing decisions",
        bullets: [
          "Symptomatic bradycardia → atropine 0.5–1 mg IV; if no response → transcutaneous pacing → epi/dopamine drip → transvenous pacer",
          "Mobitz II or complete heart block → PERMANENT pacemaker (regardless of symptoms)",
          "Inferior MI causing Mobitz I or transient complete block → usually resolves with reperfusion (vagal-mediated)",
          "Anterior MI with new block → bad sign (extensive infarction); consider permanent pacing",
        ],
      },
    ],
    tables: [
      {
        caption: "Block recognition",
        headers: ["EKG finding", "Block"],
        rows: [
          ["PR > 200 ms, every P conducted", "1° AV block"],
          ["PR lengthens until QRS drops", "Mobitz I (Wenckebach)"],
          ["PR constant, random dropped QRS", "Mobitz II"],
          ["P and QRS independent (AV dissociation)", "Complete (3°) AV block"],
        ],
      },
    ],
    pearls: [
      "Mobitz I = Wenckebach = AV node — usually benign, monitor",
      "Mobitz II = below the AV node = unpredictable → permanent pacemaker",
      "Cannon A waves on JVP = atrium contracting against closed tricuspid (complete block, VT)",
      "Lyme carditis is a classic reversible cause of high-grade AV block — treat with ceftriaxone before placing a permanent pacer",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-electrolytes",
    session: 2,
    category: "EKG",
    title: "EKG changes by electrolyte",
    summary: "Hyperkalemia, hypokalemia, hypocalcemia, hypercalcemia — recognize and treat fast.",
    sections: [
      {
        heading: "Potassium",
        bullets: [
          "Hyperkalemia (rising): peaked T waves → PR prolongation, P-wave flattening → wide QRS → sine-wave → asystole/VF",
          "Hypokalemia: U waves, T-wave flattening, ST depression, prolonged QT — predisposes to torsades",
        ],
      },
      {
        heading: "Calcium",
        bullets: [
          "Hypocalcemia: prolonged QT (specifically prolonged ST segment) — risk of torsades",
          "Hypercalcemia: SHORT QT, Osborn (J) waves with severe hypercalcemia",
        ],
      },
      {
        heading: "Treatment priorities",
        bullets: [
          "Hyperkalemia with EKG changes → calcium gluconate IV (stabilizes membrane) FIRST → insulin + glucose, β-agonist (shift K into cells) → kayexalate / dialysis (remove K)",
          "Hypokalemia → replace K AND magnesium (Mg deficit prevents K replenishment)",
          "Hypocalcemia symptomatic → IV calcium gluconate",
          "Hypercalcemia → IV normal saline; calcitonin for fast effect; bisphosphonate for sustained",
        ],
      },
    ],
    tables: [
      {
        caption: "Electrolyte EKG signature",
        headers: ["Finding", "Likely electrolyte"],
        rows: [
          ["Peaked T waves", "Hyperkalemia"],
          ["U waves, ↓K rhythm", "Hypokalemia"],
          ["Prolonged QT (long ST)", "Hypocalcemia"],
          ["Short QT, Osborn waves", "Hypercalcemia"],
          ["Sine wave QRS", "Severe (>7) hyperkalemia"],
        ],
      },
    ],
    pearls: [
      "Calcium gluconate stabilizes the myocyte but does NOT lower K — still need to shift + remove",
      "Hypokalemia is resistant to correction without simultaneous magnesium repletion",
      "Digoxin toxicity mimics hyperkalemia EKG findings + 'scooped' ST depression",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-pericarditis-pe-mimics",
    session: 2,
    category: "EKG",
    title: "Pericarditis vs PE vs STEMI mimics",
    summary: "Diffuse ST elevation, PR depression, S1Q3T3 — what's not a STEMI.",
    sections: [
      {
        heading: "Acute pericarditis",
        bullets: [
          "DIFFUSE concave ST elevation (all leads except aVR + V1)",
          "PR DEPRESSION in same leads (PR elevation in aVR)",
          "No reciprocal changes (vs STEMI)",
          "Often follows viral URI; pleuritic chest pain worse supine, better leaning forward; friction rub",
          "Treat: NSAIDs (or aspirin if post-MI) + colchicine; steroids only if refractory or autoimmune",
        ],
      },
      {
        heading: "Pulmonary embolism",
        bullets: [
          "Most common EKG finding: SINUS TACHYCARDIA",
          "Classic but UNcommon: S1Q3T3 — deep S in I, Q wave in III, inverted T in III (RV strain)",
          "T-wave inversions V1–V4 (anterior); new RBBB; right axis deviation",
          "Diagnose with CT-PA (or V/Q if contrast contraindicated); D-dimer for low-pretest probability",
          "Treat: anticoagulation (DOAC if hemodynamically stable); tPA if massive PE with shock",
        ],
      },
      {
        heading: "STEMI mimics to know",
        bullets: [
          "Benign early repolarization: J-point notch, concave ST elevation in V2–V5, no reciprocal changes",
          "LBBB: discordant ST/T (opposite QRS direction) — use Sgarbossa criteria for STEMI in LBBB",
          "LV aneurysm: persistent ST elevation weeks after MI",
          "Brugada: coved ST elevation V1–V3 + RBBB-like pattern — channelopathy, risk of sudden death",
          "Takotsubo cardiomyopathy: ST elevation that doesn't fit a vascular territory, apical ballooning, post-stressor",
        ],
      },
    ],
    tables: [
      {
        caption: "ST-elevation differential",
        headers: ["Pattern", "Diagnosis"],
        rows: [
          ["Localized ST elevation + reciprocal depression", "STEMI"],
          ["Diffuse concave ST elevation + PR depression", "Pericarditis"],
          ["Coved ST V1–V3 + RBBB-like", "Brugada"],
          ["Concave ST V2–V5 + J notch", "Early repolarization (benign)"],
          ["Persistent ST elevation post-MI", "LV aneurysm"],
        ],
      },
    ],
    pearls: [
      "Pericarditis with effusion + Beck's triad (hypotension, JVD, muffled heart sounds) = tamponade → urgent pericardiocentesis",
      "Most common EKG finding in PE is sinus tach — don't anchor on S1Q3T3",
      "Brugada is autosomal dominant — screen first-degree relatives; ICD if syncope",
      "Wellens' (deep biphasic T waves V2–V3) in pain-free patient = critical LAD stenosis",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-wpw-long-qt-brugada",
    session: 2,
    category: "EKG",
    title: "Pre-excitation & channelopathies",
    summary: "WPW, long QT, Brugada, HCM — sudden cardiac death syndromes.",
    sections: [
      {
        heading: "WPW (Wolff–Parkinson–White)",
        bullets: [
          "Short PR (<120 ms) + delta wave (slurred upstroke of QRS) + wide QRS",
          "Accessory pathway (bundle of Kent) bypasses AV node",
          "Risk: AFib conducting down accessory pathway → wide bizarre irregular tach → can degenerate to VFib",
          "AFib + WPW: treat with PROCAINAMIDE (or ibutilide); AVOID adenosine, β-blockers, CCBs, digoxin",
          "Definitive: catheter ablation of accessory pathway",
        ],
      },
      {
        heading: "Long QT syndrome",
        bullets: [
          "QTc > 460 ms (women) or >450 ms (men) at rest",
          "Congenital: Romano–Ward (AD, isolated), Jervell–Lange-Nielsen (AR + sensorineural deafness)",
          "Acquired: hypoK, hypoMg, hypoCa, drugs (antiarrhythmics, macrolides, fluoroquinolones, antipsychotics, methadone, ondansetron)",
          "Risk: torsades → syncope → sudden death",
          "Manage: β-blockers; ICD if syncope or family history of SCD; avoid QT-prolonging drugs",
        ],
      },
      {
        heading: "Brugada syndrome",
        bullets: [
          "Type 1 (diagnostic): coved ST elevation ≥2 mm + inverted T in V1–V3",
          "Autosomal dominant SCN5A mutation (sodium channel)",
          "Risk: polymorphic VT/VF, sudden death (often in sleep)",
          "ICD for symptomatic or those with family history of SCD; provocative testing with class IC antiarrhythmic to unmask",
        ],
      },
      {
        heading: "HCM (hypertrophic cardiomyopathy)",
        bullets: [
          "Massive LVH on EKG often with strain pattern, dagger Q waves in lateral leads",
          "Echo: asymmetric septal hypertrophy, systolic anterior motion of mitral valve, dynamic LVOT obstruction",
          "Murmur LOUDER with Valsalva and standing (decreased preload), QUIETER with squat/hand grip",
          "Avoid digoxin, diuretics, vasodilators; β-blockers or CCBs first-line",
          "ICD for high-risk: family history SCD, syncope, septum >30 mm, NSVT on Holter",
        ],
      },
    ],
    tables: [
      {
        caption: "SCD syndromes — features",
        headers: ["Syndrome", "Hallmark"],
        rows: [
          ["WPW", "Delta wave + short PR"],
          ["Long QT", "QTc >460/450 ms"],
          ["Brugada", "Coved ST V1–V3"],
          ["HCM", "LVH + dynamic LVOT murmur ↑ Valsalva"],
          ["ARVC", "Epsilon wave V1, T inv V1–V3, RV origin VT"],
        ],
      },
    ],
    pearls: [
      "AFib in a WPW patient: never give AV nodal blockers — they preferentially conduct down the accessory pathway and can precipitate VFib",
      "Methadone is a notorious QT prolonger — always check QTc before starting and at intervals",
      "Brugada often presents as nocturnal sudden death in young men (esp Southeast Asian); screen family",
      "HCM is the most common cause of sudden cardiac death in young athletes",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-axis-hypertrophy",
    session: 2,
    category: "EKG",
    title: "Axis, LVH, RVH — the basics",
    summary: "Quick axis determination, LVH/RVH criteria, BBB recognition.",
    sections: [
      {
        heading: "Axis in 5 seconds",
        bullets: [
          "Look at QRS in lead I and lead II (or aVF)",
          "I up + II up → NORMAL axis (-30 to +90)",
          "I up + II down → LEFT axis (-30 to -90) — LVH, LBBB, inferior MI, LAFB, WPW",
          "I down + II up → RIGHT axis (+90 to +180) — RVH, PE, lateral MI, COPD, LPFB, dextrocardia",
          "I down + II down → EXTREME axis (NW quadrant) — VT, hyperkalemia, severe pathology",
        ],
      },
      {
        heading: "LVH criteria (Sokolow-Lyon)",
        bullets: [
          "S in V1 + R in V5 or V6 ≥ 35 mm",
          "R in aVL ≥ 11 mm",
          "Strain pattern: ST depression and T inversion in lateral leads (I, aVL, V5–V6)",
        ],
      },
      {
        heading: "RVH criteria",
        bullets: [
          "R/S ratio in V1 > 1 (R wave > S in V1)",
          "Right axis deviation",
          "Causes: chronic lung disease (COPD), pulmonary HTN, congenital heart disease, severe PE",
        ],
      },
      {
        heading: "Bundle branch blocks (QRS >120 ms)",
        bullets: [
          "RBBB: rSR' (M shape) in V1; wide S in I, V6",
          "LBBB: broad notched R in I, V5–V6; QS or rS in V1",
          "New LBBB with chest pain = STEMI equivalent",
          "RBBB doesn't typically affect QRS axis or invalidate STEMI criteria; LBBB does",
        ],
      },
    ],
    pearls: [
      "LVH with strain in a hypertensive patient = chronic uncontrolled HTN until proven otherwise",
      "S1Q3T3 in PE reflects acute RV strain — accompanied by sinus tach and T inversions V1–V4",
      "Bifascicular block (RBBB + LAFB or LPFB) + 1° AV block = trifascicular block — high risk of complete heart block",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-bradycardia-conduction",
    session: 2,
    category: "EKG",
    title: "Bradycardias & sinus node disease",
    summary: "Sinus brady, sick sinus, junctional rhythms — when to pace.",
    sections: [
      {
        heading: "Sinus bradycardia",
        bullets: [
          "Sinus rate < 60 bpm — often normal in athletes",
          "Pathologic causes: medications (β-blocker, CCB, digoxin, opioids, clonidine), inferior MI, hypothyroid, hypothermia, ↑ICP, sleep apnea",
          "Symptomatic → atropine; if refractory → pacing",
        ],
      },
      {
        heading: "Sick sinus syndrome",
        bullets: [
          "Alternating bradycardia and tachycardia (often AFib alternating with sinus brady) — 'tachy-brady'",
          "Common in elderly; causes syncope and palpitations",
          "Diagnosis with Holter or event monitor",
          "Treat: PACEMAKER (then medication can be used to control tachy component safely)",
        ],
      },
      {
        heading: "Junctional rhythms",
        bullets: [
          "Origin: AV node escape — rate 40–60 bpm, narrow QRS, no P or inverted P (retrograde)",
          "Accelerated junctional: 60–100 (digoxin toxicity, post-cardiac surgery, MI)",
          "Treat underlying cause; pacing if symptomatic and persistent",
        ],
      },
    ],
    pearls: [
      "Symptomatic sinus brady → atropine 0.5 mg IV first; max 3 mg before moving to pacing",
      "β-blocker / CCB overdose with bradycardia → calcium gluconate, glucagon, high-dose insulin / euglycemia therapy",
      "Sick sinus with concurrent AFib + bradycardia: pacemaker first, then anticoagulate based on CHA₂DS₂-VASc",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-stable-cad-stress",
    session: 2,
    category: "EKG",
    title: "Stable CAD — stress testing & risk",
    summary:
      "Who needs a stress test, what kind, and how to interpret findings.",
    sections: [
      {
        heading: "Stress test selection",
        bullets: [
          "Can exercise + baseline EKG interpretable → EXERCISE EKG stress test (first-line)",
          "Can exercise + baseline EKG uninterpretable (LBBB, paced, baseline ST changes) → exercise + imaging (echo or nuclear)",
          "Cannot exercise → pharmacologic stress: dobutamine echo OR vasodilator nuclear (regadenoson, adenosine, dipyridamole)",
          "AVOID vasodilator stress in severe asthma/COPD or active bronchospasm — use dobutamine instead",
        ],
      },
      {
        heading: "Positive stress test findings",
        bullets: [
          "≥1 mm horizontal or down-sloping ST depression at 80 ms after J point = ischemic",
          "Hypotension with stress = severe disease (decreased CO from extensive ischemia)",
          "Ventricular arrhythmias with stress → consider EP study",
          "Reversible perfusion defect on nuclear → flow-limiting stenosis",
        ],
      },
      {
        heading: "What to do with the result",
        bullets: [
          "High-risk stress test (large area, hypotension, low workload, multivessel defects) → coronary angiography",
          "Positive moderate → maximize medical therapy (ASA, statin, β-blocker, ACE-i, nitrate)",
          "Pre-op cardiac risk: only stress test if active cardiac condition OR poor functional capacity (<4 METs) AND moderate–high risk surgery",
        ],
      },
    ],
    pearls: [
      "Treadmill stress test sensitivity 60–70% — negative test doesn't rule out CAD if pretest probability high",
      "Exercise tolerance of 4 METs (climb a flight of stairs) is a key threshold for pre-op clearance",
      "Routine cardiac stress testing is NOT recommended for asymptomatic low-risk adults (USPSTF)",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-acs-non-stemi",
    session: 2,
    category: "EKG",
    title: "NSTEMI / unstable angina",
    summary:
      "Recognize NSTE-ACS, risk stratify, and pick early vs delayed invasive strategy.",
    sections: [
      {
        heading: "Diagnosis",
        bullets: [
          "Symptoms of angina + ST depression or T-wave inversion (no ST elevation)",
          "Troponin elevated → NSTEMI; troponin normal → unstable angina",
          "Get serial troponins (0 and 3–6 hr) — high-sensitivity rules out earlier",
        ],
      },
      {
        heading: "Risk stratification (TIMI score)",
        bullets: [
          "TIMI risk factors (1 point each, score 0–7): age ≥65, ≥3 CAD risk factors, known CAD ≥50% stenosis, ASA use in last 7 days, ≥2 anginal episodes in 24 hr, ST changes ≥0.5 mm, +troponin",
          "TIMI ≥3 → early invasive strategy (cath within 24 hr)",
        ],
      },
      {
        heading: "Immediate management",
        bullets: [
          "ASA 325 chewed + P2Y12 inhibitor (clopidogrel, ticagrelor, prasugrel)",
          "Anticoagulation: heparin (UFH) or enoxaparin",
          "β-blocker (unless contraindicated), statin (high-intensity), nitrate for symptoms",
          "Cath if high-risk features (hemodynamic instability, refractory angina, dynamic EKG changes, TIMI ≥3)",
        ],
      },
    ],
    pearls: [
      "Refractory chest pain despite max medical therapy = take to cath lab regardless of TIMI",
      "Type 2 MI: oxygen supply-demand mismatch (sepsis, anemia, tachycardia) — treat underlying, not necessarily cath",
      "GRACE score better predicts 6-month mortality; TIMI better for in-hospital decisions",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-paced-rhythms",
    session: 2,
    category: "EKG",
    title: "Paced rhythms & ICD basics",
    summary:
      "Recognize pacing spikes, understand modes (DDD, VVI), know when device failure is happening.",
    sections: [
      {
        heading: "Pacing on the strip",
        bullets: [
          "Pacing spike before P = atrial pacing; before QRS = ventricular pacing; before both = dual-chamber",
          "Paced ventricular QRS looks like LBBB (RV apical lead) — wide, broad in V6",
          "DDD: dual chamber sensed + paced (most common in dual-lead pacers)",
          "VVI: ventricle only, demand-paced — used in AFib/AFlutter with bradycardia",
        ],
      },
      {
        heading: "Indications for pacing",
        bullets: [
          "Symptomatic sinus brady (incl. sick sinus)",
          "Mobitz II AV block",
          "Complete (3°) AV block",
          "Symptomatic bifascicular/trifascicular block",
        ],
      },
      {
        heading: "Indications for ICD (primary prevention)",
        bullets: [
          "EF ≤35% from ischemic cardiomyopathy ≥40 days post-MI (NYHA II–III)",
          "EF ≤35% from non-ischemic cardiomyopathy on optimal medical therapy ≥3 mo",
          "HCM with risk features, Brugada with syncope, long QT with syncope on β-blocker",
          "Prior cardiac arrest from VT/VF (secondary prevention — Class I)",
        ],
      },
      {
        heading: "Pacemaker failure",
        bullets: [
          "Failure to capture: spike present, no QRS — lead displacement, low battery, fibrosis",
          "Failure to sense: spike during a beat (could induce arrhythmia)",
          "Pacemaker syndrome: ventricular pacing with retrograde atrial conduction → cannon A waves, fatigue, hypotension — fix with dual-chamber upgrade",
        ],
      },
    ],
    pearls: [
      "MRI-conditional pacemakers/ICDs are now common — verify model before declining imaging",
      "AICD shock + patient awake → check rhythm; if rhythm appropriate VT/VF, device worked; if inappropriate, deactivate with magnet",
      "Always interrogate device after syncope — captures rhythm at time of event",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-pe-rv-strain",
    session: 2,
    category: "EKG",
    title: "RV strain, PE, and cor pulmonale",
    summary:
      "EKG findings of acute and chronic RV overload — when to suspect what.",
    sections: [
      {
        heading: "Acute RV strain (PE)",
        bullets: [
          "Sinus tachycardia (most common)",
          "S1Q3T3 (classic but only ~20%)",
          "T-wave inversions V1–V4",
          "New incomplete or complete RBBB",
          "Right axis deviation",
        ],
      },
      {
        heading: "Cor pulmonale (chronic RV pressure overload)",
        bullets: [
          "P pulmonale: tall (>2.5 mm) peaked P wave in II — RA enlargement",
          "RVH: R/S ratio >1 in V1, right axis deviation",
          "Low voltage in limb leads (COPD with hyperinflation)",
        ],
      },
      {
        heading: "Diagnosis & management of PE",
        bullets: [
          "Low pretest probability (Wells score 0–4) → D-dimer; negative D-dimer rules out",
          "High pretest (Wells >4) or positive D-dimer → CT-PA (V/Q if contrast contraindicated)",
          "Massive PE (hypotension/shock) → systemic thrombolysis (tPA)",
          "Submassive PE (RV strain on echo or CT, +troponin, normotensive) → consider catheter-directed thrombolysis vs anticoagulation alone",
          "Stable PE → DOAC (apixaban or rivaroxaban) for ≥3 mo (longer if unprovoked)",
        ],
      },
    ],
    pearls: [
      "PE prophylaxis missed → submassive PE post-op is a common board scenario",
      "Pregnant patient with suspected PE: V/Q scan preferred over CT-PA (lower radiation to breasts); LMWH for treatment (NO warfarin or DOAC)",
      "Echo finding of McConnell's sign (RV free wall akinesia with preserved apex) is highly specific for acute PE",
    ],
    relatedCaseIds: [],
  },

  {
    id: "ekg-cardiac-arrest-acls",
    session: 2,
    category: "EKG",
    title: "Cardiac arrest rhythms & ACLS",
    summary:
      "Shockable vs non-shockable rhythms; the ACLS algorithm in plain English.",
    sections: [
      {
        heading: "Shockable rhythms",
        bullets: [
          "Ventricular fibrillation (VFib): chaotic, no QRS",
          "Pulseless ventricular tachycardia (pulseless VT)",
          "→ DEFIBRILLATE (unsynchronized) ASAP; resume CPR immediately × 2 min",
        ],
      },
      {
        heading: "Non-shockable rhythms",
        bullets: [
          "Asystole: flat line — confirm in 2 leads, check leads/gain",
          "PEA (pulseless electrical activity): organized rhythm on monitor but no pulse",
          "→ CPR + epinephrine 1 mg IV every 3–5 min; treat reversible causes",
        ],
      },
      {
        heading: "Reversible causes — the 'H's and T's",
        bullets: [
          "Hs: hypovolemia, hypoxia, H+ (acidosis), hypo/hyperK, hypothermia",
          "Ts: tension PTX, tamponade, toxins, thrombosis (pulmonary or coronary)",
          "Each one has a specific fix: fluids, oxygen, bicarb, calcium/K shift, warming, needle decompression, pericardiocentesis, antidote, lytics/PCI",
        ],
      },
      {
        heading: "Post-ROSC care",
        bullets: [
          "Targeted temperature management 32–36°C × 24 hr (for comatose post-arrest)",
          "Get 12-lead EKG to look for STEMI → emergency cath",
          "Hemodynamic support, mechanical ventilation, neuro prognostication ≥72 hr after rewarming",
        ],
      },
    ],
    pearls: [
      "Don't interrupt compressions for pulse checks longer than 10 seconds",
      "First-line for refractory VFib after 3 shocks: amiodarone 300 mg IV bolus",
      "End-tidal CO₂ < 10 mmHg during CPR after 20 minutes = poor prognosis (consider stopping)",
      "Eyewitnessed arrest of young athlete on field → suspect HCM, commotio cordis (blunt chest trauma during T-wave), congenital LQT",
    ],
    relatedCaseIds: ["cardiac-arrest"],
  },

  {
    id: "ekg-syncope-workup",
    session: 2,
    category: "EKG",
    title: "Syncope — EKG-first workup",
    summary: "Cardiac vs non-cardiac syncope; what an EKG must rule out.",
    sections: [
      {
        heading: "EKG findings that demand admission",
        bullets: [
          "Long QT (drug or congenital)",
          "Brugada pattern (coved ST V1–V3)",
          "Pre-excitation (delta wave) with documented arrhythmia",
          "Bifascicular or trifascicular block",
          "Pathologic Q waves (prior MI) with syncope",
          "Ventricular arrhythmias",
          "HCM (LVH + strain on EKG)",
        ],
      },
      {
        heading: "Categories of syncope",
        bullets: [
          "Reflex (neurally mediated): vasovagal, situational (cough, micturition), carotid sinus — most common, benign",
          "Orthostatic: postural drop in BP — meds (diuretics, α-blockers), volume depletion, autonomic neuropathy",
          "Cardiac: arrhythmia (Brady/Tachy) OR structural (AS, HCM, tamponade, PE, MI) — HIGH risk",
          "Neurologic: rare; seizures, basilar TIA, SAH — usually accompanied by other neuro findings",
        ],
      },
      {
        heading: "Workup priority",
        bullets: [
          "EVERY syncope patient: 12-lead EKG, orthostatic vitals, history (warning signs, exertion, position)",
          "Exertional syncope → ECHO to evaluate for AS, HCM, anomalous coronary",
          "Syncope WITHOUT warning, while supine, or during exertion → cardiac until proven otherwise",
          "San Francisco Syncope Rule (CHESS): CHF, Hct <30%, EKG abnormal, SOB, SBP <90 → admit",
        ],
      },
    ],
    pearls: [
      "Syncope during exertion = cardiac (AS, HCM, anomalous coronary, arrhythmia) until proven otherwise — get echo + cardiology",
      "Vasovagal syncope in young patients with prodrome (nausea, warmth, blurry vision) is the most common cause — reassure, conservative measures",
      "Suspected arrhythmia but normal Holter → use 30-day event monitor or implantable loop recorder",
    ],
    relatedCaseIds: [],
  },

  // ═══════════════════════════════════════════════════════════════════
  // OMM / OSTEOPATHIC MANIPULATIVE MEDICINE (COMLEX Level 2)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "omm-fundamentals",
    session: 1,
    category: "OMM",
    title: "OMM Fundamentals & TART Diagnosis",
    summary: "Somatic dysfunction, TART, direct vs indirect, barriers.",
    sections: [
      {
        heading: "Somatic dysfunction (the entity OMM treats)",
        bullets: [
          "Definition: impaired/altered function of related components of the somatic system — skeletal, arthrodial, myofascial — and related vascular, lymphatic, neural elements",
          "Diagnosed by TART: Tissue texture changes, Asymmetry, Restriction of motion, Tenderness (need at least one but most need multiple)",
          "Acute somatic dysfunction: edema, erythema, warm, boggy, increased tone, painful with motion",
          "Chronic somatic dysfunction: ropy, fibrotic, cool, decreased tone, less tender, dull/aching",
        ],
      },
      {
        heading: "Naming the dysfunction",
        bullets: [
          "Always named for direction of FREEDOM of motion (where it moves easiest), NOT the restriction",
          "Example: 'C4 FRSL' = C4 prefers Flexion, Rotation Left, Side-bending Left — restricted in extension, right rotation, right sidebending",
          "Cardinal motions: flexion/extension, rotation L/R, side-bending L/R, translation",
        ],
      },
      {
        heading: "Barriers concept",
        bullets: [
          "Physiologic barrier: limit of ACTIVE motion",
          "Anatomic barrier: limit of PASSIVE motion (beyond = injury)",
          "Restrictive barrier (pathologic): premature limit due to dysfunction",
          "Elastic barrier: between physiologic and anatomic — engaged in HVLA",
          "Neutral position: where ligaments are balanced (midway between extremes)",
        ],
      },
      {
        heading: "Direct vs Indirect technique",
        bullets: [
          "DIRECT: physician moves toward the restrictive barrier (against the freedom of motion). Examples: HVLA, muscle energy, articulatory, direct MFR",
          "INDIRECT: physician moves AWAY from the barrier (with the freedom of motion). Examples: counterstrain, BLT, FPR, indirect MFR, cranial",
          "Combined: still technique (indirect → direct), facilitated positional release",
        ],
      },
      {
        heading: "Major treatment systems",
        bullets: [
          "Active: patient assists (muscle energy, articulatory with patient breathing)",
          "Passive: physician does the work (HVLA, soft tissue inhibition, MFR, counterstrain)",
        ],
      },
    ],
    pearls: [
      "Always describe dysfunction by direction it MOVES TO most easily (FREEDOM)",
      "Acute = swollen/boggy/warm; Chronic = ropy/fibrotic/cool",
      "Direct moves toward barrier; Indirect moves away from barrier",
      "If patient is too acute or sensitive → use INDIRECT technique (counterstrain, BLT, FPR)",
    ],
  },

  {
    id: "omm-fryette",
    session: 1,
    category: "OMM",
    title: "Fryette's Laws & Spinal Mechanics",
    summary: "Type I (neutral, group) vs Type II (non-neutral, single segment).",
    sections: [
      {
        heading: "Fryette's First Law (Type I — Neutral)",
        bullets: [
          "In NEUTRAL position, side-bending and rotation occur to OPPOSITE sides",
          "Involves a GROUP of vertebrae (≥3 segments)",
          "Compensatory, usually chronic, asymmetric posture",
          "Example: T5–T8 NSRRL (neutral, side-bent R, rotated L)",
        ],
      },
      {
        heading: "Fryette's Second Law (Type II — Non-neutral)",
        bullets: [
          "In FLEXION or EXTENSION, side-bending and rotation occur to the SAME side",
          "Involves a SINGLE segment",
          "Often acute, traumatic, painful",
          "Example: T4 FRSR (flexed, rotated R, side-bent R)",
          "Type II dysfunctions get priority for treatment",
        ],
      },
      {
        heading: "Fryette's Third Law",
        bullets: [
          "Motion in one plane modifies (limits) motion in the other planes",
          "Practical: if a segment is held in flexion, side-bending and rotation will be reduced",
        ],
      },
      {
        heading: "Applies to thoracic & lumbar ONLY",
        bullets: [
          "Cervicals follow different rules (especially C0–C2)",
          "C2–C7 typically: side-bending and rotation are coupled to the SAME side (Type II-like)",
          "OA (C0–C1): side-bending and rotation OPPOSITE",
          "AA (C1–C2): essentially pure rotation (no side-bending coupling)",
        ],
      },
    ],
    tables: [
      {
        caption: "Type I vs Type II",
        headers: ["Feature", "Type I (Neutral)", "Type II (Non-neutral)"],
        rows: [
          ["Position", "Neutral", "Flexed or extended"],
          ["Coupling", "Side-bending opposite rotation", "Side-bending SAME side rotation"],
          ["Segments", "Group (≥3)", "Single segment"],
          ["Onset", "Chronic, compensatory", "Acute, often traumatic"],
          ["Treatment priority", "Lower", "HIGHER"],
          ["Example", "T5–T8 NSRRL", "T4 FRSR or T4 ERSL"],
        ],
      },
    ],
    pearls: [
      "Mnemonic: Type I — 'opposite' (neutral); Type II — 'same' (flexed/extended)",
      "Treat Type II FIRST when both are present",
      "Cervical spine doesn't follow Fryette's laws (C2–C7 = same-side coupling regardless of position)",
      "OA reversed: side-bend and rotation are OPPOSITE",
    ],
  },

  {
    id: "omm-cervical",
    session: 1,
    category: "OMM",
    title: "Cervical Spine Dysfunctions",
    summary: "OA (C0-C1), AA (C1-C2), typical cervical C2–C7.",
    sections: [
      {
        heading: "Occipitoatlantal (OA, C0–C1)",
        bullets: [
          "Motion: primarily FLEXION/EXTENSION (yes nod)",
          "Side-bending and rotation are COUPLED OPPOSITE (Type-I-like)",
          "Diagnosis: place on supine patient, side-bend test through OA only",
          "Example: OA F SR RL (flexed, side-bent R, rotated L)",
        ],
      },
      {
        heading: "Atlantoaxial (AA, C1–C2)",
        bullets: [
          "Motion: ~50% of cervical ROTATION happens at AA (no nod)",
          "Side-bending and flexion/extension are NEGLIGIBLE",
          "Diagnosis: maximally flex cervical spine (locks out C2–C7), assess rotation L vs R at AA",
          "Example: AA rotated L (only)",
        ],
      },
      {
        heading: "Typical cervicals (C2–C7)",
        bullets: [
          "Side-bending and rotation coupled to the SAME side (regardless of flexion/extension)",
          "Articular pillars assessed for rotation; transverse processes for side-bending",
          "Most common: lower cervical (C5-C6) dysfunctions from prolonged neck flexion (screen time)",
        ],
      },
      {
        heading: "Treatment options",
        bullets: [
          "Muscle energy (most common): patient pushes against operator's resistance, then operator moves into new barrier",
          "HVLA: 'crack' technique; only after thorough screening (no rheumatoid arthritis, Down syndrome, vertebrobasilar insufficiency)",
          "Counterstrain: indirect — find tender point, position into 'point of ease' for 90 seconds",
          "MFR: direct or indirect myofascial release",
        ],
      },
      {
        heading: "Cervical contraindications",
        bullets: [
          "Avoid HVLA: vertebrobasilar insufficiency (test with extension + rotation), Down syndrome (atlantoaxial instability), Rheumatoid arthritis (transverse ligament weakness), unstable fracture, malignancy, infection, anticoagulated",
        ],
      },
    ],
    tables: [
      {
        caption: "Cervical motion by segment",
        headers: ["Segment", "Primary motion", "Coupling"],
        rows: [
          ["OA (C0–C1)", "Flexion/extension (yes nod)", "Side-bend & rotation OPPOSITE"],
          ["AA (C1–C2)", "Rotation (~50% of all cervical rotation)", "Pure rotation"],
          ["C2–C7", "All motions", "Side-bend & rotation SAME side"],
        ],
      },
    ],
    pearls: [
      "AA dx: maximally flex neck to lock out lower segments, then assess rotation only",
      "OA = 'opposite'; AA = rotation only; C2–C7 = same side",
      "Vertebrobasilar test (extension + rotation): if dizziness/nausea → NO HVLA",
      "Down syndrome + RA → screen for atlantoaxial instability before HVLA",
    ],
  },

  {
    id: "omm-thoracic-ribs",
    session: 1,
    category: "OMM",
    title: "Thoracic Spine & Rib Dysfunctions",
    summary: "Typical & atypical thoracics, rib motion, key rib, inhalation/exhalation dysfunctions.",
    sections: [
      {
        heading: "Thoracic vertebrae",
        bullets: [
          "Follow Fryette's laws (Type I and II)",
          "Rule of 3s for transverse process location relative to spinous process",
          "T1–T3: TPs at same level as SPs",
          "T4–T6: TPs one-half level below SPs",
          "T7–T9: TPs one full level below SPs",
          "T10: like T9 (TP one level below)",
          "T11: like T6 (one-half level below)",
          "T12: like T3 (same level)",
        ],
      },
      {
        heading: "Rib motion types",
        bullets: [
          "Pump handle: ribs 1–5; predominantly anterior-posterior (up/down) motion with inspiration",
          "Bucket handle: ribs 6–10; predominantly lateral motion (sides go up/down)",
          "Caliper: ribs 11–12 (floating); anterior-posterior motion at posterior attachment",
        ],
      },
      {
        heading: "Rib dysfunctions",
        bullets: [
          "Inhalation dysfunction: rib held UP (in inspiration); patient cannot fully exhale that rib down → tender on EXHALATION; the most cephalad rib in a group is the KEY rib",
          "Exhalation dysfunction: rib held DOWN (in expiration); patient cannot fully inhale → tender on INHALATION; the most caudad rib in a group is the KEY rib",
          "Treat the KEY rib first — the others often follow",
        ],
      },
      {
        heading: "Common rib dysfunctions (high-yield)",
        bullets: [
          "1st rib elevated (inhalation): tender at supraclavicular area; treat with muscle energy using scalene contraction",
          "2nd rib: associated with shoulder/upper back pain",
          "Anterior chest wall pain → assess ribs 2–5",
          "Lateral chest pain → assess ribs 6–10",
        ],
      },
      {
        heading: "Treatment by mechanism",
        bullets: [
          "Inhalation dysfunction (held up): use EXHALATION to treat — patient exhales fully, operator holds rib down",
          "Exhalation dysfunction (held down): use INHALATION to treat — patient inhales deeply, operator pulls rib up",
          "Specific muscles for ME: scalenes (rib 1), pec minor (rib 2-5), serratus anterior (3-5), latissimus dorsi (rib 12), quadratus lumborum (rib 12 exhalation)",
        ],
      },
    ],
    tables: [
      {
        caption: "Key rib by dysfunction",
        headers: ["Dysfunction", "Held in", "Tender on", "Key rib"],
        rows: [
          ["Inhalation", "Inspiration (up)", "Exhalation", "Most CEPHALAD (top) in group"],
          ["Exhalation", "Expiration (down)", "Inhalation", "Most CAUDAD (bottom) in group"],
        ],
      },
    ],
    pearls: [
      "Treat the KEY rib first — others follow",
      "Inhalation dysfunction → patient exhales to treat; exhalation dysfunction → patient inhales to treat",
      "Rule of 3s for thoracic TP location",
      "1st rib elevated → scalene ME",
    ],
  },

  {
    id: "omm-lumbar",
    session: 1,
    category: "OMM",
    title: "Lumbar Spine Dysfunctions",
    summary: "Follows Fryette's laws; common in low back pain.",
    sections: [
      {
        heading: "Lumbar motion",
        bullets: [
          "Follows Fryette's laws (Type I and II)",
          "Primary motion: flexion/extension; some rotation but limited",
          "Side-bending occurs with rotation per Fryette",
        ],
      },
      {
        heading: "Diagnosis",
        bullets: [
          "Patient prone; assess transverse processes for rotation",
          "If TP posterior on side of rotation",
          "Check in neutral, flexed, and extended positions to differentiate Type I from Type II",
          "Lumbar segments often dysfunctional in low back pain, especially L4-L5 and L5-S1",
        ],
      },
      {
        heading: "Lumbar treatment options",
        bullets: [
          "Muscle energy (most common): patient contracts isometrically, operator engages new barrier",
          "HVLA: lumbar rolls common; contraindications include acute disc herniation, instability",
          "Counterstrain: psoas and iliacus tender points commonly found",
          "Soft tissue: prone or lateral kneading of paraspinals",
          "MFR: direct or indirect",
        ],
      },
      {
        heading: "Psoas dysfunction",
        bullets: [
          "Common cause of low back pain",
          "Patient stands with trunk flexed and shifted toward side of contracted psoas",
          "Thomas test: contracted psoas if hip doesn't extend",
          "Treatment: counterstrain (anterior tender points), muscle energy, MFR",
        ],
      },
    ],
    pearls: [
      "Low back pain + Type II lumbar dysfunction = treat the Type II first",
      "Always rule out red flags before OMT (fever, weight loss, neuro deficit, cancer, IV drug use)",
      "Psoas tender points are ANTERIOR — palpate medial to ASIS in supine",
    ],
  },

  {
    id: "omm-sacrum",
    session: 1,
    category: "OMM",
    title: "Sacral Dysfunctions & Torsions",
    summary: "Sacral oblique axes, torsions, unilateral flexions, sacral rocking.",
    sections: [
      {
        heading: "Sacral anatomy & motion",
        bullets: [
          "Sacrum has 3 axes: superior transverse (respiratory), middle transverse (postural), inferior transverse",
          "Oblique axes: LEFT oblique axis (LOA) runs L superior to R inferior; RIGHT oblique axis (ROA) runs R sup to L inf",
          "Sacral rocking: anterior nutation (counter-nutation) with respiration",
        ],
      },
      {
        heading: "Sacral torsions (4 types) — named by direction of rotation ON the axis",
        bullets: [
          "Forward torsions (physiologic): name matches axis — L on L, R on R",
          "Backward torsions (non-physiologic): name does NOT match axis — R on L, L on R",
          "Forward torsions are more common with normal walking gait",
          "Backward torsions are pathologic and often more symptomatic",
        ],
      },
      {
        heading: "Diagnosing torsions — key findings",
        bullets: [
          "Seated flexion test: positive on side of restricted axis (the axis that DOES NOT move)",
          "L on L: seated flexion positive on R; deep sulcus on R; inferior lateral angle (ILA) posterior on L; sphinx test improves alignment",
          "R on R: mirror of L on L (positive seated flex on L, deep sulcus on L, ILA post on R)",
          "L on R (backward): seated flex positive on L; deep sulcus on R; ILA post on L; sphinx WORSENS",
          "R on L (backward): mirror — seated flex positive on R; deep sulcus on L; ILA post on R",
          "Sphinx (prone press-up) test: forward torsions IMPROVE (asymmetry decreases); backward torsions WORSEN",
        ],
      },
      {
        heading: "Unilateral sacral flexion / extension",
        bullets: [
          "Unilateral sacral FLEXION: one side of sacral base moves anterior and inferior; deep sulcus + ILA more inferior + posterior on the SAME side; positive seated flex on the same side; sphinx improves",
          "Unilateral sacral EXTENSION: one side moves posterior and superior; shallow sulcus + ILA more superior + anterior on that side; sphinx worsens; less common",
        ],
      },
      {
        heading: "Sacral treatment",
        bullets: [
          "Muscle energy with respiration: patient inhales (for extension/backward torsion treatment) or exhales (for flexion/forward torsion treatment) while operator engages barrier",
          "L on L: position patient in 'Sims' (left lateral recumbent), engage with patient INHALATION/exhalation cycles",
          "Backward torsions need a different positioning (often right lateral with knees up)",
          "Articulatory rocking, MFR, BLT are alternatives",
        ],
      },
    ],
    tables: [
      {
        caption: "Sacral torsion findings summary",
        headers: ["Torsion", "Type", "Seated flex test +", "Deep sulcus", "ILA posterior", "Sphinx test"],
        rows: [
          ["L on L", "Forward (physiologic)", "RIGHT", "RIGHT", "LEFT", "IMPROVES"],
          ["R on R", "Forward (physiologic)", "LEFT", "LEFT", "RIGHT", "IMPROVES"],
          ["L on R", "Backward (non-physiologic)", "LEFT", "RIGHT", "LEFT", "WORSENS"],
          ["R on L", "Backward (non-physiologic)", "RIGHT", "LEFT", "RIGHT", "WORSENS"],
        ],
      },
    ],
    pearls: [
      "Forward torsions: name MATCHES (L on L, R on R) — physiologic, improve with sphinx",
      "Backward torsions: name MISMATCHES — pathologic, worsen with sphinx",
      "Seated flexion test positive on the side of the RESTRICTED axis (the side that doesn't move)",
      "L on L torsion: deep sulcus R, ILA post L, seated flex +R, sphinx improves",
      "Sacrum follows the lumbar spine in Fryette compensation",
    ],
  },

  {
    id: "omm-innominate",
    session: 1,
    category: "OMM",
    title: "Innominate (Pelvic) Dysfunctions",
    summary: "Anterior/posterior rotation, upslip/downslip, in-flare/out-flare, pubic shears.",
    sections: [
      {
        heading: "Innominate anatomy",
        bullets: [
          "Each innominate = ilium + ischium + pubis",
          "Sacroiliac joint: motion at SI is small but significant",
          "Common in low back/SI pain, post-partum, falls onto buttocks",
        ],
      },
      {
        heading: "Diagnosing innominate dysfunctions",
        bullets: [
          "Standing flexion test: positive on side of dysfunction (PSIS rises higher on dysfunctional side)",
          "Compare landmarks bilaterally: ASIS, PSIS, pubic tubercle, ischial tuberosity, medial malleolus",
        ],
      },
      {
        heading: "Anterior rotation (forward)",
        bullets: [
          "ASIS on dysfunctional side: INFERIOR (lower)",
          "PSIS on dysfunctional side: SUPERIOR (higher)",
          "Leg appears LONGER on affected side",
          "Common with hip flexor tightness",
          "Treatment: muscle energy — patient supine, extend hip on affected side and pull leg into table (hamstring activation)",
        ],
      },
      {
        heading: "Posterior rotation (backward)",
        bullets: [
          "ASIS: SUPERIOR (higher)",
          "PSIS: INFERIOR (lower)",
          "Leg appears SHORTER on affected side",
          "Treatment: muscle energy — patient supine, flex hip on affected side (psoas/quad contraction against resistance)",
        ],
      },
      {
        heading: "Innominate upslip (superior shear)",
        bullets: [
          "ASIS, PSIS, ischial tuberosity, and pubic tubercle ALL superior on affected side",
          "Leg shorter on affected side",
          "Often after fall on buttock",
          "Treatment: HVLA (long-axis traction with internal/external rotation) most effective",
        ],
      },
      {
        heading: "Innominate downslip",
        bullets: [
          "All landmarks INFERIOR on affected side",
          "Leg longer on affected side",
          "Less common",
          "Treatment: muscle energy or HVLA with traction",
        ],
      },
      {
        heading: "In-flare / Out-flare",
        bullets: [
          "In-flare: ASIS closer to midline (medial) on affected side",
          "Out-flare: ASIS farther from midline (lateral)",
          "Often coexists with rotational dysfunction",
        ],
      },
      {
        heading: "Pubic shear",
        bullets: [
          "Superior pubic shear: pubic tubercle superior on affected side; tender on palpation",
          "Inferior pubic shear: pubic tubercle inferior",
          "Treatment: muscle energy with adductor or abductor contraction; or 'shotgun' technique (resisted abduction → adduction)",
        ],
      },
    ],
    tables: [
      {
        caption: "Innominate dysfunctions — landmark patterns",
        headers: ["Dysfunction", "ASIS", "PSIS", "Leg length"],
        rows: [
          ["Anterior rotation", "INFERIOR", "SUPERIOR", "LONGER on affected"],
          ["Posterior rotation", "SUPERIOR", "INFERIOR", "SHORTER on affected"],
          ["Upslip (superior)", "ALL SUPERIOR", "ALL SUPERIOR", "SHORTER"],
          ["Downslip", "ALL INFERIOR", "ALL INFERIOR", "LONGER"],
          ["In-flare", "Medial", "—", "—"],
          ["Out-flare", "Lateral", "—", "—"],
        ],
      },
    ],
    pearls: [
      "Standing flexion test: positive on side of INNOMINATE dysfunction (PSIS moves higher)",
      "Seated flexion test: positive on side of SACRAL dysfunction",
      "Anterior rotation: leg LONG (think falling forward → ASIS down); posterior rotation: leg SHORT",
      "Upslip: high-impact fall on ischium; HVLA with long-axis traction is treatment of choice",
      "Always reassess after treatment with all landmarks",
    ],
  },

  {
    id: "omm-cranial",
    session: 1,
    category: "OMM",
    title: "Cranial Osteopathy & SBS Dysfunctions",
    summary: "Primary respiratory mechanism, sphenobasilar synchondrosis (SBS) strains.",
    sections: [
      {
        heading: "Primary respiratory mechanism (PRM) — 5 components (Sutherland)",
        bullets: [
          "Inherent motility of the brain and spinal cord",
          "Fluctuation of cerebrospinal fluid",
          "Mobility of intracranial and intraspinal membranes (dura)",
          "Articular mobility of cranial bones",
          "Involuntary mobility of the sacrum between the ilia",
        ],
      },
      {
        heading: "Cranial rhythm",
        bullets: [
          "10–14 cycles/minute (some sources 6–12)",
          "Flexion phase: midline bones flex, paired bones externally rotate",
          "Extension phase: midline bones extend, paired bones internally rotate",
          "Sacral motion: 'craniosacral mechanism' — sacrum counter-nutates with cranial flexion",
        ],
      },
      {
        heading: "Sphenobasilar synchondrosis (SBS) — the master joint",
        bullets: [
          "Junction of sphenoid and basiocciput (occipital)",
          "Cartilaginous joint that fuses by ~age 25",
          "All cranial motion is described relative to SBS",
        ],
      },
      {
        heading: "SBS strain patterns",
        bullets: [
          "TORSION: sphenoid and occiput rotate in OPPOSITE directions around an AP axis. Named for the side of the HIGH greater wing of sphenoid (e.g., 'right torsion' = R greater wing high)",
          "SIDE-BENDING ROTATION: sphenoid and occiput rotate in SAME direction around an AP axis, but ALSO side-bend at a vertical axis. Bones go away from midline on the side of the convexity. Named for side of CONVEXITY (where greater wing and occipital squama are LOW)",
          "VERTICAL STRAIN: sphenoid base moves superiorly (superior vertical strain) or inferiorly (inferior vertical strain) relative to occiput — they remain in parallel planes",
          "LATERAL STRAIN: sphenoid translates laterally relative to occiput; both axes are vertical and parallel; named for the side of the sphenoid base translation (e.g., 'right lateral strain' = sphenoid moved right)",
          "COMPRESSION: sphenoid and occiput compressed together; no motion sensed; often after head trauma; commonly associated with depression, severe headache",
        ],
      },
      {
        heading: "Diagnosis basics",
        bullets: [
          "Vault hold: hands cradle the cranium with index on greater wings of sphenoid",
          "Listen for cranial rhythm and the type of motion",
          "Distinguishing torsion vs side-bending rotation: in torsion, one greater wing is HIGH while the SAME-SIDE occipital squama is LOW (opposite); in side-bending, the LOW greater wing and LOW occipital squama are on the SAME side (the convexity)",
        ],
      },
      {
        heading: "Treatment",
        bullets: [
          "Indirect (most common): exaggerate the strain pattern, hold until still point, allow inherent forces to correct",
          "CV4 (compression of 4th ventricle): operator's thenar eminences engage occiput, gentle compression to enhance CSF flow; used for sinusitis, headache, fever, autonomic balancing",
          "V-spread (frontal lift, parietal lift): spreading sutures",
          "Indications: tension headaches, sinusitis, otitis media, post-concussion, infants with plagiocephaly, asymmetry from birth trauma",
          "Contraindications: acute intracranial bleed, increased ICP, recent skull fracture, severe coagulopathy",
        ],
      },
    ],
    tables: [
      {
        caption: "SBS strain patterns — quick reference",
        headers: ["Strain", "Sphenoid/Occiput motion", "Named for", "Key finding"],
        rows: [
          ["Torsion", "Opposite direction (one wing up, other down)", "Side of HIGH greater wing", "High wing + LOW same-side occipital squama"],
          ["Side-bending rotation", "Same direction + side-bend", "Side of CONVEXITY (low wing + low squama same side)", "Bones bulge away on convex side"],
          ["Vertical strain", "Sphenoid moves sup or inf parallel to occiput", "Direction of sphenoid base", "Superior or inferior strain"],
          ["Lateral strain", "Sphenoid translates left or right", "Side of sphenoid base translation", "Parallel vertical axes shifted"],
          ["Compression", "Squeezed together; no motion", "—", "Often post-trauma; severe headache, depression"],
        ],
      },
    ],
    pearls: [
      "Cranial rhythm 10–14 cycles/min — independent of breathing",
      "All paired bones in cranium: external rotation in flexion phase",
      "CV4 enhances CSF flow — useful for autonomic balancing, tension headaches, sinusitis",
      "Compression of SBS often follows head trauma and presents with depression + severe headache",
      "Contraindications: acute intracranial bleed/↑ICP, recent skull fracture",
    ],
  },

  {
    id: "omm-counterstrain",
    session: 1,
    category: "OMM",
    title: "Counterstrain & Tender Points",
    summary: "Indirect technique using tender points and position of ease for 90 seconds.",
    sections: [
      {
        heading: "Concept",
        bullets: [
          "Indirect technique — moves AWAY from the barrier",
          "Find tender point (1 cm diameter, sharply painful, no rebound)",
          "Position the patient to reduce pain by at LEAST 70% (ideally 100%)",
          "Hold position for 90 SECONDS (anterior cervical: 30 sec)",
          "Slowly return patient to neutral while monitoring tender point",
          "Reassess tenderness — should be markedly improved",
        ],
      },
      {
        heading: "Anterior cervical tender points",
        bullets: [
          "AC1 (located on posterior aspect of ascending ramus of mandible): treat with marked flexion + side-bending and rotation AWAY",
          "AC2-AC6: located on anterolateral tip of transverse process; flexion + side-bending and rotation AWAY from tender point",
          "AC7: top of clavicle near sternoclavicular joint; flexion + side-bending AWAY + rotation TOWARD",
          "Anterior cervical tender points hold for 30 SECONDS only (not 90)",
        ],
      },
      {
        heading: "Posterior cervical tender points",
        bullets: [
          "PC1-inion (occipital): extension + side-bending AWAY + rotation AWAY",
          "PC2-PC7 (on inferior aspect of spinous process or lateral): extension + side-bending and rotation AWAY",
          "Hold 90 seconds",
        ],
      },
      {
        heading: "Thoracic & lumbar tender points",
        bullets: [
          "Anterior thoracic (on chest wall): treat with flexion + side-bending + rotation appropriately",
          "Posterior thoracic (on spinous processes or paravertebrals): extension + side-bending AWAY + rotation AWAY",
          "Anterior lumbar: psoas point (medial to ASIS) — treat with knee/hip flexion and side-bend toward",
          "Posterior lumbar: usually require extension, sometimes Sims position",
        ],
      },
      {
        heading: "Common upper extremity points",
        bullets: [
          "Long head of biceps (anterior): flex elbow with slight abduction and external rotation",
          "Lateral epicondyle: flex elbow with supination",
          "Medial epicondyle: flex elbow with pronation",
        ],
      },
      {
        heading: "Common lower extremity points",
        bullets: [
          "Piriformis: deep gluteal tender point — flex/abduct/externally rotate (FABER)",
          "Iliacus: medial to ASIS — bilateral hip flexion with knees pulled toward chest, ankles crossed",
        ],
      },
      {
        heading: "Indications",
        bullets: [
          "ACUTE somatic dysfunction (where direct techniques would cause pain)",
          "Post-operative, hospitalized, frail elderly patients",
          "Pediatric patients",
          "Patients on anticoagulation (avoid HVLA)",
          "Acute rib pain, low back spasm",
        ],
      },
      {
        heading: "Contraindications",
        bullets: [
          "Patient cannot tolerate the position",
          "Inability to relax (counterstrain requires patient relaxation)",
          "Severe systemic illness or unstable patient",
        ],
      },
    ],
    pearls: [
      "Reduce pain by ≥70% in the position of ease",
      "Hold for 90 SECONDS (anterior cervical = 30 seconds)",
      "SLOWLY return to neutral — fast return defeats the treatment",
      "Anterior tender points: usually require FLEXION + away from tender point",
      "Posterior tender points: usually require EXTENSION + away from tender point",
      "Iliacus tender point treatment position: bilateral hip flexion, knees to chest, ankles crossed",
    ],
  },

  {
    id: "omm-muscle-energy",
    session: 1,
    category: "OMM",
    title: "Muscle Energy Technique (ME)",
    summary: "Direct technique using patient's isometric contraction.",
    sections: [
      {
        heading: "Procedure",
        bullets: [
          "Engage the restrictive barrier (just touch it, do not push through)",
          "Patient performs an isometric contraction (usually against the operator's resistance) for ~3–5 seconds",
          "Patient relaxes (operator holds position)",
          "Wait 2–3 seconds (post-isometric relaxation period)",
          "Operator engages the NEW restrictive barrier",
          "Repeat 3–5 times total",
          "Reassess",
        ],
      },
      {
        heading: "Physiology",
        bullets: [
          "Reciprocal inhibition: contraction of agonist inhibits antagonist",
          "Post-isometric relaxation: muscle relaxes deeper after sustained contraction",
          "Goal: lengthen restricted muscles, restore joint motion",
        ],
      },
      {
        heading: "Forces",
        bullets: [
          "Patient force: small to moderate (~20% of maximum), should not cause pain or operator strain",
          "Operator force: equal and opposite — pure isometric (no joint motion during contraction)",
          "If patient pushes too hard, ask for less force — never let the patient overpower",
        ],
      },
      {
        heading: "Indications",
        bullets: [
          "Most spinal dysfunctions (Type I and Type II)",
          "Sacral torsions (with respiratory assist)",
          "Innominate rotations",
          "Rib dysfunctions",
          "Cervical dysfunctions (often preferred over HVLA)",
        ],
      },
      {
        heading: "Contraindications",
        bullets: [
          "Acute fracture or dislocation",
          "Severe muscle injury or pain",
          "Patient unable to cooperate (cognitive issues, severe weakness)",
          "Post-surgical (recent) at site",
        ],
      },
    ],
    pearls: [
      "Engage barrier → patient contracts (3–5 sec) → patient relaxes → wait 2–3 sec → engage NEW barrier → repeat 3–5 times",
      "ME = DIRECT technique (toward the barrier)",
      "Patient should use ~20% of max strength; never let them overpower",
      "Excellent in elderly, post-op, hospitalized — gentle and effective",
    ],
  },

  {
    id: "omm-hvla-others",
    session: 1,
    category: "OMM",
    title: "HVLA, MFR, BLT, FPR, Still",
    summary: "Other major OMT techniques + indications/contraindications.",
    sections: [
      {
        heading: "HVLA (High-Velocity Low-Amplitude / Thrust)",
        bullets: [
          "DIRECT technique: thrust through restrictive barrier in a quick, controlled motion",
          "Often produces audible 'pop' (cavitation)",
          "Localize at the segment, take up all slack (engage barrier in all 3 planes), then deliver thrust",
          "ABSOLUTE CONTRAINDICATIONS: fracture, dislocation, joint instability, malignancy at site, infection at site, severe osteoporosis with vertebral compression fractures, Down syndrome (atlantoaxial instability), rheumatoid arthritis (transverse ligament weakness), Chiari malformation, vertebrobasilar insufficiency, recent surgery at site, anticoagulation (relative)",
        ],
      },
      {
        heading: "Myofascial Release (MFR)",
        bullets: [
          "Direct: load fascia toward restriction, hold until release",
          "Indirect: load fascia AWAY from restriction (point of ease), hold until release",
          "Stacked, then unwound by the body's inherent forces",
          "Indications: chronic fascial restrictions, post-surgical adhesions, edema",
          "Gentle — well-tolerated in elderly, hospitalized, post-op",
        ],
      },
      {
        heading: "BLT (Balanced Ligamentous Tension) / LAS (Ligamentous Articular Strain)",
        bullets: [
          "INDIRECT technique — engage point of balance where ligaments are equally tensioned",
          "Hold position; inherent forces correct the dysfunction",
          "Gentle and safe — used in elderly, infants, post-op",
        ],
      },
      {
        heading: "FPR (Facilitated Positional Release)",
        bullets: [
          "INDIRECT — quick technique",
          "Place region in neutral, then apply facilitating force (compression or torsion)",
          "Move to point of ease (or 'feather' the diagnosis position)",
          "Hold 3–5 seconds, return to neutral",
          "Quick, useful for acute dysfunctions",
        ],
      },
      {
        heading: "Still technique",
        bullets: [
          "COMBINED indirect/direct",
          "Start at point of ease (indirect), apply compression or distraction, then move through neutral and into the restrictive barrier (direct)",
          "Reassess",
        ],
      },
      {
        heading: "Soft tissue / inhibition / articulatory",
        bullets: [
          "Soft tissue: kneading, stretching, perpendicular traction of muscles — usually preparatory",
          "Inhibition: sustained pressure on a hypertonic muscle to reduce tone",
          "Articulatory: low-velocity, moderate-amplitude — gentle rhythmic motion through restricted range",
        ],
      },
      {
        heading: "Lymphatic techniques",
        bullets: [
          "Pedal pump (Dalrymple): rhythmic dorsiflexion of feet (pumps lower extremity lymph)",
          "Thoracic pump: rhythmic compression on chest in supine position",
          "Indications: edema, lymphatic congestion, pneumonia (improve lymphatic drainage), CHF (cautiously), URI",
          "Contraindications: acute deep vein thrombosis, ABSCESS (could spread), fracture, recent abdominal surgery",
          "Rib raising: stretches paraspinal muscles, normalizes sympathetic tone (T1–T4 for upper, T5–T9 for GI)",
        ],
      },
    ],
    tables: [
      {
        caption: "OMT technique selection by patient",
        headers: ["Scenario", "Preferred technique"],
        rows: [
          ["Acute somatic dysfunction (too painful for direct)", "Counterstrain, BLT, FPR, indirect MFR"],
          ["Elderly, frail, osteoporotic", "Counterstrain, ME, BLT, indirect MFR — AVOID HVLA"],
          ["Hospitalized, post-op", "Lymphatic, counterstrain, ME, indirect MFR"],
          ["Acute rib pain / spasm", "Counterstrain, ME with respiration"],
          ["Pneumonia, URI", "Rib raising + lymphatic pump"],
          ["Pregnancy (LBP)", "ME, counterstrain, MFR; AVOID HVLA in 3rd trimester pelvis"],
          ["Chronic recurrent low back pain", "ME, HVLA (if no contraindications), articulatory, MFR"],
        ],
      },
    ],
    pearls: [
      "HVLA contraindications: think DOWN (Down syndrome → AA instability), RA (transverse ligament), severe osteoporosis, malignancy, infection, instability, anticoagulation",
      "Indirect techniques (counterstrain, BLT, FPR, indirect MFR): safest for acute, frail, hospitalized",
      "Pedal pump: AVOID with DVT (could embolize)",
      "Rib raising: T1–T4 normalizes upper extremity/head sympathetics; T5–T9 normalizes GI sympathetics",
    ],
  },

  {
    id: "omm-viscerosomatic",
    session: 1,
    category: "OMM",
    title: "Viscerosomatic & Somatovisceral Reflexes",
    summary: "Sympathetic + parasympathetic innervation by organ — Chapman's points.",
    sections: [
      {
        heading: "Viscerosomatic reflex",
        bullets: [
          "Visceral pathology → somatic dysfunction at the corresponding spinal level (sympathetic origin)",
          "Manifests as paraspinal tissue texture changes, tenderness, restricted motion",
          "Persistence after acute illness can become chronic somatic dysfunction (facilitation)",
        ],
      },
      {
        heading: "Somatovisceral reflex",
        bullets: [
          "Somatic dysfunction → visceral symptoms or dysfunction (through shared neural pathways)",
          "Basis for using OMT to influence visceral function (e.g., rib raising for sympathetic balance)",
        ],
      },
      {
        heading: "Sympathetic levels by organ",
        bullets: [
          "Head & neck: T1–T4",
          "Heart: T1–T5 (left for inotropy/rate, right for SA node)",
          "Lungs/bronchi: T2–T7",
          "Upper extremity: T2–T7",
          "Esophagus, stomach, liver, gallbladder, spleen, pancreas, duodenum: T5–T9 (proximal GI tract)",
          "Small intestine, appendix, R colon (proximal): T9–T11 (mid-GI)",
          "L colon, kidneys, ureters, ovaries, testes: T10–L2 (lower GI/GU)",
          "Bladder & lower extremity: T10–L2 (testes/ovaries T10; uterus, cervix T10–L2)",
          "Erection: parasympathetic; ejaculation: sympathetic ('Point and Shoot')",
        ],
      },
      {
        heading: "Parasympathetic by organ",
        bullets: [
          "Head, neck, heart, lungs, GI (down to transverse colon): vagus (CN X)",
          "Descending colon, sigmoid, rectum, bladder, reproductive organs (lower): S2–S4 (pelvic splanchnic)",
          "Vagal stimulation: ↓HR, ↑ bronchoconstriction, ↑GI motility",
        ],
      },
      {
        heading: "Common viscerosomatic findings",
        bullets: [
          "Acute MI: left T1–T4 paraspinal tissue changes (often associated with referred chest, jaw, arm pain)",
          "Pneumonia: T2–T7 paraspinal changes on affected side",
          "Cholecystitis: right T5–T9; also right shoulder pain (phrenic nerve)",
          "Appendicitis: T10–T12 (right); McBurney point tenderness",
          "Renal colic: T10–L2 (back and flank pain referred)",
          "Pelvic pathology: T10–L2 or S2–S4 (depending on organ)",
        ],
      },
    ],
    tables: [
      {
        caption: "Sympathetic levels — clinical pearls",
        headers: ["Organ", "Sympathetic level", "Clinical correlate"],
        rows: [
          ["Head/Neck", "T1–T4", "Sinus, TMJ, headache"],
          ["Heart", "T1–T5 (R: SA node; L: rate/contractility)", "MI viscerosomatic at left T1–T4"],
          ["Lungs", "T2–T7", "Asthma, pneumonia, COPD"],
          ["UE", "T2–T7", "Raynaud, CRPS, brachial plexopathy"],
          ["Upper GI (stomach, liver, gallbladder, spleen, pancreas)", "T5–T9", "Cholecystitis = right T5–T9 + R shoulder"],
          ["Mid GI (SI, appendix, R colon)", "T9–T11", "Appendicitis = T10–T12 right"],
          ["Lower GI (L colon to rectum)", "T10–L2 (pre) / S2–S4 (para)", "Constipation, IBS"],
          ["Kidneys / ureters", "T10–L2", "Renal colic referred to flank/groin"],
          ["Pelvic organs / LE", "T10–L2 (sym) / S2–S4 (para)", "Dysmenorrhea, BPH, ED"],
        ],
      },
    ],
    pearls: [
      "Point (parasympathetic erection, S2–S4) and Shoot (sympathetic ejaculation, T10–L2)",
      "Asthma exacerbation: rib raising at T2–T7 reduces sympathetic outflow → bronchodilation",
      "Vagus (CN X): heart, lungs, GI down to mid-transverse colon",
      "S2–S4 ('S2,3,4 keep poop and pee off the floor'): pelvic parasympathetics",
    ],
  },

  {
    id: "omm-chapmans",
    session: 1,
    category: "OMM",
    title: "Chapman's Points",
    summary: "Anterior + posterior reflex points for visceral dysfunction.",
    sections: [
      {
        heading: "What they are",
        bullets: [
          "Small (2–3 mm), tender, beady or pebble-like nodules in deep fascia",
          "Located bilaterally at specific anterior and posterior body sites",
          "Reflect dysfunction in associated viscera",
          "Treated with gentle rotary pressure for 10–30 seconds",
        ],
      },
      {
        heading: "Anterior Chapman's points (selected high-yield)",
        bullets: [
          "Sinusitis: intercostal space (ICS) 1 along sternum (1st rib at sternum)",
          "Otitis (middle ear): superior clavicle (medial third)",
          "Pharyngitis: anterior 1st rib (lateral to sternum)",
          "Tonsillitis: between 1st and 2nd ribs near sternum",
          "Bronchitis: 2nd ICS near sternum",
          "Upper lung: 3rd ICS near sternum",
          "Lower lung: 4th ICS near sternum",
          "Myocardium: 2nd ICS near sternum (similar location, more sensitive on heart pathology)",
          "Esophagus / Bronchus: 2nd ICS",
          "Stomach: 5th ICS on left (acid problem); 6th ICS on left (peristalsis problem)",
          "Liver / Gallbladder: 5th and 6th ICS on right",
          "Spleen: 7th ICS on left",
          "Kidney: 1 inch lateral and superior to umbilicus",
          "Bladder: at the umbilicus and along the linea alba below umbilicus",
          "Urethra: along the superior pubic ramus near the symphysis",
          "Appendix: tip of 12th rib on right",
          "Adrenal: 1 inch lateral and 2 inches superior to umbilicus",
          "Pancreas: 7th ICS on right",
        ],
      },
      {
        heading: "Posterior Chapman's points",
        bullets: [
          "Each anterior point has a corresponding posterior point at the same vertebral level",
          "Located halfway between spinous process and transverse process (in paraspinal muscle)",
          "Often the anterior is used for diagnosis; the posterior for monitoring resolution",
        ],
      },
      {
        heading: "Treatment principles",
        bullets: [
          "Gentle rotary pressure (clockwise or counterclockwise) for 10–30 seconds per point",
          "Treat anterior point first, then posterior",
          "Reassess for tenderness reduction",
          "Always treat the underlying visceral problem (Chapman's helps but isn't standalone cure)",
        ],
      },
    ],
    pearls: [
      "Stomach: 5th ICS LEFT (acid) vs 6th ICS LEFT (peristalsis)",
      "Liver/gallbladder Chapman's on the RIGHT (5th/6th ICS)",
      "Appendix Chapman's: tip of 12th rib on right",
      "Adrenal Chapman's: 1 inch lateral, 2 inches superior to umbilicus",
      "Always reassess after treating; persistent tenderness = ongoing visceral dysfunction",
    ],
  },

  {
    id: "omm-special-situations",
    session: 1,
    category: "OMM",
    title: "OMT in Special Situations",
    summary: "Pregnancy, hospitalized, post-op, pediatric — indications and contraindications.",
    sections: [
      {
        heading: "Pregnancy",
        bullets: [
          "Indications: low back pain, sciatica, edema, constipation, nausea (with caution), preparation for labor",
          "Common dysfunctions: pubic shears, sacral torsions, lumbar hyperlordosis, upper crossed syndrome",
          "Safe techniques: counterstrain, BLT, MFR, ME (gentle), articulatory, lymphatic",
          "AVOID: HVLA in pelvis in 3rd trimester (risk of premature labor), prone positioning after 20 weeks (use left lateral)",
          "Pedal pump can help edema (contraindicated if DVT)",
        ],
      },
      {
        heading: "Hospitalized patients (inpatient OMT)",
        bullets: [
          "Pneumonia: rib raising T2–T7 + thoracic lymphatic pump + paraspinal release → improves lymphatic clearance and reduces hospital stay in some studies",
          "Postoperative ileus: rib raising at T5–T12 + sacral rocking + mesenteric release",
          "CHF: lymphatic techniques (cautiously — start small, monitor BP)",
          "ICU/intubated: gentle MFR, indirect techniques, lymphatic pump if appropriate",
          "Goal: improve homeostatic function, not necessarily 'fix' all dysfunctions",
        ],
      },
      {
        heading: "Post-operative",
        bullets: [
          "Counterstrain, BLT, indirect MFR — gentle, well-tolerated",
          "Avoid direct techniques at the surgical site for 6 weeks",
          "Lymphatic pump for post-op ileus (avoid if recent abdominal surgery to incision site)",
          "Address ileus + atelectasis + pain with appropriate OMT",
        ],
      },
      {
        heading: "Pediatrics",
        bullets: [
          "Indications: torticollis, plagiocephaly, otitis media (with antibiotics if bacterial), colic, GERD, constipation, asthma",
          "Cranial techniques very useful in infants (sutures not yet fused)",
          "Use gentle indirect techniques — BLT, MFR, cranial",
          "Newborns with birth trauma → cranial OMT can address strain patterns",
        ],
      },
      {
        heading: "Elderly",
        bullets: [
          "Avoid HVLA if osteoporosis (DEXA T-score <-2.5), vertebral compression fractures, atherosclerotic vessels (vertebrobasilar)",
          "Counterstrain, BLT, MFR, ME (gentle) are preferred",
          "Address polypharmacy effects on tissue (e.g., bisphosphonate osteonecrosis)",
        ],
      },
      {
        heading: "Sports medicine",
        bullets: [
          "Acute injuries: counterstrain, BLT, MFR (indirect)",
          "Subacute/chronic: ME, HVLA (if appropriate)",
          "Return-to-play decisions should incorporate OMT findings",
          "Common areas: shoulder, lumbar, sacrum, ribs, ankle",
        ],
      },
    ],
    tables: [
      {
        caption: "OMT contraindications by technique",
        headers: ["Technique", "Absolute contraindications"],
        rows: [
          ["HVLA", "Fracture, dislocation, instability, malignancy at site, infection at site, severe osteoporosis, Down syndrome (AA instability), RA (transverse ligament), vertebrobasilar insufficiency, anticoagulation (relative)"],
          ["Lymphatic pump (pedal, thoracic)", "DVT, abscess (could spread), bone fracture, recent abdominal surgery (for thoracic pump)"],
          ["Cranial", "Acute intracranial bleed, ↑ICP, recent skull fracture, severe coagulopathy"],
          ["Soft tissue", "Acute fracture or severe inflammation at site"],
          ["ME, counterstrain, BLT, MFR", "Few absolute; tailor to patient — generally very safe"],
        ],
      },
    ],
    pearls: [
      "Pregnant patient: AVOID prone after 20 weeks (uterocaval compression); use LEFT LATERAL position",
      "Pneumonia + OMT (rib raising + lymphatic pump) has evidence for reduced length of stay (MOPSE study)",
      "Newborn cranial: sutures unfused, very gentle technique, excellent results for plagiocephaly, otitis",
      "Always document dysfunctions found, technique used, and patient response",
    ],
  },

  {
    id: "omm-indications",
    session: 1,
    category: "OMM",
    title: "OMT Indications, Contraindications & Documentation",
    summary: "When to use, when to avoid, how to write the note.",
    sections: [
      {
        heading: "When OMT is indicated",
        bullets: [
          "Somatic dysfunction (TART present)",
          "As adjunct in musculoskeletal pain (low back, neck, shoulder)",
          "Tension/cervicogenic headache",
          "Pregnancy-related low back/pubic pain",
          "Post-operative ileus, atelectasis (with appropriate caution)",
          "Otitis media (in conjunction with abx)",
          "Asthma, COPD exacerbation (lymphatic + rib raising)",
          "Pneumonia (rib raising + lymphatic pump adjunct)",
          "Sinusitis (lymphatic + cranial)",
          "Functional GI complaints (IBS, constipation, gastroparesis)",
          "Pediatric: colic, plagiocephaly, torticollis, otitis",
        ],
      },
      {
        heading: "Absolute contraindications to OMT (entire toolkit)",
        bullets: [
          "Lack of patient consent",
          "Severe systemic illness (sepsis, hemodynamic instability)",
          "Recent fracture (at the dysfunctional site)",
          "Acute spinal cord injury",
          "Acute MI (defer OMT)",
        ],
      },
      {
        heading: "Relative contraindications",
        bullets: [
          "Specific technique-based — see other notes",
          "Anticoagulation (favor gentle indirect)",
          "Severe osteoporosis (avoid HVLA)",
          "Acute infection or abscess at site",
          "Recent surgery at site (within 6 weeks)",
        ],
      },
      {
        heading: "Documentation (SOAP note OMT section)",
        bullets: [
          "Subjective: chief complaint, pain quality, location, severity",
          "Objective: TART findings — name dysfunctions by direction of FREEDOM (e.g., 'C4 FRSL, T5 ERSR, R on R sacrum, anterior innominate L')",
          "Assessment: include diagnosis + somatic dysfunctions found",
          "Plan: list techniques used (e.g., 'ME to C4, counterstrain to PC4 tender point, HVLA to T5'), patient response, follow-up plan",
        ],
      },
      {
        heading: "Billing & ICD-10 (OMT-specific)",
        bullets: [
          "M99.0x: segmental and somatic dysfunction by region (M99.00 head, M99.01 cervical, M99.02 thoracic, M99.03 lumbar, M99.04 sacral, M99.05 pelvic, M99.06 LE, M99.07 UE, M99.08 rib, M99.09 abdomen)",
          "CPT 98925-98929 based on body regions treated (1-2, 3-4, 5-6, 7-8, 9-10)",
          "Document specific dysfunctions per region",
        ],
      },
    ],
    pearls: [
      "Always assess and document TART before treatment",
      "Name dysfunctions by direction of FREEDOM, not restriction",
      "Tailor technique to the patient (acute → indirect; chronic with good tolerance → direct)",
      "Always reassess after treatment and document patient response",
      "OMT is an adjunct, not a substitute for definitive medical treatment",
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
