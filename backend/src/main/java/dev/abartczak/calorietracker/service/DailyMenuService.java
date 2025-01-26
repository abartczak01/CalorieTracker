package dev.abartczak.calorietracker.service;

import dev.abartczak.calorietracker.domain.DailyMenu;
import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.dto.DailyMenuDTO;
import dev.abartczak.calorietracker.mapper.DailyMenuMapper;
import dev.abartczak.calorietracker.repository.DailyMenuRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class DailyMenuService {

    private final DailyMenuRepository dailyMenuRepository;
    private final DailyMenuMapper dailyMenuMapper;

    public DailyMenuDTO addNewMenu(DailyMenu dailyMenu) {
        if (dailyMenuRepository.findByDateAndUser(dailyMenu.getDate(), dailyMenu.getUser()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Daily menu for this date already exists.");
        }

        DailyMenu savedMenu = dailyMenuRepository.save(dailyMenu);
        return dailyMenuMapper.toDailyMenuDTO(savedMenu);
    }

    public DailyMenuDTO findById(Long id, User currentUser) {
        return dailyMenuRepository.findById(id)
                .filter(dailyMenu -> dailyMenu.getUser().getId().equals(currentUser.getId()))
                .map(dailyMenuMapper::toDailyMenuDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied or menu not found."));
    }

    public void deleteById(Long id, User currentUser) {
        DailyMenu dailyMenu = dailyMenuRepository.findById(id)
                .filter(menu -> menu.getUser().getId().equals(currentUser.getId()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied or menu not found."));
        dailyMenuRepository.delete(dailyMenu);
    }

    public List<DailyMenuDTO> findByUser(User user) {
        return dailyMenuRepository.findByUser(user).stream()
                .map(dailyMenuMapper::toDailyMenuDTO)
                .collect(Collectors.toList());
    }

    public DailyMenuDTO findByDateAndUser(LocalDate date, User user) {
        return dailyMenuRepository.findByDateAndUser(date, user)
                .map(dailyMenuMapper::toDailyMenuDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No daily menu found for this date."));
    }
}
