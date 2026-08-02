import { motion, AnimatePresence } from 'framer-motion';
import { ToggleLeft, ToggleRight, ChevronDown, Check } from 'lucide-react';

function QuestionStep({ question, value, onChange }) {
  if (!question) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-bold text-[var(--text)] md:text-xl">{question.text}</h3>

        {question.type === 'boolean' && (
          <BooleanInput value={value} onChange={onChange} />
        )}

        {question.type === 'select' && (
          <SelectInput options={question.options} value={value} onChange={onChange} />
        )}

        {question.type === 'multiSelect' && (
          <MultiSelectInput options={question.options} value={value || []} onChange={onChange} />
        )}

        {question.type === 'text' && (
          <TextInput value={value || ''} onChange={onChange} placeholder={question.placeholder} />
        )}

        {question.type === 'textarea' && (
          <TextAreaInput value={value || ''} onChange={onChange} placeholder={question.placeholder} />
        )}

        {question.type === 'number' && (
          <NumberInput value={value || ''} onChange={onChange} placeholder={question.placeholder} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function BooleanInput({ value, onChange }) {
  return (
    <div className="flex gap-3">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onChange(true)}
        className={`flex flex-1 items-center justify-center gap-2 rounded-xl border p-4 font-bold transition-all ${
          value === true
            ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
            : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/30'
        }`}
      >
        <ToggleRight size={20} />
        Yes
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onChange(false)}
        className={`flex flex-1 items-center justify-center gap-2 rounded-xl border p-4 font-bold transition-all ${
          value === false
            ? 'border-[var(--accent-2)] bg-[var(--accent-2)]/10 text-[var(--accent-2)]'
            : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent-2)]/30'
        }`}
      >
        <ToggleLeft size={20} />
        No
      </motion.button>
    </div>
  );
}

function SelectInput({ options, value, onChange }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt) => (
        <motion.button
          key={opt}
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onChange(opt)}
          className={`rounded-xl border p-3 text-left text-sm font-medium transition-all ${
            value === opt
              ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)]/30'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
              value === opt ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--line)]'
            }`}>
              {value === opt && <Check size={12} className="text-black" strokeWidth={3} />}
            </span>
            {opt}
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function MultiSelectInput({ options, value, onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const isSelected = value.includes(opt);
        return (
          <motion.button
            key={opt}
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => toggle(opt)}
            className={`rounded-xl border p-3 text-left text-sm font-medium transition-all ${
              isSelected
                ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                : 'border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)]/30'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${
                isSelected ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--line)]'
              }`}>
                {isSelected && <Check size={12} className="text-black" strokeWidth={3} />}
              </span>
              {opt}
            </div>
          </motion.button>
        );
      })}
      <p className="col-span-full text-xs text-[var(--muted)]">Select all that apply</p>
    </div>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Type your answer...'}
      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-[var(--text)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
    />
  );
}

function TextAreaInput({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Describe in detail...'}
      rows={4}
      className="w-full resize-none rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-[var(--text)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
    />
  );
}

function NumberInput({ value, onChange, placeholder }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Enter a number'}
      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-[var(--text)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
    />
  );
}

export default QuestionStep;
