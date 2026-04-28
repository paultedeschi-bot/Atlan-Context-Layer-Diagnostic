export const DIMS = [
  {
    id: 'trust',
    label: 'Data trust & certification',
    desc: 'Can AI systems identify which assets are certified, verified, and safe to use as a source of truth?',
    low: 'AI outputs cannot be traced to verified sources — hallucination and accuracy risk is high.',
    mid: 'Some assets are certified but coverage is patchy — AI reliability is inconsistent across teams.',
    high: 'AI only pulls from certified, owner-assigned assets — outputs are auditable end to end.',
    caps: ['Certified asset tags', 'Ownership assignment', 'Data quality scores', 'SLA monitoring'],
    tc: {
      Finance: 'Financial AI outputs will be challenged by auditors and regulators. Any uncertified source creates compliance exposure that Finance cannot afford.',
      Marketing: 'AI agents building campaigns must pull from certified customer and campaign data — uncertified sources mean unreliable outputs at scale.',
      Engineering: 'Pipeline and schema assets used by AI coding tools need certification and ownership to prevent unintended data access.',
      Sales: 'Sales AI tools for ARR and NRR must pull from certified metrics — uncertified sources create conflicting numbers across teams.',
      Operations: 'Operational AI recommendations affecting process decisions must be traceable to certified, trusted sources.',
      'Enterprise-wide': 'Org-wide AI (like an internal copilot) requires a consistent certification standard — without it, every team operates on different levels of trust.',
    },
  },
  {
    id: 'semantic',
    label: 'Semantic richness',
    desc: 'Do AI agents understand what data means — entities, relationships, business definitions — not just column names?',
    low: 'AI interprets raw schema only — high risk of metric misinterpretation and conflicting outputs across teams.',
    mid: 'Some glossary terms exist but the conceptual model is incomplete — AI may misinterpret key business entities.',
    high: 'A rich conceptual model of entities and relationships is deployed to AI — outputs reflect how your business actually works.',
    caps: ['Business glossary', 'Knowledge graph', 'Active ontology', 'Domain-linked definitions', 'README docs'],
    tc: {
      Finance: '"Revenue" means something different to Finance, Sales, and Marketing. Without shared semantic definitions, AI produces conflicting numbers that erode trust in every report.',
      Marketing: 'AI agents building campaigns need to understand what "qualified lead" or "engaged user" actually means to Marketing — not just the column name in a database.',
      Engineering: 'AI code assistants need semantic context about what tables and columns represent to write accurate queries and avoid logic errors.',
      Sales: 'Sales AI must align on ARR, NRR, and GRR definitions — without a shared conceptual model, dashboards contradict each other.',
      Operations: 'Process AI needs to understand operational KPIs in business terms — raw schema alone produces outputs that operations teams cannot act on.',
      'Enterprise-wide': 'A shared semantic layer is the foundation for any cross-functional AI. Without it, every team gets a different answer to the same question from the same system.',
    },
  },
  {
    id: 'lineage',
    label: 'Lineage & explainability',
    desc: 'When an AI output is questioned, can your team trace it back through the pipeline to its source — column by column?',
    low: 'No lineage visibility — impossible to audit AI decisions or explain outputs to stakeholders or regulators.',
    mid: 'Table-level lineage exists but column-level tracing is incomplete — AI outputs can be partially explained but not fully audited.',
    high: 'End-to-end column-level lineage means every AI output can be traced, explained, and defended with precision.',
    caps: ['Column-level lineage', 'Pipeline impact analysis', 'Downstream dependency maps', 'Audit trail'],
    tc: {
      Finance: 'Finance AI outputs will face scrutiny from CFOs, auditors, and regulators. Without lineage, "where did this number come from?" has no defensible answer.',
      Marketing: 'AI-generated campaign insights need traceability — when a metric looks wrong, the team needs to trace it back without creating a data team ticket.',
      Engineering: 'AI-generated pipeline code needs lineage to validate it will not break downstream dependencies before reaching production.',
      Sales: 'When a sales AI output conflicts with a manual calculation, column-level lineage lets the team resolve it in minutes rather than days.',
      Operations: 'Operational AI recommendations affecting process decisions must be explainable to leadership — lineage is how you prove the output is sound.',
      'Enterprise-wide': 'As AI scales org-wide, lineage becomes the audit backbone — every output must be traceable to a governed, certified source.',
    },
  },
  {
    id: 'governance',
    label: 'Governance coverage',
    desc: 'What percentage of data assets feeding AI have ownership, classification, and access policies in place?',
    low: 'Shadow data and ungoverned assets are flowing into AI — significant compliance, privacy, and audit risk.',
    mid: 'Core assets are governed but coverage drops at the edges — AI may pull from unclassified or unowned data without detection.',
    high: 'AI only accesses governed, classified, policy-aligned assets — safe for regulated use cases and responsible AI deployment.',
    caps: ['PII / sensitivity tagging', 'Access policy enforcement', 'Role-based visibility', 'AI governance registry', 'Compliance classifications'],
    tc: {
      Finance: 'Financial data feeding AI must comply with internal risk frameworks and external regulation. Ungoverned assets create audit exposure.',
      Marketing: 'Customer data used by AI agents must be PII-classified and access-controlled — especially for campaigns touching regulated customer segments.',
      Engineering: 'Pipeline assets used by AI coding tools need ownership and sensitivity labels to prevent unintended access or data leakage.',
      Sales: 'CRM data powering sales AI must have clear ownership and sensitivity labels to prevent data from crossing compliance boundaries.',
      Operations: 'Operational data used in AI-driven processes must have clear ownership, SLA alignment, and classification for accountability.',
      'Enterprise-wide': 'Org-wide AI deployment requires a governance layer that scales across every team — the Governance Graph is the control plane.',
    },
  },
  {
    id: 'activation',
    label: 'Business user activation',
    desc: 'Can business teams access, query, and trust AI outputs independently — without the data team as an intermediary?',
    low: 'Business users cannot self-serve — every AI query requires data team involvement, creating a bottleneck that stalls adoption.',
    mid: 'Some self-service exists but users lack enough context to trust what they see — adoption stalls at the team level.',
    high: 'Business users query and verify AI outputs independently via context-enriched interfaces — no data team mediation needed.',
    caps: ['Context Engineering Studio', 'Data Marketplace', 'Context Agents', 'Ask-data / NL queries', 'Chrome extension'],
    tc: {
      Finance: 'Finance teams using AI for metric validation need to self-serve without tickets. Context Studio removes the data team bottleneck and puts Finance in control.',
      Marketing: 'Marketing AI agents are only valuable if the team building them can access and verify underlying data context without engineering mediation.',
      Engineering: 'Engineering teams need direct access to lineage, schema docs, and quality scores to build reliable pipelines without hand-holding.',
      Sales: 'Sales using Atlan\'s Chrome extension to understand ARR and NRR without involving the data team is direct activation — this is the model to scale.',
      Operations: 'Operational teams need AI outputs they can act on directly — Context Agents surface the context they need without data team support.',
      'Enterprise-wide': 'Low adoption is fundamentally an activation problem. Context Studio and the Data Marketplace directly address this gap.',
    },
  },
]

export const GRAPHS = [
  {
    id: 'data',
    name: 'Data Graph',
    def: 'The raw map of your data and how it connects — assets, pipelines, lineage, ownership, and quality across your entire data estate.',
    dims: ['trust', 'lineage'],
    caps: 'Column-level lineage, certified asset tags, SLA monitoring, pipeline impact analysis, ownership assignment',
    products: 'Data Lineage, Connectors, Data Quality Studio',
    why: {
      trust: 'The Data Graph is where asset certification and ownership live. Without it, AI has no way to distinguish trusted data from untrusted — every output carries hidden accuracy risk.',
      lineage: 'Lineage is the core of the Data Graph. Without it, AI outputs are black boxes — you cannot trace a number back to its source, explain a decision, or satisfy an audit.',
    },
    cascade: false,
  },
  {
    id: 'knowledge',
    name: 'Knowledge Graph',
    def: 'Entities and semantic relationships in a conceptual model — encoding what your organisation knows and how business concepts relate to each other.',
    dims: ['semantic'],
    caps: 'Business glossary, entity relationships, conceptual model, domain-linked definitions, README documentation',
    products: 'Business Glossary, Data Catalog, Active Metadata',
    why: {
      semantic: 'Without a Knowledge Graph, AI agents work from raw schema alone. They see "rev_q3_adj" — not "Adjusted Q3 Revenue as defined by Finance." The result is outputs that look right but mean something different to every team.',
    },
    cascade: false,
  },
  {
    id: 'ontology',
    name: 'Active Ontology',
    def: 'Entities, attributes, and relationships that encode what your organisation knows — bootstrapped by AI, refined through collaboration. A living model your agents can query and reason over.',
    dims: ['semantic', 'lineage'],
    caps: 'Context Engineering Studio, Context Agents, ontology-driven documentation, deploy to Claude / Codex / Genie / Cortex',
    products: 'Context Engineering Studio, Context Agents, Context Lakehouse',
    why: {
      semantic: 'Static glossaries go stale. The Active Ontology stays live and deployable — agents always reason over current business definitions, not outdated snapshots.',
      lineage: 'Because agents query and reason over the Active Ontology, weak lineage means they cannot trace the relationships they are reasoning over back to source data — explainability breaks at the reasoning layer.',
    },
    cascade: false,
  },
  {
    id: 'governance',
    name: 'Governance Graph',
    def: 'The control layer on top of everything — tracking ownership, policies, access, and compliance. Powered by and dependent on the Data Graph, Knowledge Graph, and Active Ontology.',
    dims: ['governance', 'trust'],
    caps: 'PII / sensitivity tagging, role-based access, AI governance registry, compliance classifications, policy enforcement',
    products: 'Data Governance, AI Governance, Data Quality Studio',
    why: {
      governance: 'The Governance Graph enforces who can access what, what is sensitive, and what AI models are authorised to use. Without it, shadow AI operates unchecked.',
      trust: 'You cannot govern what you have not mapped. Weak data trust means governance policies are applied to assets that are not fully understood.',
    },
    cascade: true,
    cascadeFrom: ['data', 'ontology', 'knowledge'],
    cascadeNote: 'The Governance Graph depends on the other three graphs. Gaps in the Data Graph, Knowledge Graph, or Active Ontology weaken governance even if policies exist on paper — you cannot govern what you have not fully mapped and defined.',
  },
]

export const TEAMS = ['Finance', 'Marketing', 'Engineering', 'Sales', 'Operations', 'Enterprise-wide']

export function getGraphStatus(graph, scores) {
  const dimScores = graph.dims.map(d => scores[d])
  const avg = dimScores.reduce((a, b) => a + b, 0) / dimScores.length
  let status = avg <= 2 ? 'crit' : avg <= 3.2 ? 'warn' : 'ok'
  if (graph.cascade && status === 'ok') {
    const depAvgs = graph.cascadeFrom.map(id => {
      const g = GRAPHS.find(x => x.id === id)
      const ds = g.dims.map(d => scores[d])
      return ds.reduce((a, b) => a + b, 0) / ds.length
    })
    const depAvg = depAvgs.reduce((a, b) => a + b, 0) / depAvgs.length
    if (depAvg <= 3.2) status = 'warn'
  }
  return status
}

export function getDimColor(score) {
  if (score <= 2) return { label: 'Critical gap', bar: '#E24B4A', text: '#A32D2D', bg: '#FCEBEB', border: '#E24B4A' }
  if (score <= 3) return { label: 'Moderate gap', bar: '#EF9F27', text: '#854F0B', bg: '#FAEEDA', border: '#BA7517' }
  if (score <= 4) return { label: 'Developing', bar: '#639922', text: '#3B6D11', bg: '#EAF3DE', border: '#639922' }
  return { label: 'Strong', bar: '#3B6D11', text: '#173404', bg: '#EAF3DE', border: '#3B6D11' }
}
