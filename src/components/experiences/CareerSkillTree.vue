<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { careerExperiences } from '@/data/experiences'
import { careerSkillConnections, careerSkillNodes, type CareerSkillConnection } from '@/data/careerSkills'

const props = defineProps<{ activeExperienceId: string }>()
const tree = ref<HTMLElement | null>(null)
const hoveredSkillId = ref<string | null>(null)
const selectedSkillId = ref<string | null>(null)
const hasEntered = ref(false)

const activeExperience = computed(() => careerExperiences.find(item => item.id === props.activeExperienceId))
const activeSkills = computed(() => new Set(activeExperience.value?.skills ?? []))
const inspectedSkillId = computed(() => selectedSkillId.value ?? hoveredSkillId.value)
const nodeMap = new Map(careerSkillNodes.map(node => [node.id, node]))
const validConnections = careerSkillConnections.filter(connection => nodeMap.has(connection.from) && nodeMap.has(connection.to))

const nodeById = (id: string) => nodeMap.get(id)
const isActiveNode = (id: string) => id === 'professional-core' || activeSkills.value.has(id)
const isRelatedNode = (id: string) => {
  const inspected = inspectedSkillId.value
  if (!inspected) return false
  return id === inspected || validConnections.some(connection =>
    (connection.from === inspected && connection.to === id)
    || (connection.to === inspected && connection.from === id),
  )
}
const isActiveConnection = (connection: CareerSkillConnection) => isActiveNode(connection.from) && isActiveNode(connection.to)
const isInspectedConnection = (connection: CareerSkillConnection) => {
  const inspected = inspectedSkillId.value
  return Boolean(inspected && (connection.from === inspected || connection.to === inspected))
}

const connectionPath = (connection: CareerSkillConnection) => {
  const from = nodeById(connection.from)
  const to = nodeById(connection.to)
  if (!from || !to) return ''
  const curve = connection.curve ?? 0
  if (curve === 0) return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy) || 1
  const middleX = (from.x + to.x) / 2 - (dy / length) * curve
  const middleY = (from.y + to.y) / 2 + (dx / length) * curve
  return `M ${from.x} ${from.y} Q ${middleX} ${middleY} ${to.x} ${to.y}`
}

const contributorsFor = (experienceIds: string[]) => experienceIds
  .map(id => careerExperiences.find(item => item.id === id)?.company)
  .filter((company): company is string => Boolean(company))

const inspectSkill = (id: string) => {
  if (nodeById(id)?.kind === 'locked') return
  selectedSkillId.value = selectedSkillId.value === id ? null : id
}
const closeInspection = (event: PointerEvent) => {
  if (!tree.value?.contains(event.target as Node)) selectedSkillId.value = null
}
const closeWithEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') selectedSkillId.value = null
}

const runEntrance = () => {
  if (!tree.value || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  const core = tree.value.querySelector<HTMLElement>('[data-node-kind="core"]')
  const paths = [...tree.value.querySelectorAll<SVGPathElement>('.career-skill-tree__path')]
  const nodes = [...tree.value.querySelectorAll<HTMLElement>('.career-skill-node:not([data-node-kind="core"])')]

  core?.animate(
    [{ opacity: 0, transform: 'translate(-50%, -50%) scale(.7)' }, { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }],
    { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'none' },
  )
  paths.forEach((path, index) => path.animate(
    [{ opacity: 0, strokeDasharray: '0 1', strokeDashoffset: 1 }, { opacity: 1, strokeDasharray: '1 0', strokeDashoffset: 0 }],
    { duration: 470, delay: 180 + index * 12, easing: 'ease-out', fill: 'none' },
  ))
  nodes.forEach((node, index) => {
    const y = Number.parseFloat(node.style.getPropertyValue('--node-y'))
    const levelDelay = y < 40 ? 520 : y < 75 ? 700 : 880
    node.animate(
      [{ opacity: 0, transform: 'translate(-50%, -50%) scale(.72)' }, { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }],
      { duration: 360, delay: levelDelay + (index % 5) * 35, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'none' },
    )
  })
}

let entranceObserver: IntersectionObserver | undefined
onMounted(() => {
  document.addEventListener('pointerdown', closeInspection)
  document.addEventListener('keydown', closeWithEscape)
  if (!tree.value || typeof IntersectionObserver === 'undefined') {
    hasEntered.value = true
    return
  }
  entranceObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    hasEntered.value = true
    runEntrance()
    entranceObserver?.disconnect()
  }, { threshold: .18 })
  entranceObserver.observe(tree.value)
})
onBeforeUnmount(() => {
  entranceObserver?.disconnect()
  document.removeEventListener('pointerdown', closeInspection)
  document.removeEventListener('keydown', closeWithEscape)
})
</script>

<template>
  <section ref="tree" class="career-skill-tree" :class="{ 'has-entered': hasEntered }" aria-labelledby="career-skill-tree-title">
    <header class="career-skill-tree__header">
      <div><span>// DIGITAL PROGRESSION</span><h3 id="career-skill-tree-title">Skill Tree</h3></div>
      <span>PROFESSIONAL GROWTH NETWORK</span>
    </header>
    <div class="career-skill-tree__scroll">
      <div class="career-skill-tree__canvas" :class="{ 'is-inspecting': inspectedSkillId }" @pointerdown.self="selectedSkillId = null">
        <svg class="career-skill-tree__connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path v-for="connection in validConnections" :key="`${connection.from}-${connection.to}`"
            class="career-skill-tree__path" :class="{
              'is-active': isActiveConnection(connection),
              'is-inspected': isInspectedConnection(connection),
              'is-locked': nodeById(connection.from)?.kind === 'locked' || nodeById(connection.to)?.kind === 'locked',
            }" :d="connectionPath(connection)" pathLength="1" />
        </svg>

        <button v-for="(node, index) in careerSkillNodes" :key="node.id" class="career-skill-node"
          :class="{
            'career-skill-node--core': node.kind === 'core',
            'career-skill-node--locked': node.kind === 'locked',
            'career-skill-node--edge-left': node.x < 20,
            'career-skill-node--edge-right': node.x > 80,
            'career-skill-node--edge-bottom': node.y > 78,
            'is-active': isActiveNode(node.id), 'is-related': isRelatedNode(node.id), 'is-inspected': inspectedSkillId === node.id,
          }"
          :style="{ '--node-x': node.x, '--node-y': node.y }" :data-node-kind="node.kind ?? 'skill'" type="button"
          :disabled="node.kind === 'locked'"
          :aria-label="node.kind === 'locked' ? `Node futuro ${index + 1}: bloqueado` : `Skill: ${node.label}`"
          :aria-pressed="node.kind === 'locked' ? undefined : selectedSkillId === node.id"
          @mouseenter="hoveredSkillId = node.id" @mouseleave="hoveredSkillId = null"
          @focus="hoveredSkillId = node.id" @blur="hoveredSkillId = null" @click.stop="inspectSkill(node.id)">
          <span class="career-skill-node__orb" aria-hidden="true"><i /></span>
          <span class="career-skill-node__label">{{ node.label }}</span>
          <small>{{ node.kind === 'locked' ? 'LOCKED' : `${String(node.experiences.length).padStart(2, '0')} SOURCES` }}</small>
          <span v-if="inspectedSkillId === node.id" class="career-skill-node__tooltip" role="status">
            <strong>{{ node.label }}</strong>
            <template v-if="node.kind !== 'locked'">
              <span>ACQUIRED THROUGH</span>
              <i v-for="company in contributorsFor(node.experiences)" :key="company">{{ company }}</i>
              <small>{{ String(node.experiences.length).padStart(2, '0') }} SOURCES</small>
            </template>
            <span v-else>REQUIREMENTS NOT MET</span>
          </span>
        </button>
      </div>
    </div>
    <p class="career-skill-tree__mobile-hint">← DESLIZE PARA EXPLORAR A REDE →</p>
  </section>
</template>

<style scoped lang="scss">
.career-skill-tree { min-width: 0; border: 1px solid var(--border); background: #030504; }
.career-skill-tree__header { display: flex; align-items: end; justify-content: space-between; gap: 1rem; padding: .8rem 1rem; border-bottom: 1px solid var(--border); color: var(--text-secondary); font-size: .58rem; letter-spacing: .08em; }
.career-skill-tree__header span:first-child { color: var(--accent-bright); }
.career-skill-tree__header h3 { margin: .3rem 0 0; font-family: var(--font-mono); font-size: .9rem; line-height: 1; }
.career-skill-tree__scroll { width: 100%; overflow: hidden; }
.career-skill-tree__canvas { position: relative; isolation: isolate; width: 100%; min-height: clamp(31rem, 42vw, 38rem); overflow: hidden; background: radial-gradient(circle at 50% 47%, rgb(23 60 255 / 6%), transparent 31%), linear-gradient(rgb(255 255 255 / 2%) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 2%) 1px, transparent 1px); background-size: auto, 2rem 2rem, 2rem 2rem; }
.career-skill-tree__connections { position: absolute; z-index: 1; inset: 0; display: block; width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
.career-skill-tree__path { fill: none; stroke: rgb(255 255 255 / 25%); stroke-width: 1.15; stroke-linecap: round; vector-effect: non-scaling-stroke; opacity: .78; transition: opacity .32s ease, stroke .32s ease, stroke-width .32s ease; }
.career-skill-tree__path.is-locked { stroke-dasharray: .012 .014; opacity: .48; }
.career-skill-tree__path.is-active { stroke: var(--accent-bright); stroke-width: 2; opacity: 1; animation: career-path-activate .44s ease-out both; }
.career-skill-tree__path.is-inspected { stroke: #91a2ff; stroke-width: 2.4; opacity: 1; }
.career-skill-tree__canvas.is-inspecting .career-skill-tree__path:not(.is-inspected) { opacity: .17; }

.career-skill-node { position: absolute; z-index: 2; top: calc(var(--node-y) * 1%); left: calc(var(--node-x) * 1%); display: grid; width: clamp(5.5rem, 8vw, 7.25rem); place-items: center; padding: 0; border: 0; background: transparent; color: #999; font-family: var(--font-mono); text-align: center; transform: translate(-50%, -50%); cursor: pointer; transition: opacity .3s ease, color .3s ease, filter .3s ease; }
.career-skill-node__orb { display: grid; width: 2.15rem; height: 2.15rem; place-items: center; border: 1px solid #626262; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #d7d7d7, #727272 16%, #242424 42%, #050505 70%); box-shadow: inset 0 0 0 4px rgb(0 0 0 / 54%), inset -3px -4px 7px #000; transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease, background .28s ease; }
.career-skill-node__orb i { width: .32rem; height: .32rem; border-radius: 50%; background: #8b8b8b; box-shadow: inset 0 1px 1px #ddd; }
.career-skill-node__label { margin-top: .42rem; font-size: clamp(.56rem, .68vw, .72rem); font-weight: 700; line-height: 1.08; letter-spacing: .025em; }
.career-skill-node small { margin-top: .18rem; color: #686868; font-size: .46rem; letter-spacing: .07em; }
.career-skill-node.is-active { color: #e1e5ff; }
.career-skill-node.is-active .career-skill-node__orb { border-color: #7188ff; background: radial-gradient(circle at 35% 28%, #f5f7ff, #5d78ff 14%, #173cff 34%, #07113f 66%, #020617 78%); box-shadow: inset 0 0 0 4px rgb(2 7 36 / 75%), 0 0 10px rgb(49 87 255 / 48%); }
.career-skill-node.is-active .career-skill-node__orb i { background: white; box-shadow: 0 0 5px white; }
.career-skill-node:hover .career-skill-node__orb, .career-skill-node:focus-visible .career-skill-node__orb, .career-skill-node.is-related .career-skill-node__orb { transform: scale(1.16); border-color: #d9d9d9; }
.career-skill-node:focus-visible { outline: 1px solid var(--accent-bright); outline-offset: .35rem; }
.career-skill-node.is-inspected { z-index: 6; color: white; }
.career-skill-tree__canvas.is-inspecting .career-skill-node:not(.is-related, .is-inspected) { opacity: .5; }
.career-skill-node--core { z-index: 3; width: 8rem; color: white; }
.career-skill-node--core .career-skill-node__orb { width: 4.15rem; height: 4.15rem; border-color: #bcbcbc; background: radial-gradient(circle at 34% 27%, #fff 0 5%, #bcbcbc 12%, #565656 27%, #151515 52%, #020202 72%); box-shadow: inset 0 0 0 5px rgb(0 0 0 / 52%), inset -6px -7px 10px #000, 0 5px 12px rgb(0 0 0 / 65%); }
.career-skill-node--core .career-skill-node__label { max-width: 7rem; font-size: .72rem; line-height: 1.15; }
.career-skill-node--locked { cursor: not-allowed; }
.career-skill-node--locked .career-skill-node__orb { border-style: dashed; background: #050505; box-shadow: inset 0 0 0 4px #0b0b0b; opacity: .62; }
.career-skill-node--locked .career-skill-node__orb::before { color: #777; content: '[ ? ]'; font-size: .52rem; }
.career-skill-node--locked .career-skill-node__orb i { display: none; }

.career-skill-node__tooltip { position: absolute; z-index: 8; top: calc(100% + .6rem); left: 50%; display: grid; width: 11.5rem; gap: .28rem; padding: .7rem; border: 1px solid #777; background: rgb(3 3 3 / 97%); box-shadow: 5px 6px 0 rgb(23 60 255 / 18%); color: var(--text-secondary); font-size: .52rem; line-height: 1.35; text-align: left; transform: translateX(-50%); pointer-events: none; }
.career-skill-node__tooltip strong { color: white; font-size: .64rem; }
.career-skill-node__tooltip > span { color: var(--accent-bright); font-size: .48rem; letter-spacing: .08em; }
.career-skill-node__tooltip i { font-style: normal; }
.career-skill-node__tooltip small { color: #777; }
.career-skill-node--edge-left .career-skill-node__tooltip { left: 0; transform: none; }
.career-skill-node--edge-right .career-skill-node__tooltip { right: 0; left: auto; transform: none; }
.career-skill-node--edge-bottom .career-skill-node__tooltip { top: auto; bottom: calc(100% + .6rem); }
.career-skill-tree__mobile-hint { display: none; margin: 0; padding: .65rem; border-top: 1px solid var(--border); color: #666; font-size: .52rem; text-align: center; }

@keyframes career-path-activate { from { stroke-dasharray: .12 .88; stroke-dashoffset: 1; } to { stroke-dasharray: 1 0; stroke-dashoffset: 0; } }
@media (max-width: 64rem) {
  .career-skill-tree__scroll { overflow-x: auto; overflow-y: hidden; overscroll-behavior-inline: contain; }
  .career-skill-tree__canvas { width: max(100%, 48rem); min-height: 34rem; }
  .career-skill-tree__mobile-hint { display: block; }
}
@media (max-width: 48rem) {
  .career-skill-tree__header { align-items: start; flex-direction: column; }
  .career-skill-tree__canvas { width: 46rem; min-height: 39rem; }
  .career-skill-node { width: 6rem; }
  .career-skill-node__label { font-size: .62rem; }
}
@media (prefers-reduced-motion: reduce) {
  .career-skill-tree__path.is-active { animation: none; }
  .career-skill-node, .career-skill-node__orb, .career-skill-tree__path { transition-duration: .01s; }
}
</style>
