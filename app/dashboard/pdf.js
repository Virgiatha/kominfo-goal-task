import { jsPDF } from "jspdf";

async function loadLogoDataUrl() {
  const response = await fetch("/logo kalsel.svg");
  if (!response.ok) throw new Error("Logo tidak dapat dimuat.");

  const svgText = await response.text();
  const logoUrl = URL.createObjectURL(new Blob([svgText], { type: "image/svg+xml" }));

  try {
    const image = await new Promise((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = reject;
      element.src = logoUrl;
    });
    const canvas = document.createElement("canvas");
    canvas.width = 180;
    canvas.height = 252;
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(logoUrl);
  }
}

export async function exportGoalsPdf(goals, { title = "Laporan Goal dan Task", period = "Semua Periode" } = {}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const generatedAt = new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeStyle: "short" }).format(new Date());
  const safeGoals = Array.isArray(goals) ? goals : [];
  const totalTasks = safeGoals.reduce((sum, goal) => sum + (goal.total_tasks || 0), 0);
  const completedTasks = safeGoals.reduce((sum, goal) => sum + (goal.completed_tasks || 0), 0);
  const overallProgress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  let logoDataUrl = null;

  try {
    logoDataUrl = await loadLogoDataUrl();
  } catch {
    logoDataUrl = null;
  }

  const drawHeader = () => {
    doc.setFillColor(11, 93, 59);
    doc.rect(0, 0, pageWidth, 34, "F");
    if (logoDataUrl) doc.addImage(logoDataUrl, "PNG", 12, 5, 12, 23);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("PEMERINTAH PROVINSI KALIMANTAN SELATAN", 29, 12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("APLIKASI PENCATAT GOALS", 29, 19);
    doc.setTextColor(31, 41, 55);
  };

  drawHeader();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(title, 14, 47);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Periode: ${period}`, 14, 54);
  doc.text(`Dicetak: ${generatedAt}`, 14, 60);
  doc.setTextColor(31, 41, 55);

  doc.setFillColor(234, 245, 239);
  doc.roundedRect(14, 68, pageWidth - 28, 28, 2, 2, "F");
  const summaryItems = [
    ["Total Goals", safeGoals.length],
    ["Goals Selesai", safeGoals.filter((goal) => goal.progress >= 100).length],
    ["Total Tasks", totalTasks],
    ["Progress", `${overallProgress}%`],
  ];
  summaryItems.forEach(([label, value], index) => {
    const x = 20 + index * 45;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(label, x, 78);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(11, 93, 59);
    doc.text(String(value), x, 89);
  });

  let y = 108;
  if (safeGoals.length === 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text("Tidak ada Goal yang tersedia untuk periode ini.", 14, y);
  }

  safeGoals.forEach((goal, index) => {
    const taskList = Array.isArray(goal.tasks) ? goal.tasks : [];
    const status = goal.progress >= 100 ? "Selesai" : "Berjalan";
    const descriptionLines = doc.splitTextToSize(goal.description || "Tidak ada deskripsi.", pageWidth - 42);
    const blockHeight = 35 + descriptionLines.length * 5 + Math.max(taskList.length, 1) * 6;

    if (y + blockHeight > pageHeight - 18) {
      doc.addPage();
      drawHeader();
      y = 45;
    }

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, y, pageWidth - 28, 28, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(11, 93, 59);
    doc.text(`${index + 1}. ${goal.title || "Goal tanpa judul"}`, 19, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Status: ${status}`, 19, y + 15);
    doc.text(`${goal.completed_tasks || 0} dari ${goal.total_tasks || 0} Task selesai`, 19, y + 21);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 122, 82);
    doc.text(`${goal.progress ?? 0}%`, pageWidth - 35, y + 15);
    y += 34;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(31, 41, 55);
    doc.text("Deskripsi", 19, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.text(descriptionLines, 19, y);
    y += descriptionLines.length * 5 + 5;

    doc.setFont("helvetica", "bold");
    doc.text("Daftar Task", 19, y);
    y += 5;
    if (taskList.length === 0) {
      doc.setFont("helvetica", "normal");
      doc.text("Belum ada Task.", 23, y);
      y += 6;
    } else {
      taskList.forEach((task) => {
        if (y > pageHeight - 18) {
          doc.addPage();
          drawHeader();
          y = 45;
        }
        const completed = Boolean(task.is_completed || task.completed || task.status === "completed");
        doc.setFont("helvetica", "normal");
        doc.setTextColor(completed ? 11 : 71, completed ? 93 : 85, completed ? 59 : 105);
        doc.text(`${completed ? "[x]" : "[ ]"} ${task.title || "Task tanpa judul"}`, 23, y);
        doc.setFontSize(7);
        doc.text(completed ? "Selesai" : "Belum selesai", pageWidth - 43, y);
        doc.setFontSize(8);
        y += 6;
      });
    }
    y += 7;
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("Dokumen ini dibuat oleh Aplikasi Pencatat Goals Pemerintah Provinsi Kalimantan Selatan.", 14, pageHeight - 9);
  doc.save(`${title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}.pdf`);
}
