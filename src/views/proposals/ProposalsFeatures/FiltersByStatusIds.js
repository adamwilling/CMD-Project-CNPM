import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const propTypes = {
    countByStatuses: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired
}

const FiltersByStatusIds = ({ countByStatuses, filters, onFiltersChange }) => {
    const handleChange = (status) => {
        const currentStatusId = Number.parseInt(status.id)
        let listStatusId = filters.statusIds
        let listStatus = filters.statuses
        if (listStatusId.includes(currentStatusId)) {
            listStatus = listStatus.filter(status => status.id !== currentStatusId)
        }
        else {
            listStatus.push(status)
        }
        onFiltersChange(listStatus)
    }
    return (
        <>
            {
                countByStatuses.map((status) => (
                    <Button
                        key={status.id}
                        variant="outline-primary"
                        className="col-auto m-1"
                        value={status.id}
                        active={filters.statusIds?.includes(status.id)}
                        onClick={() => handleChange(status)}
                    >
                        {status.name} ({status.countByStatus})
                    </Button> 
                ))
            }
        </>
    )
}

FiltersByStatusIds.propTypes = propTypes

export default FiltersByStatusIds 