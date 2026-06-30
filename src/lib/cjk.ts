// Splits text into runs of CJK vs non-CJK characters, so each run can be
// styled independently (e.g. CJK in the handwritten brush font).
// Ranges cover CJK symbols/punctuation (incl. 。), ideographs and fullwidth forms.
const CJK_CHAR = /[　-〿㐀-鿿豈-﫿＀-￯]/;
const CJK_RUNS =
  /[　-〿㐀-鿿豈-﫿＀-￯]+|[^　-〿㐀-鿿豈-﫿＀-￯]+/g;

export type Run = { text: string; cjk: boolean };

export function splitCjk(text: string): Run[] {
  const runs = text.match(CJK_RUNS) ?? [];
  return runs.map((t) => ({ text: t, cjk: CJK_CHAR.test(t) }));
}
