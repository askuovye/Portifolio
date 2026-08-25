<script setup lang="ts">
import { computed, ref } from 'vue'
import { careerExperiences } from '@/data/experiences'
import { careerSkillConnections, careerSkillNodes } from '@/data/careerSkills'
import { gsap } from '@/animations/gsap'
import { useGsapContext } from '@/composables/useGsapContext'

const props = defineProps<{
  activeExperienceId: string
}>()

const tree = ref<HTMLElement | null>(null)
const hoveredSkillId = ref<string | null>(null)
const selectedSkillId = ref<string | null>(null)

const activeExperience = computed(() => careerExperiences.find(item => item.id === props.activeExperienceId))
const activeSkills = computed(() => new Set(activeExperience.value?.skills ?? []))
const inspectedSkillId = computed(() => selectedSkillId.value ?? hoveredSkillId.value)

const nodeById = (id: string) => careerSkillNodes.find(node => node.id === id)
const isActiveNode = (id: string) => id === 'professional-core' || activeSkills.value.has(id)
const isRelatedNode = (id: string) => {
  const inspected = inspectedSkillId.value
  if (!inspected) return false
  return id === inspected || careerSkillConnections.some(connection =>
    (connection.from === inspected && connection.to === id)
    || (connection.to === inspected && connection.from === id),
  )
}
const isActiveConnection = (from: string, to: string) => isActiveNode(from) && isActiveNode(to)
const isInspectedConnection = (from: string, to: string) => {
  const inspected = inspectedSkillId.value
  return Boolean(inspected && (from === inspected || to === inspected))
}

const contributorsFor = (experienceIds: string[]) => experienceIds
  .map(id => careerExperiences.find(item => item.id === id)?.company)
  .filter((company): company is string => Boolean(company))

const inspectSkill = (id: string) => {
  const node = nodeById(id)
  if (node?.kind === 'locked') return
  selectedSkillId.value = selectedSkillId.value === id ? null : id
}

useGsapContext(tree, ({ reducedMotion }) => {
  const paths = tree.value?.querySelectorAll('.skill-tree__path')
  const nodes = tree.value?.querySelectorAll('.skill-node')
  if (!paths?.length || !nodes?.length) return

  if (reducedMotion) {
    gsap.set([paths, nodes], { clearProps: 'all' })
    return
  }

  const timeline = gsap.timeline({
    scrollTrigger: { trigger: tree.value, start: 'top 82%', once: true },
  })
  timeline
    .from(paths, { strokeDashoffset: 80, opacity: 0, duration: .65, stagger: .025, ease: 'power2.out' })
    .from(nodes, { scale: .55, opacity: 0, duration: .45, stagger: .035, ease: 'back.out(1.6)' }, '-=.35')
})
</script>

<template>
  <section ref="tree" class="skill-tree" aria-labelledby="skill-tree-title">
    <header class="skill-tree__header">
      <div><span>// DIGITAL PROGRESSION</span><h3 id="skill-tree-title">Skill Tree</h3></div>
      <span>PROFESSIONAL GROWTH NETWORK</span>
    </header>

    <div class="skill-tree__viewport" :class="{ 'is-inspecting': inspectedSkillId }">
      <svg class="skill-tree__connections" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
        <line
          v-for="connection in careerSkillConnections"
          :key="`${connection.from}-${connection.to}`"
          class="skill-tree__path"
          :class="{
            'is-active': isActiveConnection(connection.from, connection.to),
            'is-inspected': isInspectedConnection(connection.from, connection.to),
          }"
          :x1="(nodeById(connection.from)?.x ?? 0) * 10"
          :y1="(nodeById(connection.from)?.y ?? 0) * 6.2"
          :x2="(nodeById(connection.to)?.x ?? 0) * 10"
          :y2="(nodeById(connection.to)?.y ?? 0) * 6.2"
        />
      </svg>

      <button
        v-for="(node, index) in careerSkillNodes"
        :key="node.id"
        class="skill-node"
        :class="{
          'skill-node--core': node.kind === 'core',
          'skill-node--locked': node.kind === 'locked',
          'skill-node--edge-left': node.x < 20,
          'skill-node--edge-right': node.x > 80,
          'is-active': isActiveNode(node.id),
          'is-related': isRelatedNode(node.id),
          'is-inspected': inspectedSkillId === node.id,
        }"
        :style="{ left: `${node.x}%`, top: `${node.y}%` }"
        type="button"
        :aria-disabled="node.kind === 'locked' || undefined"
        :aria-label="node.kind === 'locked' ? `Node futuro ${index}: bloqueado` : `${node.label}, ${node.experiences.length} experiências relacionadas`"
        :aria-pressed="selectedSkillId === node.id"
        @mouseenter="hoveredSkillId = node.id"
        @mouseleave="hoveredSkillId = null"
        @focus="hoveredSkillId = node.id"
        @blur="hoveredSkillId = null"
        @click="inspectSkill(node.id)"
      >
        <span class="skill-node__orb" aria-hidden="true"><i /></span>
        <span class="skill-node__label">{{ node.label }}</span>
        <small>{{ node.kind === 'locked' ? 'LOCKED' : `${String(node.experiences.length).padStart(2, '0')} SOURCES` }}</small>
        <span v-if="inspectedSkillId === node.id" class="skill-node__tooltip">
          <strong>{{ node.label }}</strong>
          <template v-if="node.kind !== 'locked'">
            <span>ACQUIRED THROUGH</span>
            <i v-for="company in contributorsFor(node.experiences)" :key="company">{{ company }}</i>
          </template>
          <span v-else>REQUIREMENTS NOT MET</span>
        </span>
      </button>
    </div>
    <p class="skill-tree__mobile-hint">← DESLIZE PARA EXPLORAR A REDE →</p>
  </section>
</template>

<style scoped lang="scss">
.skill-tree { min-width: 0; border: 1px solid var(--border); background: #030504; }
.skill-tree__header { display: flex; align-items: end; justify-content: space-between; gap: 1rem; padding: .8rem 1rem; border-bottom: 1px solid var(--border); color: var(--text-secondary); font-size: .58rem; letter-spacing: .08em; }
.skill-tree__header span:first-child { color: var(--accent-bright); }
.skill-tree__header h3 { margin: .3rem 0 0; font-family: var(--font-mono); font-size: .9rem; line-height: 1; }
.skill-tree__viewport { position: relative; min-width: 45rem; height: 31rem; overflow: visible; background: radial-gradient(circle at center, rgb(23 60 255 / 11%), transparent 42%), linear-gradient(rgb(255 255 255 / 2%) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 2%) 1px, transparent 1px); background-size: auto, 2rem 2rem, 2rem 2rem; }
.skill-tree__connections { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.skill-tree__path { stroke: #353535; stroke-width: 1.2; stroke-dasharray: 5 5; vector-effect: non-scaling-stroke; transition: opacity .3s ease, stroke .3s ease, stroke-width .3s ease; }
.skill-tree__path.is-active { stroke: var(--accent); stroke-width: 1.8; stroke-dasharray: 12 5; animation: path-energy 1.1s linear infinite; }
.skill-tree__path.is-inspected { stroke: #7b93ff; stroke-width: 2.5; opacity: 1; }
.skill-tree__viewport.is-inspecting .skill-tree__path:not(.is-inspected) { opacity: .2; }

.skill-node { position: absolute; z-index: 2; display: grid; width: 5.2rem; place-items: center; padding: 0; border: 0; background: transparent; color: #8a8a8a; font-family: var(--font-mono); text-align: center; transform: translate(-50%, -50%); cursor: pointer; transition: opacity .3s ease, color .3s ease, filter .3s ease; }
.skill-node__orb { display: grid; width: 2.1rem; height: 2.1rem; place-items: center; border: 1px solid #5d5d5d; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #aaa, #272727 35%, #050505 66%); box-shadow: inset 0 0 0 4px #111; transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease; }
.skill-node__orb i { width: .35rem; height: .35rem; border-radius: 50%; background: #777; }
.skill-node__label { margin-top: .4rem; font-size: .58rem; line-height: 1.1; }
.skill-node small { margin-top: .2rem; font-size: .45rem; letter-spacing: .07em; }
.skill-node.is-active { color: #d9dfff; }
.skill-node.is-active .skill-node__orb { border-color: #7389ff; background: radial-gradient(circle at 35% 30%, #dfe5ff, #173cff 30%, #06104d 65%); box-shadow: inset 0 0 0 4px #07113d, 0 0 11px rgb(49 87 255 / 55%); }
.skill-node.is-active .skill-node__orb i { background: white; box-shadow: 0 0 6px white; }
.skill-node:hover .skill-node__orb, .skill-node:focus-visible .skill-node__orb, .skill-node.is-related .skill-node__orb { transform: scale(1.18); border-color: white; }
.skill-node.is-inspected { z-index: 6; color: white; }
.skill-tree__viewport.is-inspecting .skill-node:not(.is-related, .is-inspected) { opacity: .28; }
.skill-node--core { width: 7rem; color: white; }
.skill-node--core .skill-node__orb { width: 3.4rem; height: 3.4rem; border-color: #aaa; background: radial-gradient(circle at 35% 30%, white, #737373 18%, #111 55%); }
.skill-node--locked { cursor: not-allowed; }
.skill-node--locked .skill-node__orb { border-style: dashed; background: #050505; opacity: .45; }

.skill-node__tooltip { position: absolute; z-index: 8; top: calc(100% + .6rem); left: 50%; display: grid; width: 11rem; gap: .28rem; padding: .65rem; border: 1px solid #777; background: rgb(3 3 3 / 96%); box-shadow: 5px 6px 0 rgb(23 60 255 / 20%); color: var(--text-secondary); font-size: .52rem; line-height: 1.35; text-align: left; transform: translateX(-50%); pointer-events: none; }
.skill-node__tooltip strong { color: white; font-size: .62rem; }
.skill-node__tooltip span { color: var(--accent-bright); font-size: .48rem; letter-spacing: .08em; }
.skill-node__tooltip i { font-style: normal; }
.skill-node--edge-left .skill-node__tooltip { left: 0; transform: none; }
.skill-node--edge-right .skill-node__tooltip { right: 0; left: auto; transform: none; }
.skill-tree__mobile-hint { display: none; margin: 0; padding: .65rem; border-top: 1px solid var(--border); color: #666; font-size: .52rem; text-align: center; }

@keyframes path-energy { to { stroke-dashoffset: -17; } }

@media (max-width: 64rem) {
  .skill-tree { overflow-x: auto; overflow-y: hidden; }
  .skill-tree__mobile-hint { display: block; position: sticky; left: 0; width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .skill-tree__path.is-active { animation: none; }
  .skill-node, .skill-node__orb, .skill-tree__path { transition-duration: .01s; }
}
</style>
