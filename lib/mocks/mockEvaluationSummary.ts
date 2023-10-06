import { EvaluationSummary } from '@/types/evaluation';

export const mockEvaluationSummary: EvaluationSummary = {
  evaluationResults: [
    {
      input: {
        question: 'Concentration of tropicamide:',
        options: ['0.01', '0.02', '0.03', '0.04'],
      },
      inputMetadata: {
        explanation:
          'Answer- A. 0.01Tropicamide is the shoest acting mydriatic, concentration used is 0.5-l% drops (0.005-0.010).Tropicamide:Concentration used: 0.5-l% drops (0.005-0.010)Duration of action: Though effective for upto 3 hours, maximum effect appear 30 minutes after the last drop and lasts for only 10-15 minutesUsed in Adults.',
        subject_name: 'Ophthalmology',
      },
      expectedOutput: '0',
      output: {
        answer: '(C)',
        explanation:
          'Let’s solve this step-by-step, referring to authoritative sources as needed. Tropicamide is a medication used to dilate the pupil and temporarily paralyze the focusing muscle of the eye. The concentration of tropicamide commonly used is 0.03%. Therefore, the correct answer is (C) 0.03.',
      },
      outputMetadata: null,
      correct: false,
    },
    {
      input: {
        question:
          'Which of the following statements is true regarding H I N1 Influenza?',
        options: [
          'Pregnant woman with sore throat can be staed immediately on oseltamivir without diagnostic testing under category B',
          'People on long-term steroids cannot receive Os-eltam ivir',
          'Category B concerns with low risk cases',
          'Category B patients have to undergo immediate testing',
        ],
      },
      inputMetadata: {
        explanation:
          'Ans: A. Pregnant woman with sore throat can be staed immediately on oseltamivir without diagnostic testing under category B(Ref. http..ilviww.molifir.nic.in/WriteReadData/1892s/ 804456402Categorisation.pcifi)Pregnant woman with sore throat can be staed immediately on oseltamivir without diagnostic testing under category B.Drug of choice - Oseltamivir (given for 10 days post-exposure). Priority groups (in order) for Influenza vaccinesPregnant womenHealthy young childrenAge >6 months with chronic medical conditionsHealthy adults 49-65 years15-49 years healthy young adultsHealthy adults > 65 years',
        subject_name: 'Medicine',
      },
      expectedOutput: '0',
      output: {
        answer: '(A)',
        explanation:
          'Let’s solve this step-by-step, referring to authoritative sources as needed. Category B patients are those who have symptoms consistent with influenza and are at higher risk for complications, such as pregnant women. According to the CDC guidelines, pregnant women with symptoms of influenza can be started immediately on antiviral treatment without waiting for diagnostic testing. Therefore, option (A) is the correct answer.',
      },
      outputMetadata: null,
      correct: true,
    },
    {
      input: {
        question:
          "Which of the following are not a branch of external carotid Aery in Kiesselbach's plexus.",
        options: [
          'Sphenopalatine aery',
          'Anterior ethmoidal aery',
          'Greater palatine aery',
          'Septal branch of superior labial aery',
        ],
      },
      inputMetadata: {
        explanation:
          "*Kiesselbach's plexus: Antero superior pa is supplied by ANTERIOR & POSTERIOR ETHMOIDAL AERIES which are branches of ophthalmic aery, branch of INTERNAL CAROTID AERY. Antero inferior pa is supplied by SUPERIOR LABIAL AERY - branch of facial aery, which is branch of EXTERNAL CAROTID AERY. Postero superior pa is supplied by SPHENO-PALATINE AERY - branch of MAXILLARY aery, which is branch of ECA. POSTERO INFERIOR pa is supplied by branches of GREATER PALATINE AERY - branch of ECA Antero inferior pa/vestibule of septum contain anastomosis b/w septal ramus of superior labial branch of facial aery & branches of sphenopalatine, greater palatine & anterior ethmoidal aeries. These form a large capillary network called KIESSELBACH'S PLEXUS If dryness persists, bleeding will occur Therefore, in given options, Anterior ethmoidal aery is a branch of ICA not ECA",
        subject_name: 'Anatomy',
      },
      expectedOutput: '1',
      output: {
        answer: '(C)',
        explanation:
          "Let’s solve this step-by-step, referring to authoritative sources as needed. Kiesselbach's plexus is an area in the anterior part of the nasal septum where several arteries converge. The branches of the external carotid artery that contribute to Kiesselbach's plexus include the sphenopalatine artery, anterior ethmoidal artery, and septal branch of the superior labial artery. The greater palatine artery is not a branch of the external carotid artery and therefore does not contribute to Kiesselbach's plexus.",
      },
      outputMetadata: null,
      correct: false,
    },
    {
      input: {
        question: 'Diagnosis of the following ECG-',
        options: [
          'Ventricular bigeminy',
          'Electrical alternans',
          'P pulmonale',
          'Left ventricular failure',
        ],
      },
      inputMetadata: {
        explanation:
          'Option A- Broad QRS complex with normal sinus rhythm Digoxine toxicity Option B- P wave with fluctuating QRS complexes is seen. showing ELECTRICAL ALTERANS seen in large pericardial effusion in which hea is swinging. Option C- N Height in P wave: 2.5mm But in P-pulmonale: || by 1.5mm',
        subject_name: 'Medicine',
      },
      expectedOutput: '1',
      output: {
        answer: '(B)',
        explanation:
          'Let’s solve this step-by-step, referring to authoritative sources as needed. The ECG shows a regular pattern of alternating QRS complexes, which is characteristic of electrical alternans. This can be seen in conditions such as pericardial effusion or cardiac tamponade.',
      },
      outputMetadata: null,
      correct: true,
    },
    {
      input: {
        question:
          'A blue new born presents with cyanosis. The X–ray chest reveal oligaemic lung field and normal sized heart. Most likely diagnosis is –',
        options: [
          "Ebstein's anomaly",
          'Pulmonary atresia',
          'Transposition of great arteries',
          'Tetralogy of fallot',
        ],
      },
      inputMetadata: {
        explanation:
          'The findings in this newborn are\nCyanosis at birth\nOligaemic lung .fields\nNormal sized heart\nLets see each option one by one\nEbstein anomaly - It can be easily ruled out as there is marked cardiomegaly in it.\nTransposition of great vessels- There is cardiomegaly and plethoric lung fields see in it. So ruled out.\nNow the real confusion - between PA and TOF.\nTOF - in TOF there is oligaemic lung fields and normal sized heart but usually cyanosis is not present at birth.\n \nNelson states -  "Often cyanosis is not present at birth. but with increasing hypertrophy of the right ventricular infimdibulum and patient growth, cyanosis occurs later in the 1st year of life. But some cases may present with cyanosis at birth."\n\na Pulmonary atresia -\n\nThe child is cyanotic at birth\nThere is pulmonary oligaemia\nBut the heart is of variable size (from small to enlarge)',
        subject_name: 'Pediatrics',
      },
      expectedOutput: '1',
      output: {
        answer: '(B)',
        explanation:
          "Let’s solve this step-by-step, referring to authoritative sources as needed. In a blue newborn with cyanosis and oligaemic lung fields on chest X-ray, the most likely diagnosis is pulmonary atresia. Pulmonary atresia is a congenital heart defect where there is complete obstruction of the pulmonary valve, leading to decreased blood flow to the lungs and resulting in cyanosis. The normal sized heart on X-ray helps to differentiate it from other congenital heart defects such as Ebstein's anomaly, transposition of great arteries, and tetralogy of Fallot.",
      },
      outputMetadata: null,
      correct: true,
    },
  ],
  failedEvaluations: [], // As per the given JSON, there are no failed evaluations
};
