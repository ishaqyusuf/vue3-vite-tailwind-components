import { ref } from "vue";

const summaries = ref<any[]>([]);

function createSummaryCard({ amount, count }, title, color) {
  return {
    title,
    color,
    amount,
    count,
  };
}
function refreshSummary({ stats }) {
  summaries.value = [
    createSummaryCard(stats.paid, "Paid", "green"),
    createSummaryCard(stats.pending, "Pending", "yellow"),
    createSummaryCard(stats.overdue, "Overdue", "red"),
    createSummaryCard(stats.draft, "Drafts", "indigo"),
  ];
}
export default {
  summaries,
  refreshSummary,
};
