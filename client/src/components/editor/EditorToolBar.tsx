import type { ReactNode } from "react";

interface EditorToolBarProps {
  /*
   * The editing buttons displayed on the left-hand side.
   *
   * Markdown and JSON editors will each supply their own buttons,
   * so the toolbar itself doesn't need to know what they are.
   */
  children: ReactNode;

  /*
   * Optional content shown on the right.
   *
   * Markdown:
   *  - Edit
   *  - Preview
   *  - Split
   *
   * JSON:
   *  - Valid JSON badge
   */
  rightContent?: ReactNode;
}

/*
 * Provides the shared toolbar layout used by every editor.
 *
 * Responsibilities:
 * - Creates the cream toolbar.
 * - Positions the left and right button groups.
 *
 * It does NOT:
 * - Know anything about Markdown.
 * - Know anything about JSON.
 * - Perform formatting.
 *
 * Each editor supplies the controls that should appear.
 */
function EditorToolBar({
  children,
  rightContent,
}: EditorToolBarProps) {
  return (
  <div
    className="editor-toolbar"
    /*
     * Prevents toolbar buttons from taking focus away from the textarea.
     * This preserves the highlighted text before the click handler runs.
     */
    onMouseDown={(event) => event.preventDefault()}
  >
    <div className="editor-toolbar-group">
      {children}
    </div>

    {rightContent && (
      <div className="editor-toolbar-group editor-view-controls">
        {rightContent}
      </div>
    )}
  </div>
);
}

export default EditorToolBar;