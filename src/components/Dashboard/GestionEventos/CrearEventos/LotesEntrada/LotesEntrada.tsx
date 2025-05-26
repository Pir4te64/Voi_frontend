import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import {
  FiEdit,
  FiTrash,
  FiCheckSquare,
  FiSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useTicketLotsForm, TicketLot } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/store/useTicketLotsForm";
import {
  ticketLotInitialValues,
  ticketLotValidationSchema,
} from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/data/ticketLots.data";

const TicketLotsForm: React.FC = () => {
  const { lots, addLot, deleteLot, updateLot } = useTicketLotsForm();
  const [editing, setEditing] = useState<TicketLot | null>(null);

  const formik = useFormik({
    initialValues: ticketLotInitialValues,
    validationSchema: ticketLotValidationSchema,
    onSubmit: (values, helpers) => {
      editing
        ? updateLot({ ...editing, ...values })
        : addLot({ ...values, active: false });
      helpers.resetForm();
      setEditing(null);
    },
  });

  /* ------------- paginación ------------- */
  const pageSize = 5;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(lots.length / pageSize);
  const pageLots = useMemo(
    () => lots.slice(page * pageSize, page * pageSize + pageSize),
    [lots, page]
  );

  const toggleActive = (lot: TicketLot) =>
    updateLot({ ...lot, active: !lot.active });

  return (
    <>
      {/* ---------- Formulario ---------- */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 text-sm md:text-base"
      >
        {/* campos … (idénticos al ejemplo anterior) */}
        {/* … 省略 por brevedad: el JSX de inputs no cambió */}
      </form>

      {/* ---------- Tabla ---------- */}
      <h3 className="mt-10 mb-4 text-lg font-semibold">
        Lotes Agregados al Evento
      </h3>
      <div className="overflow-x-auto rounded-lg bg-black/40">
        <table className="w-full text-left text-sm">
          <thead className="bg-black text-gray-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Nombre del Lote</th>
              <th className="px-4 py-3 font-semibold">Precio</th>
              <th className="px-4 py-3 font-semibold">Válido hasta</th>
              <th className="px-4 py-3 font-semibold">Comisión</th>
              <th className="px-4 py-3 font-semibold text-center">Estado</th>
              <th className="px-4 py-3 font-semibold text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pageLots.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  Aún no agregaste lotes
                </td>
              </tr>
            )}

            {pageLots.map((lot) => (
              <tr
                key={lot.id}
                className="border-t border-gray-700 hover:bg-black/30"
              >
                <td className="px-4 py-3">{lot.name}</td>
                <td className="px-4 py-3">${lot.price.toLocaleString()}</td>
                <td className="px-4 py-3">
                  {new Date(lot.validUntil).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {lot.commissionType === "fixed"
                    ? `$${lot.commissionValue}`
                    : `${lot.commissionValue}%`}
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggleActive(lot)}>
                    {lot.active ? (
                      <FiCheckSquare
                        className="mx-auto text-green-500"
                        size={18}
                      />
                    ) : (
                      <FiSquare className="mx-auto" size={18} />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 text-end space-x-3">
                  <button
                    onClick={() => {
                      setEditing(lot);
                      formik.setValues({
                        name: lot.name,
                        price: lot.price,
                        validUntil: lot.validUntil,
                        commissionType: lot.commissionType,
                        commissionValue: lot.commissionValue,
                      });
                    }}
                    className="hover:text-secondary"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteLot(lot.id)}
                    className="hover:text-red-500"
                  >
                    <FiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Paginación ---------- */}
      {pageCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="disabled:opacity-40"
          >
            <FiChevronLeft />
          </button>

          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-8 rounded ${
                i === page ? "bg-secondary text-black" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
            disabled={page === pageCount - 1}
            className="disabled:opacity-40"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </>
  );
};

export default TicketLotsForm;
