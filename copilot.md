# how i used LLMs to help me with this app

I used two forms of AI: first, I used Claude in-browser to help me better understand Vue's structure by asking for more info on:
- how single-file components work
- what how <script setup>, <template> and <style scoped> do
- what ref and reactivity do
- how to use v-if and v-for to control rendering
- how props work

I also used Claude in-browser to understand more about how to implement pagination, sorting and search

With me, you worked bottom-up through Vue's architecture: what the file structure means, how single-file components work, how <script setup>, <template> and <style scoped> divide concerns, what ref and reactivity do, how v-if and v-for control rendering, and how data flows from parent to child through props. When you asked about pagination, sorting, and search, I gave you the full App.vue script with computed properties chaining the data pipeline — dataArray → filtered → sorted → paginated — and explained why computed is the right tool for derived state.

With Copilot, you took that understanding and built the actual working app: fixing the table markup, filtering out empty neighborhoods, cleaning the SRType column, wiring sort to header clicks, guarding pagination, and deploying to GitHub Pages.
The pattern was: you came to me to understand how Vue thinks — reactivity, component composition, the data flow model — so that when Copilot was generating patches, you knew what it was doing and could direct it with specific, targeted questions like "how do I make the header rows the sort filter" instead of just "make this work."